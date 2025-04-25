"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import { useRouter } from "next/router";

type product = {
  productName: string;
  productDescription: string;
  productPrice: number;
  categoryId: number;
  productImageName: string;
  userId: number;
};

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://socmarket-backend-production.up.railway.app/api/v1/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20">
      <div className="aspect-square w-full rounded-t-md bg-indigo-600 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-72 flex justify-center">
        <img
          src={`/images/photos/${product.productImageName}`}
          alt={product.productName}
          className="aspect-square-t-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 mt-28 border border-black rounded-xl"
        />
      </div>
      <div className="flex justify-end mr-20 ">
          <button 
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute mt-96">
            Retour à l'accueil
          </button>
        </div>
      <div className="p-5 flex-direction-column mt-32">
        <h5 className="text-black flex justify-center pb-6 text-xl text-bold">
          {product.productName}
        </h5>
        <p className="text-black flex justify-center pb-6 text-xl text-bold">
          {product.productDescription}
        </p>
        <p className="text-black flex justify-center pb-6 text-xl text-bold">
          Prix : {product.productPrice} €
        </p>
        <p className="text-black flex justify-center pb-6 text-xl text-bold">
          Categorie : {product.categoryId}
        </p>
        <p className="text-black flex justify-center pb-6 text-xl text-bold">
          Image : {product.productImageName}
        </p>
        <p className="text-black flex justify-center pb-6 text-xl text-bold">
          Utilisateur : {product.userId}
        </p>
      </div>
    </div>
  );
}
