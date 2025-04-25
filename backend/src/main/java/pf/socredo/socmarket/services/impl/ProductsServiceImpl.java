package pf.socredo.socmarket.services.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;//Breakpoints ici.
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import pf.socredo.socmarket.dto.request.CreateProductRequest;
import pf.socredo.socmarket.dto.response.CreateProductResponse;
import pf.socredo.socmarket.entity.CategoryEntity;
import pf.socredo.socmarket.entity.ProductsEntity;
import pf.socredo.socmarket.repository.CategoryRepository;
import pf.socredo.socmarket.repository.ProductsRepository;
import pf.socredo.socmarket.services.ProductsService;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CreateProductResponse createProduct(CreateProductRequest request, HttpServletRequest httpRequest) {

        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new RuntimeException("La categorie n'existe pas"));

        if (request.getUserId() == null) {
            throw new RuntimeException("L'utilisateur n'existe pas");
        }
        ProductsEntity product = new ProductsEntity();
        product.setProductName(request.getProductName());
        product.setProductDescription(request.getProductDescription());
        product.setProductPrice(request.getProductPrice());
        product.setCategoryId(category.getCategoryId()); 
        product.setUserId(request.getUserId());
        product.setProductImageName(request.getProductImageName());
        productsRepository.save(product);
        return createProductResponse(request, product);
    }
    private CreateProductResponse createProductResponse(CreateProductRequest request, ProductsEntity product) {
        CreateProductResponse response = new CreateProductResponse();
        response.setMessage("Le produit à bien été ajouté");
        return response;
        
    }
    @Override
    public Optional<ProductsEntity> findById(Long productId) {
        return productsRepository.findById(productId);
    }

    @Override
    public List<ProductsEntity> getAllProducts() {
        return productsRepository.findAll();
    }

    @Override
    public ProductsEntity updateProduct(Long productId, ProductsEntity updatedProduct) {
        ProductsEntity existingProduct = productsRepository.findById(productId).orElse(null);
        if (existingProduct != null) {
            existingProduct.setProductName(updatedProduct.getProductName());
            existingProduct.setProductDescription(updatedProduct.getProductDescription());
            existingProduct.setProductPrice(updatedProduct.getProductPrice());
            existingProduct.setCategoryId(updatedProduct.getCategoryId());
            existingProduct.setProductImageName(updatedProduct.getProductImageName());
            return productsRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long productId) {
        productsRepository.deleteById(productId);
    }
}