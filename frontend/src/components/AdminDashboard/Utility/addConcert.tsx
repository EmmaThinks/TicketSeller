import { useState } from "react";

export default function AddConcert() {
  const [formData, setFormData] = useState({
    titulo: "",
    banda: "",
    descripcion: "",
    fotoConcierto: "",
    fecha: "",
    lugar: "",
    capacidad: 0,
    precio: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/conciertos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("¡Concierto y tickets creados con éxito en la base de datos!");
      } else {
        alert("Hubo un error al guardar el concierto.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <section className="flex justify-center items-center h-full bg-white text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Agregar Nuevo Concierto
        </h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="titulo" className="text-sm text-gray-300">
            Título del Evento
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="banda" className="text-sm text-gray-300">
            Banda / Artista
          </label>
          <input
            type="text"
            id="banda"
            name="banda"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="descripcion" className="text-sm text-gray-300">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white resize-none h-24"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="fotoConcierto" className="text-sm text-gray-300">
            URL de la Imagen
          </label>
          <input
            type="url"
            id="fotoConcierto"
            name="fotoConcierto"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fecha" className="text-sm text-gray-300">
              Fecha y Hora
            </label>
            {/* El input datetime-local formatea perfecto para el new Date() del backend */}
            <input
              type="datetime-local"
              id="fecha"
              name="fecha"
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lugar" className="text-sm text-gray-300">
              Lugar / Foro
            </label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="capacidad" className="text-sm text-gray-300">
              Capacidad
            </label>
            <input
              type="number"
              id="capacidad"
              name="capacidad"
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
              min="1"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="precio" className="text-sm text-gray-300">
              Precio del Ticket ($)
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-gray-400 hover:bg-gray-700 hover:text-white text-black font-bold py-2 px-4 rounded transition-colors"
        >
          Guardar Concierto
        </button>
      </form>
    </section>
  );
}
