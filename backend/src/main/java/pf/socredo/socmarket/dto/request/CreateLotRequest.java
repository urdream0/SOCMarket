package pf.socredo.socmarket.dto.request;

import java.util.List;

public class CreateLotRequest {

    private String libelle;
    private List<ProduitDansLot> produits;

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<ProduitDansLot> getProduits() {
        return produits;
    }

    public void setProduits(List<ProduitDansLot> produits) {
        this.produits = produits;
    }

    public static class ProduitDansLot {
        private Long productId;
        private int qte;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public int getQte() {
            return qte;
        }

        public void setQte(int qte) {
            this.qte = qte;
        }
    }
}
