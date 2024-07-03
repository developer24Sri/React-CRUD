import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Read() {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://react-crud-ops.netlify.app/users/` + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-ligt">
        <div className="w-50 border bg-white shadow px-5 pt-3 bg-5 rounded">
          <h3>Details of Users:</h3>
          <div className="mb-2">
            <strong>Name: {data.name}</strong>
          </div>
          <div className="mb-2">
            <strong>E-mail: {data.email}</strong>
          </div>
          <div className="mb-2">
            <strong>Phone: {data.phone}</strong>
          </div>
          <Link to={`/update/${id}`} className="btn btn-success">
            Edit
          </Link>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}
