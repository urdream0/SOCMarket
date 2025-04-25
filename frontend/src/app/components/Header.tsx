import SocMarketLogo from "./SocMarketLogo";

export default async function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-black shadow-md bg-white mb-0">
      <div className="container flex justify-center items-center mx-auto p-1">
        <SocMarketLogo />
        <h1 className="font-sans text-2xl">SOC MARKET</h1>
      </div>
    </header>
  );
}