"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://socmarket-backend-production.up.railway.app/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!res.ok) {
        throw new Error("Identifiants incorrects !");
      }

      const data = await res.json();
      document.cookie = `token=${data.token}; path=/; max-age=86400`;

      router.push("/dashboard"); // Redirection après connexion
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
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Connexion
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="login" className="block text-gray-700 font-bold mb-2">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="username"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black "
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
            autoComplete="current-password"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Se connecter
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Pas encore de compte ?
            <a href="/signup" className="text-blue-500 hover:underline ml-1">
              S'inscrire
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
