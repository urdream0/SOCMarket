"use client";

import { useEffect, useState } from "react";

type Produit = {
  productId: number;
  productName: string;
  qte: number;
  productPrice: number;
};

type Lot = {
  idLot: number;
  libelle: string;
  produits: Produit[];
};

export default function LotsPage() {
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    fetch("https://socmarket-api.up.railway.app/api/lots") // ou http://localhost:8080/api/lots
      .then((res) => res.json())
      .then((data) => setLots(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📦 Tous les lots disponibles</h1>

      {lots.length === 0 ? (
        <p>Aucun lot trouvé.</p>
      ) : (
        lots.map((lot) => {
          const prixTotal = lot.produits.reduce(
            (total, p) => total + p.productPrice * p.qte,
            0
          );

          return (
            <div
              key={lot.idLot}
              className="bg-white shadow-md rounded-lg p-6 mb-6 border"
            >
              <h2 className="text-xl font-semibold mb-2">{lot.libelle}</h2>
              <ul className="list-disc ml-5">
                {lot.produits.map((p) => (
                  <li key={p.productId}>
                    {p.qte} × {p.productName}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-medium text-green-700">
                💰 Prix total estimé : {prixTotal} €
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
