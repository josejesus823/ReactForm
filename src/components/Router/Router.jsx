import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Espacio } from "../pages/espacio/espacio";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/espacio" element={<Espacio />} />
    </Routes>
  );
}