package pf.socredo.socmarket.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "products")
public class ProductsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name= "product_description")
    private String productDescription;
    
    @Column(name = "product_categorie_id")
    private Long categoryId;

    @Column(name= "product_price")
    private Integer productPrice;

    @Column(name= "product_user_id")
    private Long userId;
    
    @Column(name= "product_image_name")
    private String productImageName;

    public ProductsEntity() {
    }

    public ProductsEntity(Long productId, String productName, String productDescription,Long categoryId, Integer productPrice, Long userId, String productImageName) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.categoryId = categoryId;
        this.productPrice = productPrice;
        this.userId = userId;
        this.productImageName = productImageName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

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
