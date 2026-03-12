import { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";

import Home from "./components/home";
import MainAdmin from "./components/AdminDashboard/main";
import MainUser from "./components/User/main";
import Concerts from "./components/Concerts";
import AddConcert from "./components/AdminDashboard/Utility/addConcert";
import EditConcert from "./components/AdminDashboard/Utility/editConcert";
import ConcertDetails from "./components/concerts/ConcertDetails";
import SignIn from "./components/User/signIn";
import LogIn from "./components/User/logIn";
import AdminSummary from "./components/AdminDashboard/Utility/adminSummary";

interface UserSession {
  id: string;
  nombre: string;
  rol: "ADMIN" | "CLIENTE";
}

function App() {
  const [user, setUser] = useState<UserSession | null>(() => {
    const loggedUser = localStorage.getItem("user");
    return loggedUser ? JSON.parse(loggedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const defaultClassNLink = ({ isActive }: { isActive: boolean }) =>
    `text-center transition-all duration-300 ml-1 mr-1 flex items-center justify-center h-[70%] px-4 rounded ${
      isActive ? "bg-gray-700 text-white" : "hover:bg-gray-300"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 font-bold w-full h-14 bg-nav_steel_gray text-black flex flex-row items-center select-none px-4 shadow-md">
        <div className="flex h-full items-center">
          <NavLink to="/" className={defaultClassNLink}>
            PRINCIPAL
          </NavLink>
          <NavLink to="/Concerts" className={defaultClassNLink}>
            CONCIERTOS
          </NavLink>

          {user?.rol === "CLIENTE" && (
            <NavLink to="/UserDashboard" className={defaultClassNLink}>
              USUARIO
            </NavLink>
          )}
          {user?.rol === "ADMIN" && (
            <NavLink to="/AdminDashboard" className={defaultClassNLink}>
              ADMIN
            </NavLink>
          )}
        </div>

        <div className="ml-auto flex h-full items-center gap-3">
          {!user ? (
            <>
              <NavLink
                to="/LogIn"
                className="px-4 py-1.5 rounded bg-white text-black font-bold hover:bg-gray-200 transition-colors"
              >
                Iniciar Sesión
              </NavLink>
              <NavLink
                to="/SignIn"
                className="px-4 py-1.5 rounded bg-black text-white font-bold hover:bg-gray-800 transition-colors"
              >
                Registrarse
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-800">
                Hola, {user.nombre}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded bg-red-600 text-white font-bold hover:bg-red-500 transition-colors"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Concerts" element={<Concerts />} />
        <Route path="/Concerts/:id" element={<ConcertDetails />} />

        <Route path="/AdminDashboard" element={<MainAdmin />}>
          <Route path="AddConcert" element={<AddConcert />} />
          <Route path="EditConcert" element={<EditConcert />} />
        </Route>

        <Route path="/UserDashboard" element={<MainUser />} />

        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/AdminDashboard" element={<MainAdmin />}>
          <Route index element={<AdminSummary />} />
          <Route path="AddConcert" element={<AddConcert />} />
          <Route path="EditConcert" element={<EditConcert />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
