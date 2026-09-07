import { useEffect, useState } from "react";

const ZONES = [
  { id: "game-room", name: "Game Room", capacity: 10 },
  { id: "bbq-zone", name: "BBQ Zone", capacity: 20 },
  { id: "gym", name: "Gym", capacity: 15 },
  { id: "pool", name: "Pool", capacity: 30 },
  { id: "event-hall", name: "Event Hall", capacity: 50 },
];

const STORAGE_KEY = "common_area_reservations";

const initialData = {
  name: "",
  unit: "",
  zone: "",
  date: "",
  startTime: "",
  endTime: "",
  guests: "",
  notes: "",
};

function loadReservations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Could not read stored reservations", error);
    return [];
  }
}

function saveReservations(reservations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function Reservations() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [reservations, setReservations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setReservations(loadReservations());
  }, []);

  const selectedZone = ZONES.find((z) => z.id === data.zone);

  function validateField(field, value, currentData) {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 3) return "Name must contain at least 3 characters.";
        return "";

      case "unit":
        if (!value.trim()) return "Apartment / unit is required.";
        return "";

      case "zone":
        if (!value) return "Please select a common area.";
        return "";

      case "date": {
        if (!value) return "Please select a date.";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value + "T00:00:00");
        if (selectedDate < today) return "The date cannot be in the past.";
        return "";
      }

      case "startTime":
        if (!value) return "Please select a start time.";
        return "";

      case "endTime": {
        if (!value) return "Please select an end time.";
        if (currentData.startTime && timeToMinutes(value) <= timeToMinutes(currentData.startTime)) {
          return "End time must be after the start time.";
        }
        return "";
      }

      case "guests": {
        if (!value) return "Please enter the number of guests.";
        const num = Number(value);
        if (!Number.isInteger(num) || num <= 0) return "Enter a valid number of guests.";
        const zone = ZONES.find((z) => z.id === currentData.zone);
        if (zone && num > zone.capacity) {
          return `${zone.name} has a maximum capacity of ${zone.capacity} guests.`;
        }
        return "";
      }

      default:
        return "";
    }
  }

  function hasOverlap(currentData) {
    if (!currentData.zone || !currentData.date || !currentData.startTime || !currentData.endTime) {
      return false;
    }
    const newStart = timeToMinutes(currentData.startTime);
    const newEnd = timeToMinutes(currentData.endTime);

    return reservations.some((r) => {
      if (r.zone !== currentData.zone || r.date !== currentData.date) return false;
      const existingStart = timeToMinutes(r.startTime);
      const existingEnd = timeToMinutes(r.endTime);
      return newStart < existingEnd && newEnd > existingStart;
    });
  }

  function validateForm(formData) {
    const nextErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key === "notes") return;
      const message = validateField(key, formData[key], formData);
      if (message) nextErrors[key] = message;
    });

    if (!nextErrors.startTime && !nextErrors.endTime && hasOverlap(formData)) {
      nextErrors.startTime = "There is already a reservation for this area at that time.";
    }

    return nextErrors;
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    const nextData = { ...data, [name]: value };
    setData(nextData);

    const fieldError = validateField(name, value, nextData);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
    if (successMessage) setSuccessMessage("");
  }

  function manageChanges(e) {
    e.preventDefault();

    const nextErrors = validateForm(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const newReservation = {
      id: Date.now(),
      ...data,
      guests: Number(data.guests),
    };

    const updated = [...reservations, newReservation];
    setReservations(updated);
    saveReservations(updated);

    setData(initialData);
    setErrors({});
    setSuccessMessage("Reservation successfully created!");
  }

  function cancelReservation(id) {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    saveReservations(updated);
  }

  function zoneName(id) {
    return ZONES.find((z) => z.id === id)?.name ?? id;
  }

  return (
    <section className="container py-5">
      <section className="row justify-content-center">
        <section className="col-lg-8">
          <h1>Common Area Reservations</h1>
          <hr />

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <form className="border rounded p-4 p-md-5 shadow mb-5" onSubmit={manageChanges} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Full name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  placeholder="Jose Jesus Vargas"
                  value={data.name}
                  onChange={changeHandler}
                />
                {errors.name && <small className="text-danger d-block mt-1">{errors.name}</small>}
              </div>

              <div className="col-md-6">
                <label htmlFor="unit" className="form-label">Apartment / unit</label>
                <input
                  type="text"
                  className={`form-control ${errors.unit ? "is-invalid" : ""}`}
                  id="unit"
                  name="unit"
                  placeholder="502B"
                  value={data.unit}
                  onChange={changeHandler}
                />
                {errors.unit && <small className="text-danger d-block mt-1">{errors.unit}</small>}
              </div>

              <div className="col-md-6">
                <label htmlFor="zone" className="form-label">Common area</label>
                <select
                  className={`form-select ${errors.zone ? "is-invalid" : ""}`}
                  id="zone"
                  name="zone"
                  value={data.zone}
                  onChange={changeHandler}
                >
                  <option value="">Select an area</option>
                  {ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name} (max. {z.capacity} guests)
                    </option>
                  ))}
                </select>
                {errors.zone && <small className="text-danger d-block mt-1">{errors.zone}</small>}
              </div>

              <div className="col-md-6">
                <label htmlFor="guests" className="form-label">Number of guests</label>
                <input
                  type="number"
                  min="1"
                  className={`form-control ${errors.guests ? "is-invalid" : ""}`}
                  id="guests"
                  name="guests"
                  value={data.guests}
                  onChange={changeHandler}
                />
                {errors.guests && <small className="text-danger d-block mt-1">{errors.guests}</small>}
              </div>

              <div className="col-md-4">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  id="date"
                  name="date"
                  value={data.date}
                  onChange={changeHandler}
                />
                {errors.date && <small className="text-danger d-block mt-1">{errors.date}</small>}
              </div>

              <div className="col-md-4">
                <label htmlFor="startTime" className="form-label">Start time</label>
                <input
                  type="time"
                  className={`form-control ${errors.startTime ? "is-invalid" : ""}`}
                  id="startTime"
                  name="startTime"
                  value={data.startTime}
                  onChange={changeHandler}
                />
                {errors.startTime && <small className="text-danger d-block mt-1">{errors.startTime}</small>}
              </div>

              <div className="col-md-4">
                <label htmlFor="endTime" className="form-label">End time</label>
                <input
                  type="time"
                  className={`form-control ${errors.endTime ? "is-invalid" : ""}`}
                  id="endTime"
                  name="endTime"
                  value={data.endTime}
                  onChange={changeHandler}
                />
                {errors.endTime && <small className="text-danger d-block mt-1">{errors.endTime}</small>}
              </div>

              <div className="col-12">
                <label htmlFor="notes" className="form-label">Notes (optional)</label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  rows="2"
                  value={data.notes}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4">
              Book now
            </button>
          </form>

          <h2 className="h4 mb-3">Registered reservations</h2>
          {reservations.length === 0 ? (
            <p className="text-secondary">No reservations yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Unit</th>
                    <th>Area</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {reservations
                    .slice()
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((r) => (
                      <tr key={r.id}>
                        <td>{r.name}</td>
                        <td>{r.unit}</td>
                        <td>{zoneName(r.zone)}</td>
                        <td>{r.date}</td>
                        <td>{r.startTime} - {r.endTime}</td>
                        <td>{r.guests}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => cancelReservation(r.id)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </section>
  );
}