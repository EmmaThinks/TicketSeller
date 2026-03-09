import { Route, Routes, NavLink } from "react-router-dom";

import Home from "./components/home";
import MainAdmin from "./components/AdminDashboard/main";
import MainUser from "./components/User/main";
import Concerts from "./components/Concerts";
import AddConcert from "./components/AdminDashboard/Utility/addConcert";
import EditConcert from "./components/AdminDashboard/Utility/editConcert";
import ConcertDetails from "./components/concerts/ConcertDetails";
import ConcertCheckout from "./components/concerts/ConcertCheckout";

function App() {
  const defaultClassNLink = ({ isActive }: { isActive: boolean }) =>
    `text-center transition-all duration-300 ml-1 mr-1 flex items-center justify-center h-[70%] w-30 rounded ${
      isActive ? "bg-gray-700 text-white" : ""
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 font-bold w-full h-13 bg-nav_steel_gray text-black flex flex-row items-center select-none">
        <NavLink to="/" className={defaultClassNLink}>
          PRINCIPAL
        </NavLink>
        <NavLink to="/Concerts" className={defaultClassNLink}>
          CONCIERTOS
        </NavLink>
        <NavLink to="/UserDashboard" className={defaultClassNLink}>
          USUARIO
        </NavLink>
        <NavLink to="/AdminDashboard" className={defaultClassNLink}>
          ADMIN
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Concerts" element={<Concerts />} />

        <Route path="/Concerts/:id" element={<ConcertDetails />} />
        <Route path="/Concerts/:id/comprar" element={<ConcertCheckout />} />

        <Route path="/AdminDashboard" element={<MainAdmin />}>
          <Route path="AddConcert" element={<AddConcert />} />
          <Route path="EditConcert" element={<EditConcert />} />
        </Route>

        <Route path="/UserDashboard" element={<MainUser />} />

        <Route path="/LogIn" element={<div>Login Page</div>} />
        <Route path="/SignIn" element={<div>Sign In Page</div>} />
      </Routes>
    </>
  );
}

export default App;
