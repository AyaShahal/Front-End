import React, { useState, useEffect, useRef } from "react";
import MaterialReactTable from "material-react-table";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Loader from "../Loader/loader";
import "./Admin.css";

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formattedColumns, setColumns] = useState([]);
  const close = () => {
    setOpen(false);
  };
  const token = Cookies.get("jwt");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://surplus-app-api.onrender.com/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.response)) {
          const formattedColumns = [
            {
              accessorKey: "_id",
              header: "ID",
              type: "numeric",
              enableEditing: false,
            },
            { accessorKey: "username", header: "Name" },
            { accessorKey: "email", header: "Email", type: "unique" },
            {
              accessorKey: "createdAt",
              header: "created AT",
              enableEditing: false,
            },
            {
              accessorKey: "updatedAt",
              header: "updated AT",
              enableEditing: false,
            },
          ];

          setColumns(formattedColumns);
          setData(response.data.response);
          setLoading(false);
        } else {
          console.error("Invalid response format");
          setData([]);
        }
      })
      .catch((error) => console.error(error));
      setLoading(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this admin?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      cancelButtonColor: "var(--primary-color)",
      confirmButtonColor: "var(--button)",
      iconColor: "var(--button)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://surplus-app-api.onrender.com/api/admin/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Delete successful",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Delete failed",
              text: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const handleUpdate = (updatedRow) => {
    const { ...updatedValues } = updatedRow.values;

    Swal.fire({
      title: "Are you sure you want to edit this user?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://surplus-app-api.onrender.com/api/admin/${updatedRow.values._id}`,
            {
              ...updatedValues,
              _method: "PUT",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Update successful",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Update failed",
              text: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const AddAdminForm = () => {
    const [admin, setAdmin] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [isDisabled, setIsDisabled] = useState(true);

    const handleFormChange = (event) => {
      console.log(admin);
      const { name, value } = event.target;
      setAdmin((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
      setIsDisabled(
        admin.username === "" && admin.email === "" && admin.password === ""
      );
    }, [admin.username, admin.email, admin.password]);
    //////////////////////////
    console.log(admin.username, admin.email, admin.password);
    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
      axios
        .post(
          "https://surplus-app-api.onrender.com/api/admin/register",
          {
            username: admin.username,
            email: admin.email,
            password: admin.password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setData((prevData) => [...prevData, response.data]);
          setAdmin({
            username: "",
            email: "",
            password: "",
          });
          setOpen(false);
          Swal.fire("Success!", "Admin added successfully.", "success");
        });

      setLoading(false); 
    };

    return (
      <>
        {open && (
          <div className="post-form-popup">
            <div className="post-container">
              <span className="close" onClick={close}>
                &times;
              </span>
              <div className="title">
                <h1>Add Admin</h1>
              </div>
              <form
                className="register-inputs add-admin"
                onSubmit={handleSubmit}
              >
                <div className="input-group">
                  <input
                    className="input"
                    type="text"
                    name="username"
                    required={true}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="username" className="input-label">
                    Username
                  </label>
                </div>
                <div className="input-group">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    required={true}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                </div>

                <div className="input-group">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    required={true}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                </div>
                <div className="post-btn-group">
                  <div className="cancel-button">
                    <button type="button" className="cancel" onClick={close}>
                      Cancel
                    </button>
                  </div>
                  <button
                    className={`cancel ${isDisabled ? "disabled" : ""}`}
                    onClick={handleSubmit}
                    disabled={isDisabled}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };
  const [rowAdmin, setRowAdmin] = useState({});

  useEffect(() => {}, [rowAdmin]);

  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    console.log(tableInstanceRef.current.getState().sorting);
  };
  return (
    <div className="dash-main">
      <div className="category">
        <p>Admin page</p>
        <button
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            fontWeight: "bold",
            padding: "0.5em",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "1em",
          }}
        >
          Add Admin
          <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "0.5em" }} />
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={formattedColumns}
          data={data}
          enableColumnOrdering
          enablePagination={true}
          tableInstanceRef={tableInstanceRef}
          enableRowActions
          renderRowActionMenuItems={({ row }) => {
            const admin = row.original;
            return (
              <div
                key={`delete-${admin.id}`}
                onClick={() => handleDelete(admin._id)}
                style={{
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  paddingTop: "16px",
                  paddingBottom: "6px",
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  size="sm"
                  style={{
                    marginRight: "17px",
                    color: "var(--primary-color)",
                    fontSize: "16px",
                    marginLeft: "4px",
                  }}
                />
                Delete
              </div>
            );
          }}
          editingMode="row"
          enableEditing
          onEditingRowSave={handleUpdate}
        />
      )}
      <AddAdminForm />
    </div>
  );
}

export default Admin;
