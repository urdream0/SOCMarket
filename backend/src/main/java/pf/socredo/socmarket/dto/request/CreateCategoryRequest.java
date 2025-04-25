package pf.socredo.socmarket.dto.request;

public class CreateCategoryRequest {
    private Long categoryId;
    private String categoryName;


    public CreateCategoryRequest(Long categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;

    }

    public CreateCategoryRequest() {}

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
