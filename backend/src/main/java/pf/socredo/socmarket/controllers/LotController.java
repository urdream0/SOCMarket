package pf.socredo.socmarket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pf.socredo.socmarket.entity.LotEntity;
import pf.socredo.socmarket.entity.ProductsEntity;
import pf.socredo.socmarket.repository.LotRepository;
import pf.socredo.socmarket.repository.ProductsRepository;
import pf.socredo.socmarket.dto.request.CreateLotRequest;

import java.util.List;

@RestController
@RequestMapping("/api/lots")
public class LotController {

    @Autowired
    private LotRepository lotRepository;

    @Autowired
    private ProductsRepository productsRepository;

    /**
     * Crée un nouveau lot et associe les produits existants à ce lot.
     */
    @PostMapping
    public ResponseEntity<String> createLot(@RequestBody CreateLotRequest request) {
        // Crée le lot avec son libellé
        LotEntity lot = new LotEntity();
        lot.setLibelle(request.getLibelle());
        lot = lotRepository.save(lot);

        // Associe les produits à ce lot
        for (CreateLotRequest.ProduitDansLot produitReq : request.getProduits()) {
            ProductsEntity produit = productsRepository.findById(produitReq.getProductId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé : ID " + produitReq.getProductId()));

            produit.setLot(lot);
            produit.setQte(produitReq.getQte());

            productsRepository.save(produit);
        }

        return ResponseEntity.ok("Lot créé avec succès.");
    }

    /**
     * Récupère tous les lots avec leurs produits.
     */
    @GetMapping
    public ResponseEntity<List<LotEntity>> getAllLots() {
        List<LotEntity> lots = lotRepository.findAll();
        return ResponseEntity.ok(lots);
    }
}
