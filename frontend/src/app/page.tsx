import ProductList from "./components/ProductsList";
import { SearchBar } from "./components/SearchBar";

export default function HomePage() {
  return (
    <main className="p-20">
      <div className="p-10">
        <h1 className="text-2xl font-bold text-center z-50 text-black">
          Bienvenue sur SOC Market
        </h1>
        <br></br>
        <SearchBar />
      </div>
      <div className="border border-black rounded-full grow-20 bg-black p-2 ">
        <h2 className="text-2xl font-bold text-center z-50 text-white tracking-wide">
          NOS PRODUITS
        </h2>
      </div>
      <ProductList />
    </main>
  );
}
