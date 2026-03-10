import { useState, useEffect } from "react";
import ConcertCard from "./IndividualComponents/concertCard";
import Footer from "./IndividualComponents/footer";

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

export default function Concerts() {
  const [conciertos, setConciertos] = useState<ConcertData[]>([]);

  useEffect(() => {
    const fetchConciertos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/conciertos");
        if (response.ok) {
          const data = await response.json();
          setConciertos(data);
        }
      } catch (error) {
        console.error("Error al obtener el catálogo:", error);
      }
    };

    fetchConciertos();
  }, []);

  return (
    <main className="min-h-screen bg-white  flex flex-col items-center">
      <section className="mt-10 w-[40%] bg-gray-600 text-white flex justify-center items-center h-[10vh] rounded-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
        <h1 className="text-4xl font-bold text-center mb-10">
          Todos los Conciertos
        </h1>
      </section>

      <section className="grid grid-cols-4 gap-6">
        {conciertos.map((concierto) => (
          <ConcertCard
            key={concierto.id}
            id={concierto.id}
            titulo={concierto.titulo}
            banda={concierto.banda}
            fecha={concierto.fecha}
            lugar={concierto.lugar}
            foto={concierto.fotoConcierto}
          />
        ))}

        {conciertos.length === 0 && (
          <p className="text-gray-400">Aún no hay conciertos programados.</p>
        )}
      </section>

      <Footer />
    </main>
  );
}
