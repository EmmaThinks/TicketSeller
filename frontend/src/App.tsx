import { Route, Routes, NavLink } from "react-router-dom";

import Home from "./components/home";
import MainAdmin from "./components/AdminDashboard/main";
import Concerts from "./components/Concerts";

function App() {
  const defaultClassNLink = ({ isActive }: { isActive: boolean }) =>
    `text-center transition-all duration-300 ${isActive ? "w-40 text-2xl" : "w-30"}`;

  return (
    <>
      <nav className="w-full h-10 bg-black text-white flex flex-row items-center select-none">
        <a className="ml-10">/</a>
        <NavLink to="/" className={defaultClassNLink}>
          {" "}
          Home{" "}
        </NavLink>
        <h1>/</h1>
        <NavLink to="/AdminDashboard" className={defaultClassNLink}>
          {" "}
          Admin{" "}
        </NavLink>
        <h1>/</h1>
        <NavLink to="/Concerts" className={defaultClassNLink}>
          {" "}
          Conciertos{" "}
        </NavLink>
        <h1>/</h1>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashboard" element={<MainAdmin />} />
        <Route path="/Concerts" element={<Concerts />} />
      </Routes>
    </>
  );
}

export default App;
