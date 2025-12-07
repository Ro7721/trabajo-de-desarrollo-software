package epiis.miproyecto.reactspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import epiis.miproyecto.reactspring.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
