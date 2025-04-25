import ProductList from "../../components/ProductsList";

export default function productslist() {
  return (
    <main className=" mt-24">
      <h1 className=" text-white text-2xl font-bold text-center z-50 border border-black rounded-full grow-20 bg-black p-2 ">
        Liste des produits
      </h1>
      <ProductList />
    </main>
  );
}
