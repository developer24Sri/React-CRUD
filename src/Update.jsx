import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Update() {
  const { id } = useParams();
  const [values, setvalues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://developer24sri.github.io/host_api/db.json/users/` + id)
      .then((res) => {
        setvalues(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put(
        "https://developer24sri.github.io/host_api/db.json/users/" + id,
        values
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Update User</h1>
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                defaultValue={values.name}
                className="form-control"
                placeholder="Enter Name"
                onChange={(e) => setvalues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                name="email"
                defaultValue={values.email}
                className="form-control"
                placeholder="Enter E-mail"
                onChange={(e) =>
                  setvalues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                name="phone"
                defaultValue={values.phone}
                className="form-control"
                placeholder="Enter phone"
                onChange={(e) =>
                  setvalues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <button className="btn btn-success" type="submit">
              Update
            </button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
