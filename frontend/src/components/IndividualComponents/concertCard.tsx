import { Link, useNavigate } from "react-router-dom";

interface Card {
  id: string;
  titulo: string;
  banda: string;
  fecha: string;
  lugar: string;
  foto: string;
}

export default function ConcertCard({
  id,
  foto,
  titulo,
  banda,
  fecha,
  lugar,
}: Card) {
  const navigate = useNavigate();

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
        alert("¡Boleto comprado y añadido a tu cuenta!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al procesar la compra.");
    }
  };

  const buttonClass =
    "w-[45%] hover:w-[80%] hover:text-white hover:animate-gradient hover:bg-linear-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:bg-[length:200%_auto] hover:transition-all hover:duration-1000 rounded h-full bg-white text-black font-semibold transition-all duration-1000 flex items-center justify-center";

  return (
    <article className="h-[40vh] bg-gray-700 w-[20vw] rounded-2xl flex flex-col drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] m-3 overflow-hidden">
      <figure className="w-full h-[55%] bg-black m-0">
        <img
          src={foto}
          alt={`Concierto de ${banda}`}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="flex flex-col px-4 py-2 grow text-white">
        <h3 className="text-lg font-bold truncate leading-tight">{titulo}</h3>
        <p className="text-sm text-gray-300 truncate mb-1">{banda}</p>

        <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
          <span className="truncate max-w-[50%]">{lugar}</span>
          <time dateTime={new Date(fecha).toISOString()}>
            {new Date(fecha).toLocaleDateString()}
          </time>
        </div>
      </div>

      <section className="flex flex-row justify-center gap-2 w-full h-[12%] m-auto pb-3 px-3">
        <Link to={`/Concerts/${id}`} className={buttonClass}>
          Detalles
        </Link>

        <button onClick={handleComprar} className={buttonClass}>
          Comprar
        </button>
      </section>
    </article>
  );
}
