import { useState, useEffect } from "react";

interface AdminStats {
  conciertos: number;
  usuarios: number;
  ticketsVendidos: number;
  ingresosTotales: string | number;
}

export default function AdminSummary() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error al cargar stats:", err));
  }, []);

  if (!stats) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-xl font-bold text-gray-500 animate-pulse">
          Calculando métricas...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Resumen General</h1>
        <p className="text-gray-600">
          Métricas principales de tu plataforma en tiempo real.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Total Conciertos"
          valor={stats.conciertos}
          icono="🎸"
        />
        <StatCard titulo="Clientes Activos" valor={stats.usuarios} icono="👥" />
        <StatCard
          titulo="Boletos Vendidos"
          valor={stats.ticketsVendidos}
          icono="🎟️"
        />
        <StatCard
          titulo="Ingresos Totales"
          valor={`$${stats.ingresosTotales}`}
          icono="💰"
        />
      </section>
    </div>
  );
}

function StatCard({
  titulo,
  valor,
  icono,
}: {
  titulo: string;
  valor: string | number;
  icono: string;
}) {
  return (
    <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="text-4xl bg-gray-50 p-3 rounded-lg border border-gray-100">
        {icono}
      </div>
      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {titulo}
        </h3>
        <p className="text-2xl font-black text-gray-900">{valor}</p>
      </div>
    </article>
  );
}
