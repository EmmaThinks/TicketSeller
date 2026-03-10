import { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";

interface UserSession {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  fotoPerfil?: string;
}

export default function MainAdmin() {
  const [user] = useState<UserSession | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  if (!user) {
    return <Navigate to="/LogIn" />;
  }
  if (user.rol !== "ADMIN") {
    return <Navigate to="/" />;
  }

  const optionClassName = ({ isActive }: { isActive: boolean }) =>
    `text-left px-4 py-2 rounded font-semibold transition-colors ${
      isActive
        ? "bg-gray-700 text-white"
        : "hover:bg-gray-300 hover:text-black text-gray-600"
    }`;

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] w-full bg-gray-100">
      <aside className="w-64 bg-nav_steel_gray border-r border-gray-300 flex flex-col p-6 shadow-md select-none">
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              user.fotoPerfil ||
              `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`
            }
            alt={`Avatar de ${user.nombre}`}
            className="w-24 h-24 rounded-full bg-white mb-4 border-2 border-red-500 object-cover shadow-sm"
          />
          <h2 className="text-xl font-bold text-black text-center">
            {user.nombre}
          </h2>
          <span className="text-xs text-white px-2 py-1 bg-red-600 rounded mt-2 font-mono shadow-sm">
            {user.rol}
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="" end className={optionClassName}>
            Resumen
          </NavLink>
          <NavLink to="AddConcert" className={optionClassName}>
            Añadir Concierto
          </NavLink>
          <NavLink to="EditConcert" className={optionClassName}>
            Editar Existentes
          </NavLink>
        </nav>
      </aside>

      <section className="flex-1 overflow-y-auto">
        <Outlet />
      </section>
    </main>
  );
}
