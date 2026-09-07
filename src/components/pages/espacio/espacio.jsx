import { useState } from "react";

const initialData = {
  id: "",
  nombre_zona: "",
  aforo: "",
  descripcion: "",
  foto: "",
};

export function Espacio() {
  const [data, setData] = useState(initialData);

  const [errors, setErrors] = useState({});

  function validateField(field, value) {
    switch (field) {
      case "id":
        if (!value.trim()) return "ID is required.";
        return "";

      case "nombre_zona":
        if (!value) return "Please select a game room.";
        return "";

      case "aforo":
        if (value === "") return "Capacity is required.";
        if (!Number.isInteger(Number(value)) || Number(value) < 1) {
          return "Capacity must be a whole number greater than 0.";
        }
        return "";

      case "descripcion":
        if (!value.trim()) return "Description is required.";
        return "";

      case "foto":
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
  }

  function manageChanges(e) {
    e.preventDefault();

    const nextErrors = validateForm(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log("Game room form is valid", {
        ...data,
        aforo: Number(data.aforo),
      });
    }
  }

  return (
    <section className="container">
      <section className="row justify-content-center">
        <section className="col-6">
          <h1>Space Reservation</h1>
          <hr />
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

            <label htmlFor="nombre_zona" className="form-label">
              Zone Name
            </label>
            <select
              className={getFieldClass("nombre_zona", "form-select mb-3")}
              id="nombre_zona"
              name="nombre_zona"
              value={data.nombre_zona}
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
            {errors.nombre_zona && (
              <small className="text-danger d-block mb-3">{errors.nombre_zona}</small>
            )}

            <label htmlFor="aforo" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              min="1"
              className={getFieldClass("aforo", "form-control mb-3")}
              placeholder="20"
              id="aforo"
              name="aforo"
              value={data.aforo}
              onChange={changeHandler}
            />
            {errors.aforo && <small className="text-danger d-block mb-3">{errors.aforo}</small>}

            <label htmlFor="descripcion" className="form-label">
              Description
            </label>
            <textarea
              className={getFieldClass("descripcion", "form-control mb-3")}
              placeholder="Describe the game room"
              id="descripcion"
              name="descripcion"
              rows="4"
              value={data.descripcion}
              onChange={changeHandler}
            />
            {errors.descripcion && (
              <small className="text-danger d-block mb-3">{errors.descripcion}</small>
            )}

            <label htmlFor="foto" className="form-label">
              Photo URL
            </label>
            <input
              type="text"
              className={getFieldClass("foto", "form-control mb-3")}
              placeholder="https://example.com/photo.jpg"
              id="foto"
              name="foto"
              value={data.foto}
              onChange={changeHandler}
            />
            {errors.foto && <small className="text-danger d-block mb-3">{errors.foto}</small>}

            <button type="submit" className="btn btn-primary w-100">
              Save changes
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}