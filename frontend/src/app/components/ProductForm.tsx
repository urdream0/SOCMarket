
import { FormEvent, use } from "react";
export default async function ProductForm() {
  const categories = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/category/list");
  const post = await categories.json();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/products/create", {
      method: "POST",
      body: formData,
    });
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Création d'un produit
        </h2>
        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Nom du produit
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
              ring-emerald-500 outline-none"
              placeholder="Nom du produit"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Description du produit
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
              ring-emerald-500 outline-none"
              placeholder="Description du produit"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Prix du produit
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
              ring-emerald-500 outline-none"
              placeholder="Prix du produit"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Categorie du produit
            </label>
            <div>
              <select
                id="categorylist"
                name="categorylist"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 ring-emerald-500 outline-none"
              >
                <option value="">Choisissez une catégorie</option>
                {post.map((post: any) => (
                  <option key={post.categoryId} value={post.categoryId}>
                    {post.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Photo du produit
            </label>
            <input
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5
              ring-emerald-500 outline-none hover:file:cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
