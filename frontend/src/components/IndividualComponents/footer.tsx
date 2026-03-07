function Footer() {
  return (
    <>
      <footer className="w-screen bg-gray-700 text-white mt-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-items-center px-4">
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
            <p>&#128222; 614-999-9999</p>
            <p>&#9993; emma_example@proton.me</p>
          </section>

          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Soporte</h2>
            <a
              href="#"
              className="animate-all duration-300 hover:text-blue-400"
            >
              Atencion al cliente
            </a>
          </section>

          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Ventas</h2>
            <a
              href="#"
              className="animate-all duration-300 hover:text-blue-400"
            >
              Contactar a ventas
            </a>
          </section>
        </div>

        <div className="border-t border-gray-600 mt-8 mb-4 mx-auto w-11/12"></div>

        <div className="text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} TicketSeller. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
