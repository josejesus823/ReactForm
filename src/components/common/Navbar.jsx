import { NavLink } from "react-router-dom";

// Added a reusable responsive menu for the residential reservation routes.
export function Navbar() {
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-primary" to="/">
          Vista Verde
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink className={linkClass} to="/" end>Home</NavLink>
            <NavLink className={linkClass} to="/spaces">Spaces</NavLink>
            <NavLink className={linkClass} to="/reservations">Reservations</NavLink>
            <NavLink className="btn btn-primary px-3 ms-lg-2" to="/register">
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}