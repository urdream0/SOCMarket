"use client"; // ✅ Ajoute ceci pour rendre le composant interactif

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const res = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/products/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des produits. Veuillez vous connectez.");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="p-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <Link href={`/product/${product.productId}`} key={product.productId}>
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-700 border border-gray-300 overflow-hidden group">
            <div className="relative">
              <img
                src={
                  product.productImageName
                    ? `/images/photos/${product.productImageName}`
                    : "/images/default.jpg"
                }
                alt={product.productName || "Produit"}
                className="w-full h-64 object-cover rounded-t-2xl transition-transform transform group-hover:scale-105 duration-300"
              />
            </div>
            <div className="p-5">
              <h5 className="text-black text-center font-semibold text-lg mb-2">
                {product.productName}
              </h5>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src="https://tailwindcss.com/_next/static/media/3d-transforms.ebde7a6a.jpeg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-700 font-medium">FAUA TEHAU</p>
              </div>
              <p className="text-green-600 text-xl text-center font-semibold">
                {product.productPrice} CFP
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
