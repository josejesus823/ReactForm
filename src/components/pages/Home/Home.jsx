import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  function navigateToRegister() {
    navigate("/register");
  }

  return (
    <>
      {/* Reworked the home hero to introduce the residential community and its booking flow. */}
      <section className="container py-5 py-lg-6">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 order-lg-2">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
              alt="Modern residential complex with shared outdoor spaces"
              className="img-fluid rounded-4 shadow w-100"
              style={{ height: "480px", objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
              Your community, in one place
            </span>
            <h1 className="display-4 fw-bold text-dark mb-3">
              Make more of the spaces you share.
            </h1>
            <p className="lead text-secondary mb-4">
              Vista Verde makes it simple for residents to discover amenities,
              check availability and reserve a space for their next gathering.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <button className="btn btn-primary btn-lg px-4" onClick={() => navigate("/reservations")}>
                Reserve a space
              </button>
              <button className="btn btn-outline-dark btn-lg px-4" onClick={() => navigate("/spaces")}>
                Explore spaces
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Added a scannable overview of the amenities already supported by the project. */}
      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
          <div>
            <p className="text-uppercase text-primary fw-semibold small mb-2">Community amenities</p>
            <h2 className="h2 mb-0">Everything residents need for a good day.</h2>
          </div>
          <p className="text-secondary mb-0">Clear availability. Simple booking. Less back-and-forth.</p>
        </div>
        <div className="row g-3">
          {[
            ["Pool", "Cool off and plan your time by the water."],
            ["Gym", "Keep your routine close to home."],
            ["Event hall", "A ready setting for meetings and celebrations."],
            ["BBQ zone", "Share an easy meal with neighbors and friends."],
          ].map(([title, description]) => (
            <div className="col-sm-6 col-lg-3" key={title}>
              <article className="bg-white border rounded-3 p-4 h-100 shadow-sm">
                <h3 className="h5 fw-bold">{title}</h3>
                <p className="text-secondary small mb-0">{description}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* Added a concise resident call to action for visitors without an account. */}
      <section className="container pb-5">
        <div className="bg-primary text-white rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 className="h3 mb-2">New to Vista Verde?</h2>
            <p className="mb-0 text-white-50">Create your resident profile and start planning your next reservation.</p>
          </div>
          <button className="btn btn-light px-4" onClick={navigateToRegister}>Create profile</button>
        </div>
      </section>
    </>
  );
}
