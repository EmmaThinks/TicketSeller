import { useParams, Link } from "react-router-dom";

export default function ConcertDetails() {
  const { id } = useParams();

  return (
    <main className="p-8">
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <header className="bg-gray-800 text-white p-6">
          <h1 className="text-3xl font-bold">Detalles del Concierto</h1>
          <p>ID de referencia: {id}</p>
        </header>

        <section className="p-6">
          <p className="mb-4">
            Aquí irá la descripción larga, fecha exacta, y mapa del lugar.
          </p>

          <div className="flex justify-end mt-8">
            <Link
              to={`/Concerts/${id}/comprar`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors"
            >
              Comprar Boletos
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
