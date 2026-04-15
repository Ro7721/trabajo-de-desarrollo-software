package com.epiis.mi_app.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.epiis.mi_app.dto.UserDto;
import com.epiis.mi_app.exepcions.DuplicateResourceException;
import com.epiis.mi_app.exepcions.ResourceNotFoundException;
import com.epiis.mi_app.exepcions.ValidationException;
import com.epiis.mi_app.model.User;
import com.epiis.mi_app.repository.UserRepository;
import com.epiis.mi_app.security.PasswordHash;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServices {
    @Autowired
    private UserRepository usuaryRepository;
    //@Autowired 
    //private PasswordHash passwordHash;

    public User mapDtoToUsuary(UserDto dto) {
        User user = new User();
        user.setIdPerson(UUID.randomUUID().toString());
        user.setFirstName(dto.getFirstName());
        user.setSurname(dto.getSurName());
        user.setDni(dto.getDni());
        user.setPhone(dto.getPhone());
        user.setBirthDate(dto.getBirthDate());
        user.setEmail(dto.getEmail());
        user.setPassword(PasswordHash.hashPassword(dto.getPassword()));
        user.setActive(true); // Establecer el usuario como activo por defecto
        return user;
    }

    public User mapDtoToUsuaryUpdate(UserDto dto, User existingUser) {

        existingUser.setFirstName(dto.getFirstName());
        existingUser.setSurname(dto.getSurName());
        existingUser.setDni(dto.getDni());
        existingUser.setPhone(dto.getPhone());
        existingUser.setBirthDate(dto.getBirthDate());
        existingUser.setEmail(dto.getEmail());
        if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()) {
            existingUser.setPassword(PasswordHash.hashPassword(dto.getPassword()));
        }
        return existingUser;
    }

    public UserDto mapUserToDto(User user) {
        UserDto dto = new UserDto();
        dto.setIdPerson(user.getIdPerson());
        dto.setFirstName(user.getFirstName());
        dto.setSurName(user.getSurname());
        dto.setDni(user.getDni());
        dto.setPhone(user.getPhone());
        dto.setBirthDate(user.getBirthDate());
        dto.setEmail(user.getEmail());
        dto.setActive(user.isActive()); // Incluir el estado activo
        return dto;
    }

    // validacion de campos o atributos
    public void validateUserDto(UserDto dto, boolean isUpdate) {
        // Validaciones básicas
        if (dto.getFirstName() == null || dto.getFirstName().trim().isEmpty()) {
            throw new ValidationException("El nombre es obligatorio");
        }

        if (dto.getDni() == null || !dto.getDni().matches("^\\d{8}$")) {
            throw new ValidationException("El DNI debe tener 8 dígitos numéricos");
        }

        // Validar unicidad del DNI (solo para creación)
        if (!isUpdate && usuaryRepository.existsByDni(dto.getDni())) {
            throw new DuplicateResourceException("Ya existe un usuario con este DNI");
        }

        // Validar unicidad del email
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new ValidationException("El correo es obligatorio");
        }

        if (!isUpdate && usuaryRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Ya existe un usuario con este correo");
        }

        // Validar password (solo para creación o si se está actualizando)
        if (!isUpdate && (dto.getPassword() == null || dto.getPassword().trim().isEmpty())) {
            throw new ValidationException("La contraseña es obligatoria");
        }

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            if (!dto.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\\\d]).{8,}$")) {
                throw new ValidationException("La contraseña no cumple con los requisitos de seguridad");
            }

            // Validar confirmación de password
            if (dto.getConfirmPassword() == null ||
                    !dto.getPassword().equals(dto.getConfirmPassword())) {
                throw new ValidationException("Las contraseñas no coinciden");
            }
        }
    }

    public User createUser(UserDto dto) {
        validateUserDto(dto, false);
        try {
            User user = mapDtoToUsuary(dto);
            return usuaryRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateResourceException("Error de integridad de datos: posible duplicado");
        }
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return usuaryRepository.findAllByActiveTrue();
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(String idPerson) {
        return usuaryRepository.findByIdPersonAndActiveTrue(idPerson);
    }

    public User updateUser(String idPerson, UserDto dto) {
        User existUser = usuaryRepository.findByIdPersonAndActiveTrue(idPerson)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encotrado"));

        validateUserDto(dto, true);

        if (!existUser.getDni().equals(dto.getDni()) &&
                usuaryRepository.existsByDni(dto.getDni())) {
            throw new DuplicateResourceException("Ya existe otro usuario con ese DNI");
        }
        if (!existUser.getEmail().equals(dto.getEmail()) &&
                usuaryRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Ya existe otro usuario con es Correo");
        }
        try {
            User updatUser = mapDtoToUsuaryUpdate(dto, existUser);
            return usuaryRepository.save(updatUser);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateResourceException("Error de integridad de datos al actualizar");
        }
    }

    public void deleteUser(String idPerson) {
        User user = usuaryRepository.findById(idPerson)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encotrado"));
        user.setActive(false);
        usuaryRepository.save(user);
    }

    public boolean authenticate(String email, String password) {
        Optional<User> userOp = usuaryRepository.findByDniAndActiveTrue(email);
        if (userOp.isPresent()) {
            User user = userOp.get();
            return PasswordHash.checkPassword(password, user.getPassword());
        }
        return false;
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return usuaryRepository.findByEmailAndActiveTrue(email);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByDni(String dni) {
        return usuaryRepository.findByDniAndActiveTrue(dni);
    }

    @Transactional(readOnly = true)
    public List<User> searchUsers(String name, String dni) {
        if (name != null && !name.trim().isEmpty()) {
            return usuaryRepository.findByFirstNameContainingIgnoreCaseOrSurnameContainingIgnoreCaseAndActiveTrue(name,
                    name);
        } else if (dni != null && !dni.trim().isEmpty()) {
            return usuaryRepository.findByDniAndActiveTrue(dni)
                    .map(List::of).orElse(List.of());
        }
        return List.of();
    }
    // metodo para actualizar contraseña 
   /*  @Transactional(readOnly = true)
    public boolean updatePassword(String idUser,String currentPassword, String newPassword){
        Optional<User> optional = usuaryRepository.findById(idUser);
        if (optional.isPresent()) {
            User user = optional.get();
            if(passwordHash.checkPassword(currentPassword, user.getPassword())){
                String hashedPassword = passwordHash.hashPassword(newPassword);
                user.setPassword(hashedPassword);
                usuaryRepository.save(user);
                return true;
            }
        }
        return false;
    }*/

}
