import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://developer24sri.github.io/host_api/db.json/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(id) {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
      axios
        .delete(`https://developer24sri.github.io/host_api/db.json/${id}`)
        .then(() => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
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
                      {data.map((d) => (
                        <tr key={d.id}>
                          <td>{d.name}</td>
                          <td>{d.email}</td>
                          <td>{d.phone}</td>
                          <td>
                            <Link
                              to={`/read/${d.id}`}
                              className="btn btn-sm btn-info me-2"
                            >
                              Read
                            </Link>
                            <Link
                              to={`/update/${d.id}`}
                              className="btn btn-sm btn-primary me-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(d.id)}
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
    </>
  );
}
