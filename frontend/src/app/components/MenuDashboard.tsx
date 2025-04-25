import Link from "next/link";
export default async function MenuDashboard() {
    return (
        <ul className="flex space-x-5">
            <li><Link href="/profile">👤 Profil</Link></li>
            <li><Link href="/dashboard">📜 Dashboard</Link></li>
            <li><Link href="/products">🛒 Mes produits</Link></li>
        </ul>
    );
}