package com.epiis.mi_app.services;

/*
 * import java.util.Optional;
 * 
 * import org.springframework.beans.factory.annotation.Autowired;
 * import org.springframework.security.core.userdetails.UserDetails;
 * import org.springframework.security.core.userdetails.UserDetailsService;
 * import org.springframework.stereotype.Service;
 * 
 * import com.epiis.mi_app.exepcions.ResourceNotFoundException;
 * import com.epiis.mi_app.model.User;
 * import com.epiis.mi_app.repository.UserRepository;
 * import com.epiis.mi_app.security.CustomUserDetails;
 * 
 * @Service
 * public class CustomUserDetailsServices implements UserDetailsService {
 * 
 * @Autowired
 * private UserRepository userRepo;
 * 
 * public CustomUserDetailsServices(UserRepository userRepository) {
 * this.userRepo = userRepository;
 * }
 * 
 * @Override
 * public UserDetails loadUserByUsername(String userName) {
 * Optional<User> user = userRepo.findByNamePerson(userName);
 * if (user.isEmpty()) {
 * throw new ResourceNotFoundException("Usuario no encontrado" + userName);
 * }
 * return new CustomUserDetails(user.get());
 * }
 * }
 */
