import { useState } from "react";
export function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function changeHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }


  return (
    <>
      <section className="container">
        <section className="row justify-content-center">
          <section className="col-6">
            <h1>Register Form</h1>
            <hr />
            <form className="border rounded p-5 shadow">
              <input
                type="text"
                placeholder="Name"
                className="form-control mb-3"
                placeholder="Jose Jesus Vargas"
                id="name"
                name="name"
                value={data.name}
                onChange={changeHandler}
              />

              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                placeholder="Jose1030vargas@gmail.com"
                id="email"
                name="email"
                value={data.email}
                onChange={changeHandler}
              />

              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                placeholder="Password"
                id="password"
                name="password"
                value={data.password}
                onChange={changeHandler}
              />

              <select className="form-select mb-3">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button className="btn btn-primary w-100">Register</button>
            </form>
          </section>
        </section>
      </section>
    </>
  );
}
