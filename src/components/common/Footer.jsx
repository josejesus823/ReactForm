// Added a compact footer to keep contact and community information available.
export function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
        <div>
          <div className="fw-bold">Vista Verde Residential</div>
          <small className="text-white-50">A simpler way to enjoy shared spaces.</small>
        </div>
        <small className="text-white-50 align-self-md-end">Resident support: support@vistaverde.test</small>
      </div>
    </footer>
  );
}