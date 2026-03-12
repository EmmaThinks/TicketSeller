import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface UserSession {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  fotoPerfil?: string;
}

interface OrderData {
  id: string;
  total: number | string;
  fecha_compra: string;
  tickets: {
    id: string;
    concierto: {
      titulo: string;
      banda: string;
      fecha: string;
      lugar: string;
    };
  }[];
}

export default function MainUser() {
  const [user] = useState<UserSession | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [activeTab, setActiveTab] = useState<"perfil" | "boletos">("perfil");
  const [ordenes, setOrdenes] = useState<OrderData[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/api/usuarios/${user.id}/ordenes`)
        .then((res) => res.json())
        .then((data) => setOrdenes(data))
        .catch((err) => console.error("Error cargando boletos:", err));
    }
  }, [user]);

  if (!localStorage.getItem("user")) return <Navigate to="/LogIn" />;
  if (!user) return null;

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] w-full bg-gray-100">
      {/* BARRA LATERAL */}
      <aside className="w-64 bg-nav_steel_gray border-r border-gray-300 flex flex-col p-6 shadow-md select-none">
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              user.fotoPerfil ||
              `https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg?semt=ais_rp_progressive&w=740&q=80`
            }
            alt={`Avatar de ${user.nombre}`}
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
          <button
            onClick={() => setActiveTab("perfil")}
            className={`text-left px-4 py-2 rounded font-semibold transition-colors ${
              activeTab === "perfil"
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-300 text-gray-600"
            }`}
          >
            Mi Perfil
          </button>
          <button
            onClick={() => setActiveTab("boletos")}
            className={`text-left px-4 py-2 rounded font-semibold transition-colors ${
              activeTab === "boletos"
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-300 text-gray-600"
            }`}
          >
            Mis Boletos
          </button>
        </nav>
      </aside>

      <section className="flex-1 p-8 overflow-y-auto">
        {activeTab === "perfil" && (
          <div className="animate-fade-in">
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
                  <h3 className="text-xs font-bold text-gray-500 uppercase">
                    Nombre Completo
                  </h3>
                  <p className="text-lg text-gray-800 font-medium">
                    {user.nombre}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase">
                    Correo Electrónico
                  </h3>
                  <p className="text-lg text-gray-800 font-medium">
                    {user.email}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase">
                    ID de Sistema
                  </h3>
                  <p className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded border mt-1 inline-block">
                    {user.id}
                  </p>
                </div>
              </div>
            </article>
          </div>
        )}

        {activeTab === "boletos" && (
          <div className="animate-fade-in">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Mis Boletos</h1>
              <p className="text-gray-600">
                Historial de compras y accesos a tus eventos.
              </p>
            </header>

            {ordenes.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500 text-lg">
                  Aún no has comprado ningún boleto.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {ordenes.map((orden) => (
                  <article
                    key={orden.id}
                    className="bg-white p-0 rounded-xl shadow-sm border border-gray-200 flex overflow-hidden"
                  >
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                          Orden confirmada
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800 mt-1">
                          {orden.tickets[0]?.concierto.titulo}
                        </h2>
                        <p className="text-gray-600">
                          {orden.tickets[0]?.concierto.banda}
                        </p>
                      </div>

                      <div className="mt-4 flex gap-6 text-sm text-gray-500">
                        <span>
                          {" "}
                          {new Date(
                            orden.tickets[0]?.concierto.fecha,
                          ).toLocaleDateString()}
                        </span>
                        <span> {orden.tickets[0]?.concierto.lugar}</span>
                      </div>
                    </div>

                    <div className="bg-gray-800 text-white p-6 flex flex-col justify-center items-center min-w-[200px] border-l-4 border-dashed border-gray-400">
                      <span className="text-sm text-gray-400 mb-1">
                        CANTIDAD
                      </span>
                      <span className="text-4xl font-black mb-2">
                        {orden.tickets.length}
                      </span>
                      <span className="text-sm font-mono bg-gray-900 px-2 py-1 rounded border border-gray-700">
                        Total: ${orden.total}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
