import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { tableColumns, tableData } from "./variables";
import { TextField } from "@mui/material";

const WalletDetails = () => {
  const [searchText, setSearchText] = useState("");

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

export default WalletDetails;
