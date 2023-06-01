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
import "./Product.css";

function Product() {
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
      .get("https://surplus-app-api.onrender.com/api/Food")
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.products)) {
          const formattedColumns = [
            // {
            //   accessorKey: "_id",
            //   header: "ID",
            //   type: "numeric",
            //   enableEditing: false,
            // },
            { accessorKey: "name", header: "FoodName" },
            { accessorKey: "description", header: "Description" },
            { accessorKey: "quantity", header: "Quantity" },
            { accessorKey: "expirydate", header: "ExpiryDate" },
            { accessorKey: "username", header: "Business Name" },
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
          setData(response.data.products);
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
      <div className="category">
        <p>Product page</p>
      </div>
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

export default Product;
