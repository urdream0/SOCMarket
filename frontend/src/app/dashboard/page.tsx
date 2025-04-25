"use client";
import ClickCounterPerProductVisit from "../components/ClickCounterPerProductVisit";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  categoryId: number;
  productImageName: string;
  userId: number;
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const userId = 1;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/products/list");
      if (!response.ok) throw new Error("Échec du chargement des produits");

      const data = await response.json();
      setProducts(data.filter((product: Product) => product.userId === userId));
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
    <div className="mt-28 mx-60">
      <h1 className="text-3xl font-bold text-center text-black">Dashboard</h1>

      <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 text-lg font-bold text-black">Mes produits</th>
              <th className="px-4 py-3 text-lg font-bold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                
                <tr key={product.productId} className="border-b border-gray-200 hover:bg-gray-100 text-black">
                  <td className="px-4 py-3 text-lg">
                    
                    <Link href={`/product/${product.productId}`} key={product.productId}>
                    {product.productName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-10 justify-end">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                          Voir
                        </button>
                      <a href={`/product/edit/${product.productId}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                          Modifier
                        </button>
                      </a>
                      <a href={`/product/delete/${product.productId}`}>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Supprimer
                        </button>
                      </a>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><ClickCounterPerProductVisit /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-4 text-center text-gray-500">
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <a href="/product/create">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ajouter un produit
          </button>
        </a>
      </div>
    </div>
    </>
  );
}
