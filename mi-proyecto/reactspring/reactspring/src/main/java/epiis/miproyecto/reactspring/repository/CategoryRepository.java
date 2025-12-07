package epiis.miproyecto.reactspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import epiis.miproyecto.reactspring.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    Category findByName(String name);
}
