import { useParams, useNavigate } from "react-router-dom";

export default function ConcertCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const buttonClassBase =
    "rounded h-full font-semibold transition-all duration-300 flex items-center justify-center w-[45%] hover:w-[80%]";

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-6">
      <section className="bg-nav_steel_gray w-full max-w-xl rounded-2xl flex flex-col drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] overflow-hidden">
        <header className="w-full bg-black text-white p-6 text-center">
          <h1 className="text-2xl font-bold tracking-wide">Comprar Boletos</h1>
          <p className="text-sm text-gray-400 mt-1">Concierto ID: {id}</p>
        </header>

        <form
          className="flex flex-col p-8 gap-6 text-white"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Procesando pago para el concierto:", id);
          }}
        >
          <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
            <label htmlFor="cantidad" className="font-semibold text-lg">
              Cantidad de boletos
            </label>
            <select
              id="cantidad"
              name="cantidad"
              className="bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-white transition-all cursor-pointer"
            >
              <option value="1">1 Boleto</option>
              <option value="2">2 Boletos</option>
              <option value="3">3 Boletos</option>
              <option value="4">4 Boletos</option>
            </select>
          </fieldset>

          <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
            <label htmlFor="zona" className="font-semibold text-lg">
              Zona / Localidad
            </label>
            <select
              id="zona"
              name="zona"
              className="bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-white transition-all cursor-pointer"
            >
              <option value="general">General (De pie)</option>
              <option value="gradas">Gradas</option>
              <option value="vip">VIP</option>
            </select>
          </fieldset>

          <div className="flex flex-row justify-center gap-4 w-full h-12 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`${buttonClassBase} bg-gray-600 text-white hover:bg-gray-500`}
            >
              Volver
            </button>
            <button
              type="submit"
              className={`${buttonClassBase} bg-white text-black hover:bg-gray-200`}
            >
              Pagar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
