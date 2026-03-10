import { useState, useEffect } from "react";

interface ConcertData {
  id: string;
  titulo: string;
  banda: string;
  descripcion: string;
  fotoConcierto: string;
  fecha: string;
  lugar: string;
}

export default function EditConcert() {
  const [conciertos, setConciertos] = useState<ConcertData[]>([]);
  const [selectedId, setSelectedId] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    banda: "",
    descripcion: "",
    fotoConcierto: "",
    fecha: "",
    lugar: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/conciertos")
      .then((res) => res.json())
      .then((data) => setConciertos(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);

    if (id) {
      const conciertoElegido = conciertos.find((c) => c.id === id);
      if (conciertoElegido) {
        setFormData({
          titulo: conciertoElegido.titulo,
          banda: conciertoElegido.banda || "",
          descripcion: conciertoElegido.descripcion || "",
          fotoConcierto: conciertoElegido.fotoConcierto || "",
          fecha: new Date(conciertoElegido.fecha).toISOString().slice(0, 16),
          lugar: conciertoElegido.lugar,
        });
      }
    } else {
      setFormData({
        titulo: "",
        banda: "",
        descripcion: "",
        fotoConcierto: "",
        fecha: "",
        lugar: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return alert("Selecciona un concierto primero");

    try {
      const response = await fetch(
        `http://localhost:3000/api/conciertos/${selectedId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) alert("¡Concierto actualizado!");
      else alert("Error al actualizar");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return alert("Selecciona un concierto primero");

    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este concierto y todos sus tickets?",
    );
    if (!confirmacion) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/conciertos/${selectedId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("¡Concierto eliminado para siempre!");
        setSelectedId("");
        setFormData({
          titulo: "",
          banda: "",
          descripcion: "",
          fotoConcierto: "",
          fecha: "",
          lugar: "",
        });
        setConciertos(conciertos.filter((c) => c.id !== selectedId));
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-white text-white p-6">
      <div className="bg-gray-600 p-8 rounded-xl shadow-lg flex flex-col gap-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center">
          Gestión de Conciertos
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">
            Selecciona el concierto a gestionar:
          </label>
          <select
            className="p-2 rounded bg-gray-500 text-white cursor-pointer"
            value={selectedId}
            onChange={handleSelectChange}
          >
            <option value="">-- Elige un concierto --</option>
            {conciertos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.titulo} ({c.banda})
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Banda</label>
              <input
                type="text"
                name="banda"
                value={formData.banda}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white resize-none h-20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">URL de la Imagen</label>
              <input
                type="url"
                name="fotoConcierto"
                value={formData.fotoConcierto}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Fecha</label>
                <input
                  type="datetime-local"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Lugar</label>
                <input
                  type="text"
                  name="lugar"
                  value={formData.lugar}
                  onChange={handleChange}
                  className="p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <button
                type="submit"
                className="w-1/2 bg-gray-700 hover:bg-gray-500 hover:text-black text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Actualizar Datos
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="w-1/2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Eliminar Concierto
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
