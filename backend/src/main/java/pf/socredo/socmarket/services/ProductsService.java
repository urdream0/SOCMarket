package pf.socredo.socmarket.services;

import java.util.List;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import pf.socredo.socmarket.dto.request.CreateProductRequest;
import pf.socredo.socmarket.dto.response.CreateProductResponse;
import pf.socredo.socmarket.entity.ProductsEntity;

public interface ProductsService {
    CreateProductResponse createProduct(CreateProductRequest request , HttpServletRequest httpRequest);
    Optional<ProductsEntity> findById(Long productId);
    List<ProductsEntity> getAllProducts();
    ProductsEntity updateProduct(Long productId, ProductsEntity product);
    void deleteProduct(Long productId);
}
