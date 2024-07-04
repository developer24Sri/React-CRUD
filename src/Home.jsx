import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api-storage-vat.vercel.app/users"
      );
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://api-storage-vat.vercel.app/users/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Optional: Replace with a loading spinner or animation
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-10">
          <h1 className="text-center mb-4">List of Users</h1>
          <div className="card shadow">
            <div className="card-header d-flex justify-content-end">
              <Link to="/create" className="btn btn-success">
                Add +
              </Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-info">
                    <tr>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <Link
                            to={`/read/${user.id}`}
                            className="btn btn-sm btn-info me-2"
                          >
                            Read
                          </Link>
                          <Link
                            to={`/update/${user.id}`}
                            className="btn btn-sm btn-primary me-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
