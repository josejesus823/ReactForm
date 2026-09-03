import { useState } from "react";

export function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  function validateField(field, value) {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must contain at least 2 characters.";
        return "";

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email.";
        return "";

      case "password":
        if (!value.trim()) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        return "";

      case "role":
        if (!value) return "Please select a role.";
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

  function changeHandler(e) {
    const { name, value } = e.target;

    const nextData = {
      ...data,
      [name]: value,
    };

    setData(nextData);

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  }

  function manageChanges(e) {
    e.preventDefault();

    const nextErrors = validateForm(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log("Form is valid, submit the data", data);
    }
  }

  return (
    <>
      <section className="container">
        <section className="row justify-content-center">
          <section className="col-6">
            <h1>Register Form</h1>
            <hr />
            <form className="border rounded p-5 shadow" onSubmit={manageChanges}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Jose Jesus Vargas"
                id="name"
                name="name"
                value={data.name}
                onChange={changeHandler}
              />
              {errors.name && <small className="text-danger d-block mb-3">{errors.name}</small>}

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Jose1030vargas@gmail.com"
                id="email"
                name="email"
                value={data.email}
                onChange={changeHandler}
              />
              {errors.email && <small className="text-danger d-block mb-3">{errors.email}</small>}

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                id="password"
                name="password"
                value={data.password}
                onChange={changeHandler}
              />
              {errors.password && <small className="text-danger d-block mb-3">{errors.password}</small>}

              <select
                className="form-select mb-3"
                id="role"
                name="role"
                value={data.role}
                onChange={changeHandler}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && <small className="text-danger d-block mb-3">{errors.role}</small>}

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </section>
        </section>
      </section>
    </>
  );
}
