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
import "./User.css";

function User(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formattedColumns, setColumns] = useState([]);

  const token = Cookies.get("jwt");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://surplus-app-api.onrender.com/api/user")
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.response)) {
          const formattedColumns = [
            { accessorKey: "username", header: "userName" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "role", header: "Role" },

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

  return (
    <div className="dash-main">
      <div className="category"></div>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <MaterialReactTable
          columns={formattedColumns}
          data={data}
          enableColumnOrdering
          enablePagination={true}
        />
      )}
    </div>
  );
}

export default User;
