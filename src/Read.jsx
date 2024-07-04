import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-storage-vat.vercel.app/users/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, [id]); // Include 'id' in the dependency array to fetch data when 'id' changes

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 rounded">
        <h3>Details of User:</h3>
        <div className="mb-2">
          <strong>Name:</strong> {data.name}
        </div>
        <div className="mb-2">
          <strong>E-mail:</strong> {data.email}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {data.phone}
        </div>
        <Link to={`/update/${id}`} className="btn btn-success">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary ms-3">
          Back
        </Link>
      </div>
    </div>
  );
}
