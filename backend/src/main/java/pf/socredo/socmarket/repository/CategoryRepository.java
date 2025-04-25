package pf.socredo.socmarket.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import pf.socredo.socmarket.entity.CategoryEntity;
@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    @NonNull
    Optional<CategoryEntity> findById(@NonNull Long Id);
    
}
