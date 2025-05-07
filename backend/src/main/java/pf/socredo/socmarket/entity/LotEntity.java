package pf.socredo.socmarket.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "lot")
public class LotEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lot")
    private Long idLot;

    @Column(nullable = false)
    private String libelle;

    @OneToMany(mappedBy = "lot", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductsEntity> produits;

    public LotEntity() {}

    public LotEntity(Long idLot, String libelle) {
        this.idLot = idLot;
        this.libelle = libelle;
    }

    public Long getIdLot() {
        return idLot;
    }

    public void setIdLot(Long idLot) {
        this.idLot = idLot;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<ProductsEntity> getProduits() {
        return produits;
    }

    public void setProduits(List<ProductsEntity> produits) {
        this.produits = produits;
    }
}
