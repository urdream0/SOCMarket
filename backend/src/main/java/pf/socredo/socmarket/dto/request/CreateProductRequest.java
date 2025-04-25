package pf.socredo.socmarket.dto.request;

public class CreateProductRequest {
    private String productName;
    private String productDescription;
    private Integer productPrice;
    private Long categoryId;
    private Long userId;
    private String productImageName;

    public CreateProductRequest(String productName, String productDescription, Integer productPrice, Long categoryId, Long userId, String productImageName) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.categoryId = categoryId;
        this.userId = userId;
        this.productImageName = productImageName;
    }

    public CreateProductRequest() {}
   
    public String getProductName() {
        return productName;
    }   

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Integer getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Integer productPrice) {
        this.productPrice = productPrice;
    }

    public Long getCategoryId() {
        return categoryId;
    }   

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProductImageName() {
        return productImageName;
    }

    public void setProductImageName(String productImageName) {
        this.productImageName = productImageName;
    }   
}
