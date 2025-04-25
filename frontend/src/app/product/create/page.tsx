"use client";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";


export default function ProductCreate() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    categoryId: 0,
    productImageName: "",
    userId: 1,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/category/list");
        if (!res.ok) {
          throw new Error(`Erreur: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("❌ Erreur lors du fetch des catégories :", err);
      }
    };
  
    fetchCategories();
  }, []);

  async function uploadFile(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement de l'image");
      }

      const data = await response.json();
      return data.fileName;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let uploadedFileName = formData.productImageName;

    if (selectedFile) {
      const fileName = await uploadFile(selectedFile);
      if (!fileName) {
        setResponseMessage("Erreur lors de l'upload de l'image");
        return;
      }
      uploadedFileName = fileName;
    }

    const payload = { ...formData, productImageName: uploadedFileName };

    try {
      const response = await fetch(
        "https://socmarket-backend-production.up.railway.app/api/v1/products/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage(data.message);

      setFormData({
        productName: "",
        productDescription: "",
        productPrice: 0,
        categoryId: 0,
        productImageName: "",
        userId: 1,
      });
      setSelectedFile(null);
    } catch (error) {
      setResponseMessage(
        "Une erreur s'est produite lors de la création du produit."
      );
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-sky-600">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-black">
            Création d'un produit
          </h2>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-bold text-black">
                Nom du produit
              </label>
              <input
                name="productName"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
              ring-emerald-500 outline-none"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-bold text-black">
                Description
              </label>
              <input
                name="productDescription"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
              ring-emerald-500 outline-none"
                value={formData.productDescription}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-bold text-black">Prix</label>
              <input
                name="productPrice"
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
              ring-emerald-500 outline-none"
                value={formData.productPrice}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-bold text-black">Catégorie</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 ring-emerald-500 outline-none"
              >
                <option value="">Choisissez une catégorie</option>
                {categories.map((cat: any) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-bold text-black">Photo</label>
              <input
                name="productImageName"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
                        ring-emerald-500 outline-none hover:file:cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
              >
                Ajouter
              </button>
            </div>
            {responseMessage && (
              <p className="text-center mt-4">{responseMessage}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
