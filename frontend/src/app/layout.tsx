import Navbar from "../app/components/Navbar";
import ScrollUpButton from "../app/components/ScrollUpButton";
import Menu from "./components/MenuDashboard";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100">
        <Navbar />
        <Menu />
        <ScrollUpButton />
        {children}
      </body>
    </html>
  );
}
