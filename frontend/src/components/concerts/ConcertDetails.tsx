import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

interface ConcertData {
  id: string;
  titulo: string;
  banda: string;
  descripcion: string;
  fotoConcierto: string;
  fecha: string;
  lugar: string;
  capacidad: number;
}

export default function ConcertDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [concierto, setConcierto] = useState<ConcertData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/conciertos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setConcierto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando detalles:", err);
        setLoading(false);
      });
  }, [id]);

  const handleComprar = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Debes iniciar sesión para comprar boletos.");
      return navigate("/LogIn");
    }

    const user = JSON.parse(storedUser);

    try {
      const response = await fetch("http://localhost:3000/api/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: user.id,
          conciertoId: id,
          cantidad: 1,
        }),
      });

      if (response.ok) {
        alert("¡Boleto comprado con éxito! Revisa tu panel de usuario.");
        navigate("/UserDashboard");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al procesar la compra.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-gray-500 animate-pulse">
          Cargando escenario...
        </p>
      </main>
    );
  }

  if (!concierto) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Concierto no encontrado
        </h1>
        <Link to="/Concerts" className="text-blue-600 hover:underline">
          Volver a la cartelera
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-gray-100 py-10 px-4 flex justify-center">
      <article className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <figure className="md:w-1/2 h-64 md:h-auto bg-black m-0 relative">
          <img
            src={
              concierto.fotoConcierto ||
              "https://via.placeholder.com/800x600?text=Sin+Imagen"
            }
            alt={`Póster de ${concierto.titulo}`}
            className="w-full h-full object-cover opacity-90"
          />

          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-mono backdrop-blur-sm">
            Aforo: {concierto.capacidad} personas
          </div>
        </figure>

        <section className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <header className="mb-6">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">
              {concierto.banda}
            </h2>
            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
              {concierto.titulo}
            </h1>

            <div className="flex flex-col gap-2 text-gray-600 font-medium">
              <span className="flex items-center gap-2">
                <span className="text-gray-800">{concierto.lugar}</span>
              </span>
              <span className="flex items-center gap-2">
                <time dateTime={new Date(concierto.fecha).toISOString()}>
                  {new Date(concierto.fecha).toLocaleString([], {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </time>
              </span>
            </div>
          </header>

          <div className="prose prose-gray mb-8 grow">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Acerca del evento
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {concierto.descripcion}
            </p>
          </div>

          <footer className="mt-auto pt-6 border-t border-gray-200 flex items-center justify-between">
            <Link
              to="/Concerts"
              className="text-gray-500 hover:text-gray-800 font-semibold transition-colors"
            >
              ← Volver
            </Link>

            <button
              onClick={handleComprar}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Comprar Boleto
            </button>
          </footer>
        </section>
      </article>
    </main>
  );
}
