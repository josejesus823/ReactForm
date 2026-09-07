import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
   import { Reservations } from "../pages/Reservations/Reservations";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
         <Route path="/reservations" element={<Reservations />} />
    </Routes>
  );
}