import { Route, Routes, NavLink } from "react-router-dom";

import Home from "./components/home";
import MainAdmin from "./components/AdminDashboard/main";
import MainUser from "./components/User/main";
import Concerts from "./components/Concerts";
import AddConcert from "./components/AdminDashboard/Utility/addConcert";
import EditConcert from "./components/AdminDashboard//Utility/editConcert";

function App() {
  const defaultClassNLink = ({ isActive }: { isActive: boolean }) =>
    `text-center transition-all duration-300 bg-gray-200 ml-1 mr-1 flex items-center justify-center h-full ${isActive ? "w-40 text-2xl text-blue-400" : "w-30"} `;

  return (
    <>
      <nav className="w-full h-10 bg-white text-black flex flex-row items-center select-none shadow-2xl shadow-black">
        <NavLink to="/" className={defaultClassNLink}>
          {" "}
          PRINCIPAL
        </NavLink>
        <NavLink to="/Concerts" className={defaultClassNLink}>
          {" "}
          CONCIERTOS{" "}
        </NavLink>
        <NavLink to="/User" className={defaultClassNLink}>
          {" "}
          USUARIO{" "}
        </NavLink>
        <NavLink to="/AdminDashboard" className={defaultClassNLink}>
          {" "}
          ADMIN{" "}
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashboard" element={<MainAdmin />}>
          <Route
            path="/AdminDashboard/AddConcert"
            element={<AddConcert />}
          ></Route>
          <Route
            path="/AdminDashboard/EditConcert"
            element={<EditConcert />}
          ></Route>
        </Route>
        <Route path="/Concerts" element={<Concerts />} />
        <Route path="/UserDashboard" element={<MainUser />} />
      </Routes>
    </>
  );
}

export default App;
