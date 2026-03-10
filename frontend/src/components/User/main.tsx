import { useState } from "react";
import { Navigate } from "react-router-dom";

// Definimos la estructura de la memoria del navegador
interface UserSession {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  fotoPerfil?: string;
}

export default function MainUser() {
  const [user] = useState<UserSession | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  if (!localStorage.getItem("user")) {
    return <Navigate to="/LogIn" />;
  }

  if (!user) return null;

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] w-full bg-gray-100">
      <aside className="w-64 bg-nav_steel_gray border-r border-gray-300 flex flex-col p-6 shadow-md select-none">
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              user.fotoPerfil ||
              `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`
            }
            alt={`avatar de ${user.nombre}`}
            className="w-24 h-24 rounded-full bg-white mb-4 border-2 border-gray-400 object-cover shadow-sm"
          />
          <h2 className="text-xl font-bold text-black text-center">
            {user.nombre}
          </h2>
          <span className="text-xs text-white px-2 py-1 bg-gray-800 rounded mt-2 font-mono">
            {user.rol}
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          <button className="text-left px-4 py-2 bg-gray-700 text-white rounded font-semibold transition-colors">
            Mi Perfil
          </button>
          <button className="text-left px-4 py-2 hover:bg-gray-300 hover:text-black text-gray-600 rounded font-semibold transition-colors">
            Mis Boletos
          </button>
        </nav>
      </aside>

      <section className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Información Personal
          </h1>
          <p className="text-gray-600">
            Gestiona tus datos y revisa tu configuración.
          </p>
        </header>

        <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Nombre Completo
              </h3>
              <p className="text-lg text-gray-800 font-medium">{user.nombre}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Correo Electrónico
              </h3>
              <p className="text-lg text-gray-800 font-medium">{user.email}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                ID de Sistema
              </h3>
              <p className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded border border-gray-100 mt-1 inline-block">
                {user.id}
              </p>
            </div>
          </div>

          <footer className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition-colors">
              Editar Perfil
            </button>
          </footer>
        </article>
      </section>
    </main>
  );
}
