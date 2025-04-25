"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Si tu souhaites gérer le rôle en front, on peut le fixer en dur ou le rendre dynamique.
  const [role] = useState("USER");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          login,
          password,
          role,
        }),
      });

      if (!res.ok) {
        throw new Error("Une erreur s'est produite lors de l'inscription.");
      }

      // Ici on récupère la réponse JSON (token, ou autre)
      const data = await res.json();
      // Exemple : si le backend renvoie un token dès l'inscription
      document.cookie = `token=${data.token}; path=/; max-age=86400`;

      // Rediriger l’utilisateur après l’inscription
      // Soit vers le dashboard, soit vers la page de login
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite !");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Inscription
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-bold mb-2"
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-bold mb-2"
          >
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="login"
            className="block text-gray-700 font-bold mb-2"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Si tu veux mettre le rôle en dur, c’est déjà géré
            Sinon, tu peux ajouter un champ : 
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-bold mb-2"
          >
            Rôle
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="USER">Utilisateur</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </div>
        */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          S'inscrire
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Déjà un compte ?
            <a href="/login" className="text-blue-500 hover:underline ml-1">
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
