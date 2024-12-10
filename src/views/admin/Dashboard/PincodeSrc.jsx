import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  IconButton,
  Tooltip,
  Modal,
  Box,
  Typography,
  Button,
  TextField as MUITextField,
  Stack,
} from "@mui/material";
import {
  AddCircle as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";

const PincodeSrc = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newPincode, setNewPincode] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newUserId, setNewUserId] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchPincodes = async () => {
    try {
      const res = await axios.get(
        "https://api.medstown.com/customer/getpincode"
      );
      setData(res?.data.reverse() || []);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPincodes();
  }, []);

  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const tableColumns = [
    // { field: "userId", headerName: "User Id", width: 350 },
    { field: "fullName", headerName: "Full Name", width: 170 },
    { field: "phone", headerName: "Phone Number", width: 170 },
    { field: "areaPincode", headerName: "Active Pin-code", width: 170 },
    { field: "newUserPincode", headerName: "Request Pin-Code", width: 170 },
    {
      field: "createdAt",
      headerName: "Date   &  Time",
      width: 170,
      valueGetter: (params) => {
        const date = new Date(params.row.createdAt);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Tooltip title="Delete Pincode">
            <IconButton onClick={() => handleDeletePincode(params.row)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleAddPincode = async () => {
    try {
      await axios.post("https://api.medstown.com/customer/addpincode", {
        areaPincode: newPincode,
        fullName: newFullName,
        phone: newPhone,
        userId: newUserId,
      });
      setNewPincode("");
      setNewFullName("");
      setNewPhone("");
      setNewUserId("");
      setOpenModal(false);

      fetchPincodes(); // Refresh the pincode list
    } catch (error) {
      setError("Failed to add pincode");
      console.error(error);
    }
  };

  // const handleDeletePincode = async (row) => {
  //   console.log(row)
  //   try {
  //     await axios.delete("https://api.medstown.com/customer/delete/pincode", {
  //       data: { areaPincode: row.areaPincode  || row.newUserPincode},
  //     });
  //     console.log("ddddddddddddddd")
  //     fetchPincodes(); // Refresh the pincode list
  //   } catch (error) {
  //     setError("Failed to delete pincode");
  //     console.error(error);
  //   }
  // };
  const handleDeletePincode = async (row) => {
    try {
      await axios.delete("https://api.medstown.com/customer/delete/pincode", {
        params: { areaPincode: row.areaPincode || row.newUserPincode },
      });
      fetchPincodes(); // Refresh the pincode list
    } catch (error) {
      setError("Failed to delete pincode");
      console.error(error);
    }
  };

  const handleDownload = () => {
    window.location.href =
      "https://api.medstown.com/admin/pincodes/download-csv";
  };
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
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add New Pincode
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          sx={{
            borderRadius: "4px",
            fontSize: "14px",
            width: "200px",
          }}
        >
          Download CSV
        </Button>
      </Stack>
      <div style={{ height: "400px" }}>
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">Add New Pincode</Typography>
          <MUITextField
            label="New Pincode"
            variant="outlined"
            fullWidth
            value={newPincode}
            onChange={(e) => setNewPincode(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <MUITextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <MUITextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <MUITextField
            label="User Id"
            variant="outlined"
            fullWidth
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPincode}
          >
            Add Pincode
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default PincodeSrc;
