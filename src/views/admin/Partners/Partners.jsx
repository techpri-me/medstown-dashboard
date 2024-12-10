import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddMedicineForm from "./components/AddMedicineForm"; // Ensure this component includes image upload logic

const BACKEND_API_URL = "https://api.medstown.com";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Partners = () => {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showMedicine(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const showMedicine = async (page, limit) => {
    try {
      const res = await axios.get(
        `${BACKEND_API_URL}/admin/getallmeds?page=${page}&limit=${limit}`
      );
      setMedicines(Array.isArray(res.data.medicines) ? res.data.medicines : []);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      showMedicine(currentPage, rowsPerPage);
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_API_URL}/admin/searchmedicine`, {
        search: searchValue,
      });
      setMedicines(res.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleOpen = (id) => {
    axios
      .post(`${BACKEND_API_URL}/admin/getmedbyid`, { id })
      .then((res) => {
        setModalData(res.data);
        setOpen(true);
      })
      .catch((err) => console.error("Error fetching medicine details:", err));
  };

  const addMedicineHandler = () => {
    setShowModal(true);
    setIsUpdateModal(false);
    setModalData({});
  };

  const updateCurrentMedicineHandler = (data) => {
    setShowModal(true);
    setIsUpdateModal(true);
    setModalData(data);
  };

  const deleteCurrentMedicineHandler = (data) => {
    setModalData(data);
    setShowDialog(true);
  };

  const deleteConfirmHandler = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${BACKEND_API_URL}/admin/deletemedicine/${modalData.medicineId}`
      );
      setLoading(false);
      setShowDialog(false);
      setOpen(false);
      showMedicine(currentPage, rowsPerPage);
    } catch (error) {
      console.error("Error during deletion:", error);
      setLoading(false);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <div className="my-5 flex justify-end gap-5">
        <Button
          variant="contained"
          color="success"
          onClick={addMedicineHandler}
        >
          Add Medicine
        </Button>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
      >
        <Box sx={{ ...style, width: 1200 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" mb={2}>
              {isUpdateModal ? "Update Medicine" : "Add Medicine"}
            </Typography>
            <IconButton color="primary" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box display="flex" flexDirection="row" p={2} maxHeight="650px">
            <Box
              flex={1}
              p={2}
              borderRight="1px solid #ddd"
              display="flex"
              flexDirection="column"
              overflow="auto"
            >
              <AddMedicineForm
                updateModal={isUpdateModal}
                modalData={modalData}
              />
            </Box>
            <Box
              flex={1}
              p={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" mb={2}>
                Medicine Images
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflowY: "auto",
                  maxHeight: "650px",
                }}
              >
                {modalData?.medicineImage?.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt={`Medicine Image ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {loading ? (
          <DialogContent>
            <DialogContentText>Loading... Hang on!</DialogContentText>
          </DialogContent>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this medicine?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Once deleted, this action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button onClick={deleteConfirmHandler} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchTextChange}
        sx={{ marginBottom: 3 }}
      />

      <DataGrid
        rows={medicines}
        columns={[
          { field: "medicineName", headerName: "Medicine Name", width: 200 },
          {
            field: "medicineCompany",
            headerName: "Medicine Company",
            width: 200,
          },
          {
            field: "medicinePrice",
            headerName: "Price",
            width: 100,
            renderCell: (params) => <div>₹ {params.value || 0}</div>,
          },
          { field: "disease", headerName: "Category", width: 200 },
          { field: "rxRequired", headerName: "Rx Required", width: 100 },
          { field: "type", headerName: "Type", width: 200 },
          {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
              <div>
                <IconButton
                  color="primary"
                  onClick={() => updateCurrentMedicineHandler(params.row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => deleteCurrentMedicineHandler(params.row)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ),
          },
        ]}
        pageSize={5}
        pageSizeOptions={[5, 10]}
        disableSelectionOnClick
        sx={{ width: "100%" }}
        getRowId={(row) => row._id}
        onRowClick={(row) => handleOpen(row.id)}
      />

      <div className="mt-5 flex justify-end gap-5">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </Button>

        <div className="flex items-center">
          <Typography variant="body1" sx={{ mr: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Partners;
