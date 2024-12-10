


import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField,  Typography, Button, TextField as MUITextField } from "@mui/material";
import axios from "axios";

const ReferPharmacy
 = () => {
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    
  
    const handleSearchTextChange = (event) => {
      setSearchText(event.target.value);
    };
  
    const fetchreferPharmacy = async () => {
      try {
        const res = await axios.get("https://api.medstown.com/customer/getreferPharmacy");
        console.log(res.data)
        setData(res?.data.reverse() || []);
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      }
    };
  
    useEffect(() => {
        fetchreferPharmacy();
    }, []);
  
    const filteredRows = data.filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  
    const tableColumns = [
        { field: "customerId", headerName: "User Id", width: 170 },
        { field: "customerName", headerName: "User Name", width: 170 },
        { field: "pharmacyName", headerName: "Pharmacy Name", width: 200 },
        { field: "pharmacyownername", headerName: "Pharmacy Owner Name", width: 200 },
        { field: "PharmacyMobileNumber", headerName: "Pharmacy Mobile Number", width: 200 },
        { field: "PharmacyLocation", headerName: "Pharmacy Location", width: 200 },
      
        // Combine date and time in one column
        { 
          field: "timedate", 
          headerName: "Created Date & Time", 
          width: 220, 
          valueGetter: (params) => {
            const date = new Date(params.row.timedate);
            return `${date.toLocaleDateString()}   |  ${date.toLocaleTimeString()}`;
          }
        }
      ];
   
  
    
    return (
      <div style={{ padding: "20px" }}>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ marginBottom: "20px" }}
        />
        <div style={{ height: "700px" }}>
          <DataGrid
            rows={filteredRows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{ width: "100%" }}
            getRowId={(row) => row._id}
          />
        </div>
       
      </div>
    );
  };
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  export default ReferPharmacy
;
  