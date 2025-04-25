"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDelete() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://socmarket-backend-production.up.railway.app/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((product) => {
        setFormData({
          productName: product.productName,
          productDescription: product.productDescription,
          productPrice: product.productPrice,
          categoryId: product.categoryId,
          productImageName: product.productImageName,
          userId: product.userId,
        });
      });
  }, []);

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    categoryId: 0,
    productImageName: "",
    userId: 1,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`https://socmarket-backend-production.up.railway.app/api/v1/products/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/product/list");
    } else {
      console.error("Erreur lors de la suppression du produit");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-60">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-500 mb-4">
        Supprimer le produit
      </h1>
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
            >
              Nom du produit:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500  text-black"
              onChange={(event) =>
                setFormData({ ...formData, productName: event.target.value })
              }
            />
          </div>
  
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
            >
              Description du produit:
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  productDescription: event.target.value,
                })
              }
            />
          </div>
  
          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
            >
              Prix du produit:
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={formData.productPrice}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
              onChange={(event) =>
                setFormData({ ...formData, productPrice: Number(event.target.value) })
              }
            />
          </div>
  
          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
            >
              Catégorie du produit:
            </label>
            <input
              type="number"
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
              onChange={(event) =>
                setFormData({ ...formData, categoryId: Number(event.target.value) })
              }
            />
          </div>
  
          <div className="mb-4">
            <label
              htmlFor="productImageName"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
            >
              Image du produit:
            </label>
            <input
              type="text"
              id="productImageName"
              name="productImageName"
              value={formData.productImageName}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  productImageName: event.target.value,
                })
              }
            />
          </div>
  
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Supprimer le produit
          </button>
        </form>
      </div>
    </div>
  );
}