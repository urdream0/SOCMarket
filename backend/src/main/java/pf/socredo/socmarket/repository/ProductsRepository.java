package pf.socredo.socmarket.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import pf.socredo.socmarket.entity.ProductsEntity;

@Repository
public interface ProductsRepository extends JpaRepository<ProductsEntity, Long> {
  @NonNull
  Optional<ProductsEntity> findById(@NonNull Long productId);//Ne doit pas retourner une valeur null
}
