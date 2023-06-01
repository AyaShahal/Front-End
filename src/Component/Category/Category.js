import React, { useState, useEffect, useRef } from "react";
import MaterialReactTable from "material-react-table";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Loader/loader";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

import "./Category.css";
function Category() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
      .get("https://surplus-app-api.onrender.com/api/category", {
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
            { accessorKey: "name", header: "CategoryName" },
            { accessorKey: "adminUsername", header: " AdminUserName" },
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
      title: "Are you sure you want to delete this Category?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      cancelButtonColor: "var(--primary-color)",
      confirmButtonColor: "var(--button)",
      iconColor: "var(--button)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://surplus-app-api.onrender.com/api/category/${id}`, {
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
            `https://surplus-app-api.onrender.com/api/category/${updatedRow.values._id}`,
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
      name: "",
    });
    const [isDisabled, setIsDisabled] = useState(true);

    const handleFormChange = (event) => {
      console.log(admin);
      const { name, value } = event.target;
      setAdmin((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
      setIsDisabled(admin.name === "");
    }, [admin.name]);
    //////////////////////////
    console.log(admin.name);
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .post(
          "https://surplus-app-api.onrender.com/api/category",
          {
            name: admin.name,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setData([...data, response.data]);
          setAdmin({
            name: "",
          });
          setOpen(false);
          Swal.fire("Success!", "Category added successfully.", "success");
        });
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
                <h1>Add Category</h1>
              </div>
              <form
                className="register-inputs add-admin"
                onSubmit={handleSubmit}
              >
                <div className="input-group">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    required={true}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="username" className="input-label">
                    CategoryName
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
        <p>Category page</p>
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
          Add Category
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
            return [
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
              </div>,
            ];
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

export default Category;
