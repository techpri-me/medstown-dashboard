import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tableColumns, tableData } from "./variables";
import { TextField } from "@mui/material";

const DeliveryPayoutReq = () => {
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
          disableColumnSelector
          disableColumnFilter
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
          // filterModel={filterModel}
          // onFilterModelChange={handleFilterChange}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default DeliveryPayoutReq;
