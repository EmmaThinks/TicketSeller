import { Route, Routes, NavLink } from "react-router-dom";

import AddConcert from "./Utility/addConcert";
import EditConcert from "./Utility/editConcert";

function MainAdmin() {
  const optionClassName = ({ IsActive }: { IsActive: boolean }) =>
    `text-amber-50 h-10 w-[90%] flex items-center justify-center m-2 rounded ${IsActive ? "bg-gray-800" : "bg-gray-700"}`;

  return (
    <>
      <nav className="w-1/2 bg-gray-900 flex flex-col">
        <NavLink to="/AdminDashboard/AddConcert" className={optionClassName}>
          Añadir Concierto
        </NavLink>
        <NavLink to="/AdminDashboard/EditConcert">Editar Existentes</NavLink>
      </nav>

      <Routes>
        <Route
          path="/AdminDashboard/AddConcert"
          element={<AddConcert />}
        ></Route>
        <Route
          path="/AdminDashboard/EditConcert"
          element={<EditConcert />}
        ></Route>
      </Routes>

      <main className="bg-gray-800 grid grid-cols-4 gap-4 min-h-screen min-w-screen"></main>
    </>
  );
}

export default MainAdmin;
