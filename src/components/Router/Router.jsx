import {Routes, Route, Link} from "react-router-dom";

import { Register} from "../pages/Register/Register";


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}