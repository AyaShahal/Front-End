import React, { useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import Loader from "../Loader/loader";

function Messages() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formattedColumns, setColumns] = useState([]);
  const close = () => {
    setOpen(false);
  };
  const token = Cookies.get('jwt');

  const fetchData = () => {
    axios
      .get("https://surplus-app-api.onrender.com/api/Contact")
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
            { accessorKey: "FirstName", header: "First Name" },
            { accessorKey: "LastName", header: "Last Name"},
            { accessorKey: "email", header: "Email" },
            { accessorKey: "message", header: "Message" },
            {
              accessorKey: "createdAt",
              header: "Created At",
              enableEditing: false,
            },
            {
              accessorKey: "updatedAt",
              header: "Updated At",
              enableEditing: false,
            },
          ];

          setColumns(formattedColumns);
          setData(response.data.response);
        } else {
          console.error("Invalid response format");
          setData([]);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this message?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      cancelButtonColor: "var(--primary-color)",
      confirmButtonColor: "var(--button)",
      iconColor: "var(--button)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://surplus-app-api.onrender.com/api/Contact/${id}`, {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="dash-main">
        <div className="category">
        
         
        </div>
        <MaterialReactTable
          columns={formattedColumns}
          data={data}
          enableColumnOrdering
          enablePagination={true}
          enableRowActions
          renderRowActionMenuItems={({ row }) => {
            const message = row.original;
            return (
              <div
                key={`delete-${message.id}`}
                onClick={() => handleDelete(message._id)}
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
        />
      </div>
    )
  );
}

export default Messages;
