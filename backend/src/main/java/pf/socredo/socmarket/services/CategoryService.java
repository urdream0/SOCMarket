package pf.socredo.socmarket.services;

import java.util.List;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import pf.socredo.socmarket.dto.request.CreateCategoryRequest;
import pf.socredo.socmarket.dto.response.CreateCategoryResponse;
import pf.socredo.socmarket.entity.CategoryEntity;

public interface CategoryService {
    CreateCategoryResponse createCategory(CreateCategoryRequest request , HttpServletRequest httpRequest);
    Optional<CategoryEntity> findById(Long categoryId);
    List<CategoryEntity> getAllCategory();
    CategoryEntity updateCategory(Long categoryId, CategoryEntity category);
    void deleteCategory(Long categoryId);
}