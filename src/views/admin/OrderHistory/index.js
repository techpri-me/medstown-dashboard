import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import MyLocation from "Contextapi/MyLocation";
import TextField from "@mui/material/TextField";

const OrderHistory = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllDeliveryPartners();
  }, []);

  const getAllDeliveryPartners = async () => {
    try {
      const res = await axios.get("https://api.medstown.com/customer/getorders");
      const orders = res.data.reverse().map(order => {
        const {
          orderDetails: [details],
          ...rest
        } = order;
        return {
          ...rest,
          ...details,
          createdAt: new Date(order.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        };
      });
      setData(orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchTextChange}
        />

        <DataGrid
          rows={filteredRows}
          columns={[
            { field: "orderId", headerName: "Order Id", minWidth: 150 },
            {
              field: "userLat",
              headerName: "User Location",
              width: 400,
              renderCell: (params) => (
                <MyLocation
                  latitude={params.row.userLat}
                  longitude={params.row.userLng}
                />
              ),
            },
            {
              field: "pharmacyLat",
              headerName: "Pharmacy Location",
              width: 400,
              renderCell: (params) => (
                params.row.pharmacyLat && params.row.pharmacyLng ? (
                  <MyLocation
                    latitude={params.row.pharmacyLat}
                    longitude={params.row.pharmacyLng}
                  />
                ) : "N/A"
              ),
            },
            { field: "status", headerName: "Status", minWidth: 170 },
            { field: "totalPrice", headerName: "Total Price", minWidth: 170 },
            { field: "createdAt", headerName: "Date", minWidth: 250 },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row.orderId} // Ensure 'orderId' is unique
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
