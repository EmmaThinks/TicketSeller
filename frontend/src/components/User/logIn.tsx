import { useState } from "react";
import { Link } from "react-router-dom";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();

        localStorage.setItem("user", JSON.stringify(userData));

        window.location.href = "/";
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Hubo un problema de conexión con el servidor.");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] bg-white text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-5 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Iniciar Sesión</h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-300">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Entrar
        </button>

        <p className="text-center text-sm text-gray-400 mt-2">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/SignIn"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </main>
  );
}
