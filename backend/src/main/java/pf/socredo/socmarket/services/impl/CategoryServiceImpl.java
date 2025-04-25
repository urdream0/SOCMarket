package pf.socredo.socmarket.services.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import pf.socredo.socmarket.dto.request.CreateCategoryRequest;
import pf.socredo.socmarket.dto.response.CreateCategoryResponse;
import pf.socredo.socmarket.entity.CategoryEntity;
import pf.socredo.socmarket.repository.CategoryRepository;
import pf.socredo.socmarket.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public  CreateCategoryResponse createCategory(CreateCategoryRequest request, HttpServletRequest httpRequest) { 
        CategoryEntity category = new CategoryEntity();
        category.setCategoryName(request.getCategoryName());
        categoryRepository.save(category);
        return createCategoryResponse(request, category);
    }

    private CreateCategoryResponse createCategoryResponse(CreateCategoryRequest request, CategoryEntity category) {
        CreateCategoryResponse response = new CreateCategoryResponse();
        response.setMessage("La categorie a bien été ajouté");
        return response;
    }

    @Override
    public Optional<CategoryEntity> findById(Long categoryId) {
        return categoryRepository.findById(categoryId);
}

    @Override
    public List<CategoryEntity> getAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryEntity updateCategory(Long categoryId, CategoryEntity updatedCategory) {

        CategoryEntity existingCategory = categoryRepository.findById(categoryId).orElse(null);
        
        if (existingCategory != null) {
            existingCategory.setCategoryName(updatedCategory.getCategoryName());
            return categoryRepository.save(existingCategory);
        }
        return null;
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
    
}