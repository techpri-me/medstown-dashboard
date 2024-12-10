import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { TextField } from "@mui/material";

const tableColumns = [
  {
    field: "delivery_name",
    headerName: "Delivery Partner Name",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "balance",
    headerName: "Balance",
    width: 100,
  },
  {
    field: "creditHistory",
    headerName: "Credit History",
    width: 250,
    renderCell: (params) => {
      const creditHistory = params.value || []; // Default to empty array if undefined
      return (
        <ul>
          {creditHistory.map((history) => (
            <li key={history._id}>
              +₹{history.amount} on {new Date(history.date).toLocaleDateString()} ({history.status})
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    field: "debitHistory",
    headerName: "Debit History",
    width: 250,
    renderCell: (params) => {
      const debitHistory = params.value || []; // Default to empty array if undefined
      return (
        <ul>
          {debitHistory.map((history) => (
            <li key={history._id}>
              -₹{history.amount} on {new Date(history.date).toLocaleDateString()} ({history.status})
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    field: "debitTotal",
    headerName: "Debit Total",
    width: 150,
    renderCell: (params) => `₹${params.value}`, // Display total debit amount with currency symbol
  },
  {
    field: "Action",
    headerName: "Action",
    width: 200,
    renderCell: () => (
      <div className="m flex items-center">
        <button className="m-2 rounded-sm bg-green-400 p-2 font-normal text-white">
          Accept
        </button>
        <button className="m-2 rounded-sm bg-red-400 p-2 font-normal text-white">
          Hold
        </button>
      </div>
    ),
  },
];

const DeliveryPayoutReq = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.medstown.com/delivery/getreq/amount");
      console.log(res.data); // Log the response data for debugging
      // Ensure each item has separate fields for credit and debit history
      const formattedData = res.data.map(item => {
        const debitHistory = (item.walletHistory || []).filter(history => history.status === "debit");
        const debitTotal = debitHistory.reduce((total, history) => total + history.amount, 0);
        return {
          ...item,
          creditHistory: (item.walletHistory || []).filter(history => history.status === "credit"),
          debitHistory,
          debitTotal, // Add total debit amount to data
        };
      });
      setTableData(formattedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = tableData.filter((row) =>
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
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          sx={{ width: "100%" }}
          getRowId={(row) => row._id || row.phone || row.delivery_name || Math.random()} // Ensure unique IDs
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default DeliveryPayoutReq;
