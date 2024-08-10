<<<<<<< main
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { tableColumns, tableData } from "./variables";
import { TextField } from "@mui/material";

const DeliveryPartnerDetails = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

=======
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import axios from "axios";

const DelivaryDetails = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.medstown.com/delivery/getalldeliveryboy");
      console.log("API Response:", res.data);
      setTableData(res.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

>>>>>>> local
  const filteredRows = tableData.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
<<<<<<< main
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
=======

  const renderDocumentCell = (doc) => {
    return doc ? (
      <img
        src={doc}
        alt="Document"
        style={{ width: 50, height: 50, marginRight: 5 }}
      />
    ) : (
      <span>N/A</span>
    );
  };

  const columns = [
    { field: "partnerId", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "Name", width: 250 },
    { field: "phone", headerName: "Contact", width: 150 },
    { field: "vehicleNumber", headerName: "Vehicle Number", width: 150 },
    { field: "drivingLicense", headerName: "Driving License No.", width: 150 },
    {
      field: "BankDetails?.bankName",
      headerName: "Bank Name",
      width: 150,
    },
    {
      field: "BankDetails?.accountNumber",
      headerName: "Bank A/C",
      width: 150,
    },
    {
      field: "BankDetails?.ifscCode",
      headerName: "IFSC Code",
      width: 150,
    },
    {
      field: "BankDetails?.branchName",
      headerName: "Branch Name",
      width: 150,
    },
    {
      field: "BankDetails?.accountHolderName",
      headerName: "Bank Account",
      width: 150,
    },
    { field: "totalBalance", headerName: "Total Balance", width: 150 },
    {
      field: "documnetUploaded",
      headerName: "Documents",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {params.value.map((doc, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              {renderDocumentCell(doc.userImage)}
              {renderDocumentCell(doc.penCard)}
              {renderDocumentCell(doc.adharFront)}
              {renderDocumentCell(doc.adharBack)}
              {renderDocumentCell(doc.rcFront)}
              {renderDocumentCell(doc.rcBack)}
              {renderDocumentCell(doc.drivingLicenseFront)}
              {renderDocumentCell(doc.drivingLicenseBack)}
            </div>
          ))}
        </div>
      ),
    },
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
>>>>>>> local
        />
      </div>
    </div>
  );
};

<<<<<<< main
export default DeliveryPartnerDetails;
=======
export default DelivaryDetails;
>>>>>>> local
