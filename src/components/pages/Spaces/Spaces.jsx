import { useState } from "react";

// Renamed the form fields from Spanish to English to match the page API.
const initialData = {
  id: "",
  zoneName: "",
  capacity: "",
  description: "",
  photo: "",
};

// Renamed the exported component to match the English file and route names.
export function Spaces() {
  const [data, setData] = useState(initialData);

  const [errors, setErrors] = useState({});
  // Added success feedback for a valid shared-space submission.
  const [successMessage, setSuccessMessage] = useState("");

  function validateField(field, value) {
    switch (field) {
      case "id":
        if (!value.trim()) return "ID is required.";
        return "";

      case "zoneName":
        if (!value) return "Please select a game room.";
        return "";

      case "capacity":
        if (value === "") return "Capacity is required.";
        if (!Number.isInteger(Number(value)) || Number(value) < 1) {
          return "Capacity must be a whole number greater than 0.";
        }
        return "";

      case "description":
        if (!value.trim()) return "Description is required.";
        return "";

      case "photo":
        if (!value.trim()) return "Photo URL is required.";
        if (!/^https?:\/\/.+/.test(value)) return "Enter a valid photo URL.";
        return "";

      default:
        return "";
    }
  }

  function validateForm(formData) {
    const nextErrors = {};

    Object.keys(formData).forEach((key) => {
      const message = validateField(key, formData[key]);
      if (message) {
        nextErrors[key] = message;
      }
    });

    return nextErrors;
  }

  function getFieldClass(field, className) {
    return `${className} ${errors[field] ? "is-invalid" : ""}`;
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    const nextData = { ...data, [name]: value };

    setData(nextData);
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
    // Clear the previous result when the form is edited again.
    if (successMessage) setSuccessMessage("");
  }

  function manageChanges(e) {
    e.preventDefault();

    const nextErrors = validateForm(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log("Game room form is valid", {
        ...data,
        capacity: Number(data.capacity),
      });
      // Show the same green confirmation pattern used by Reservations.
      setSuccessMessage("Space successfully saved!");
    }
  }

  return (
    <section className="container">
      <section className="row justify-content-center">
        <section className="col-6">
          <h1>Manage shared spaces</h1>
          <hr />
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <form className="border rounded p-5 shadow" onSubmit={manageChanges}>
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              className={getFieldClass("id", "form-control mb-3")}
              id="id"
              name="id"
              value={data.id}
              onChange={changeHandler}
            />
            {errors.id && <small className="text-danger d-block mb-3">{errors.id}</small>}

            <label htmlFor="zoneName" className="form-label">
              Zone Name
            </label>
            <select
              className={getFieldClass("zoneName", "form-select mb-3")}
              id="zoneName"
              name="zoneName"
              value={data.zoneName}
              onChange={changeHandler}
            >
              <option value="">Select a game room</option>
              <option value="Game Room">Game Room</option>
              <option value="BBQ Zone">BBQ Zone</option>
              <option value="Gym">Gym</option>
              <option value="Pool">Pool</option>
              <option value="Event Hall">Event Hall</option>
              <option value="Pet Park">Pet Park</option>
            </select>
            {errors.zoneName && (
              <small className="text-danger d-block mb-3">{errors.zoneName}</small>
            )}

            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              min="1"
              className={getFieldClass("capacity", "form-control mb-3")}
              placeholder="20"
              id="capacity"
              name="capacity"
              value={data.capacity}
              onChange={changeHandler}
            />
            {errors.capacity && <small className="text-danger d-block mb-3">{errors.capacity}</small>}

            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className={getFieldClass("description", "form-control mb-3")}
              placeholder="Describe the game room"
              id="description"
              name="description"
              rows="4"
              value={data.description}
              onChange={changeHandler}
            />
            {errors.description && (
              <small className="text-danger d-block mb-3">{errors.description}</small>
            )}

            <label htmlFor="photo" className="form-label">
              Photo URL
            </label>
            <input
              type="text"
              className={getFieldClass("photo", "form-control mb-3")}
              placeholder="https://example.com/photo.jpg"
              id="photo"
              name="photo"
              value={data.photo}
              onChange={changeHandler}
            />
            {errors.photo && <small className="text-danger d-block mb-3">{errors.photo}</small>}

            <button type="submit" className="btn btn-primary w-100">
              Save changes
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}