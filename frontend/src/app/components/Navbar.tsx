import Link from "next/link";
import Header from "./Header";

export default async function Navbar() {
  return (
    <>
      <Header />
      <nav className="border border-none fixed top-14 left-0 w-full z-40 bg-green-500 text-white width-auto mt-0 margin-top--1px">
        <div className="container mx-auto p-4 flex justify-center items-center">
          <form>
            <input name="search" type="search" placeholder="Rechercher" />
            <button type="submit" className="bg-blue-300 hover:bg-blue-500 text-black font-bold rounded ">‎ 🔍‎</button>
          </form>
          <ul className="flex space-x-5">
            <li><Link href="/">🏠 Accueil</Link></li>
            <li><Link href="/dashboard">📈 Dashboard</Link></li>
            <li><Link href="/profile/1">👤 Profil</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}