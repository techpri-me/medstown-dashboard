import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const UserDetails = () => {
  const [searchText, setSearchText] = useState("");
  const [usersData, setUsersData] = useState([]); // Initialize with an empty array

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await axios.get('https://api.medstown.com/customer/getallusers');
        console.log("all users details - ", res.data);
        if (Array.isArray(res.data.data)) {
          setUsersData(res.data.data); // Ensure res.data is an array
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.log("Error Occurred! - ", error);
      }
    }

    getAllUsers();
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = usersData.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleButtonClick = (row) => {
    const { latitude, longitude } = row.location.coordinates;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  const tableColumns = [
    { field: "fullName", headerName: "Name", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "otp", headerName: "Login OTP", width: 200 },
   
   
  ];

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
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
          //   onRowClick={(row) => {
          //     handleOpen(row.id);
          //   }}
        />
      </div>
    </div>
  );
};

export default UserDetails;
