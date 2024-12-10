import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import axios from "axios";
import { MyContext } from "Contextapi/MyContext";

const PharmacyDetails = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const {pharmaciescount , setPharmaciescount} = useState(MyContext)

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.medstown.com/pharmacy/getpharmacy");
      console.log("API Response:", res.data);
      setTableData(res.data.pharmacies || []);
      setPharmaciescount(res.data.PharmacyDetails)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRows = tableData.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    { field: "pharmacyId", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Pharmacy Owner", width: 150 },
    { field: "bussinessName", headerName: "Pharmacy Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "businessPhone", headerName: "Contact", width: 150 },
    { field: "bussinessRegNo", headerName: "Bussiness Reg No.", width: 150 },
    { field: "medicalLicenseNo", headerName: "Medical License No.", width: 150 },
    { field: "gstNo", headerName: "GST No.", width: 150 },
    { field: "dateOfRegistration", headerName: "Date Of Registration", width: 150 },
    { field: "dateOfMedicalLicense", headerName: "Date Of MedicalLicense", width: 150 },

    { field: "pincode", headerName: "Pincode", width: 150 },
    { field: "address", headerName: "Address", width: 500 },

  

    // Add more columns as needed
  ];

  return (
    <div className="m-5 mt-10">
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchTextChange}
        className="mb-4"
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          getRowId={(row) => row._id} // Specify _id as the unique identifier
        />
      </div>
    </div>
  );
};

export default PharmacyDetails;
