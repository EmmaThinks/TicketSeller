import { NavLink, Outlet } from "react-router-dom";

function MainAdmin() {
  const optionClassName = ({ isActive }: { isActive: boolean }) =>
    `text-black h-10 w-[90%] flex items-center justify-center m-2 rounded transition-all duration-300 ${isActive ? "bg-gray-700 text-white" : ""}`;

  return (
    <>
      <main className="bg-white grid grid-cols-4 gap-4 min-h-screen min-w-screen">
        <nav className="w-1/2 bg-nav_steel_gray flex flex-col select-none">
          <NavLink to="" className={optionClassName}>
            Perfil
          </NavLink>
          <NavLink to="AddConcert" className={optionClassName}>
            Añadir Concierto
          </NavLink>
          <NavLink to="EditConcert" className={optionClassName}>
            Editar Existentes
          </NavLink>
        </nav>

        <Outlet></Outlet>
      </main>
    </>
  );
}

export default MainAdmin;
