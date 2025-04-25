package pf.socredo.socmarket.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pf.socredo.socmarket.dto.request.CreateProductRequest;
import pf.socredo.socmarket.dto.response.CreateProductResponse;
import pf.socredo.socmarket.entity.ProductsEntity;
import pf.socredo.socmarket.services.ProductsService;

@RestController
@RequestMapping("api/v1/products/")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @GetMapping("list")
    public List<ProductsEntity> getAllProductsLists() {
        return productsService.getAllProducts();
    }

    @GetMapping("{productId}")
    public Optional<ProductsEntity> findById(@PathVariable("productId") Long productId) {
        return productsService.findById(productId);
    }
    @PostMapping("create")
    public ResponseEntity<?> createProduct(@RequestBody CreateProductRequest request) {
        if (request.getProductName() == null || request.getProductDescription() == null || request.getProductPrice() == null || request.getCategoryId() == null || request.getUserId() == null) {
            return ResponseEntity.badRequest().body("Tous les champs sont obligatoires");
        }
        try {
            CreateProductResponse response = productsService.createProduct(request, null);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }
    
    @PutMapping("update/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable("productId") Long productId, @RequestBody ProductsEntity updatedProduct) {
        ProductsEntity existingProduct = productsService.updateProduct(productId, updatedProduct);
        if (existingProduct != null) {
            return new ResponseEntity<>("Produit mis à jour avec succès", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Produit non trouvé", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") Long productId) {
        productsService.deleteProduct(productId);
        return ResponseEntity.ok("Produit supprimé avec succès !");
    }

}
