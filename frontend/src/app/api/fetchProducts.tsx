export const fetchProducts = async () => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

    const res = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/products/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Réponse invalide du serveur" }));
        throw new Error(errorData.error || "Erreur inconnue");
    }

    return await res.json();
};
