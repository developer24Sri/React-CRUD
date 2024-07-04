import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-storage-vat.vercel.app/users/${id}`
        );
        setValues(response.data); // Assuming response.data directly represents the user object
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, [id]); // Include 'id' in the dependency array to fetch data when 'id' changes

  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put(`https://api-storage-vat.vercel.app/users/${id}`, values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate("/");
      });
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={values.name}
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              className="form-control"
              placeholder="Enter E-mail"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              className="form-control"
              placeholder="Enter phone"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
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
  );
}
