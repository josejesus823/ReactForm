import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  function navigateToRegister() {
    navigate("/register");
  }

  return (
    <section className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
              alt="Residential unit with pool, gym and common areas"
              className="img-fluid w-100"
              style={{ height: "480px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="p-3">
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
              Space management
            </span>
            <h1 className="display-5 fw-bold text-dark mb-3">
              Smart residential unit
            </h1>
            <p className="lead text-secondary mb-4">
              Manage and supervise the common areas of the property with
              organization, control and a better experience for residents.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="border rounded-4 p-3 h-100 bg-light">
                  <h6 className="fw-bold mb-1">Pool</h6>
                  <small className="text-secondary">Schedules and availability</small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="border rounded-4 p-3 h-100 bg-light">
                  <h6 className="fw-bold mb-1">Gym</h6>
                  <small className="text-secondary">Usage control and reservations</small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="border rounded-4 p-3 h-100 bg-light">
                  <h6 className="fw-bold mb-1">Hall</h6>
                  <small className="text-secondary">Events and meetings</small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="border rounded-4 p-3 h-100 bg-light">
                  <h6 className="fw-bold mb-1">Common areas</h6>
                  <small className="text-secondary">Maintenance and security</small>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 flex-wrap">
              <button className="btn btn-outline-primary btn-lg px-4 rounded-pill">
                Sign in
              </button>
              <button className="btn btn-primary btn-lg px-4 rounded-pill" onClick={navigateToRegister}>
                Register me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
