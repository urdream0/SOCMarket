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

import pf.socredo.socmarket.dto.request.CreateCategoryRequest;
import pf.socredo.socmarket.dto.response.CreateCategoryResponse;
import pf.socredo.socmarket.entity.CategoryEntity;
import pf.socredo.socmarket.services.CategoryService;

@RestController
@RequestMapping("api/v1/category/")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("list")
    public List<CategoryEntity> getAllCategory() {
        return categoryService.getAllCategory();
    }
    
    @PostMapping("create")
    public ResponseEntity<?> createCategory(@RequestBody CreateCategoryRequest request) {
    try {
        CreateCategoryResponse response = categoryService.createCategory(request, null);
        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
    }

    }

    
    @GetMapping("{categoryId}")
    public Optional<CategoryEntity> findCategoryById(@PathVariable("categoryId") Long categoryId) {
        return categoryService.findById(categoryId);
    }

    @PutMapping("update/{categoryId}")
    public ResponseEntity<String> updateCategory(@PathVariable("categoryId") Long categoryId, @RequestBody CategoryEntity updatedCategory) {
        CategoryEntity existingCategory = categoryService.updateCategory(categoryId, updatedCategory);
        if (existingCategory != null) {
            return new ResponseEntity<>("Catégorie mise à jour avec succès", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Catégorie non trouvée", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Produit supprimé avec succès");
    }
    
}
