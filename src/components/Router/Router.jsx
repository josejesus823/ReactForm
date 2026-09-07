import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
// Updated the page import to use the English Spaces path and component name.
import { Spaces } from "../pages/Spaces/Spaces";
import { Reservations } from "../pages/Reservations/Reservations";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";

export function Router() {
  return (
    <div className="d-flex min-vh-100 flex-column bg-light">
      {/* Added the shared navigation so every page exposes the main routes. */}
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </main>
      {/* Added a shared footer with resident support and page identity. */}
      <Footer />
    </div>
  );
}