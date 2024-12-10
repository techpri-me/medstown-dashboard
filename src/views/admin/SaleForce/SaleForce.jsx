import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../../config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputField from "components/fields/InputField";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { Alert, Button, TextField, Paper } from "@mui/material";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "80vh",
  overflowY: "scroll",
};

const deleteModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 200,
  overflowY: "scroll",
};

const SaleForce = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [storeParams, setStoreParams] = useState(null);
  const [searchText, setSearchText] = useState("");

  // State for Pharmacy Details
  const [pharmacyDetails, setPharmacyDetails] = useState({
    fullName: "",
    bussinessName: "",
    bussinessRegNo: "",
    gstNo: "",
    medicalLicenseNo: "",
    address: "",
    pincode: "",
    businessPhone: "",
    ownerPhone: "",
    email: "",
    dateOfRegistration: "",
    dateOfMedicalLicense: "",
    businessTiming: "",
    location: "",
    pharmacyId: "",
  });

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDeleteOpen = (params) => {
    setDeleteOpen(true);
    setStoreParams(params);
  };

  useEffect(() => {
    getAllPharmacies();
  }, []);

  const getAllPharmacies = () => {
    axios
      .get(`https://api.medstown.com/pharmacy/getpharmacy`)
      .then((res) => {
        // console.log(res.data.pharmacies)
        setData(res.data.pharmacies.reverse() || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditPharmacy = (row) => {
    setOpen(true);
    setPharmacyDetails({
      ...pharmacyDetails,
      ...row.row,
    });
  };

  const handleSubmitDetails = () => {
    // console.log(pharmacyDetails, "ddddddddddddddd");
    axios
      .post(`${config.api}/editpharmacy`, pharmacyDetails)
      .then((res) => {
        getAllPharmacies();
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeletePharmacy = (data) => {
    axios
      .post(`${config.api}/deletepharmacy`, { pharmacyId: data.row.pharmacyId })
      .then((res) => {
        getAllPharmacies();
        handleDeleteClose();
      })
      .catch((err) => {
        console.error(err);
        handleDeleteClose();
      });
  };

  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const response = await axios.get(
        "https://api.medstown.com/admin/api/autocomplete",
        {
          params: { input: value },
        }
      );

      setSuggestions(response.data.predictions);
    } else {
      setSuggestions([]);
    }
  };

  const handlePlaceSelect = async (suggestion) => {
    try {
      await axios.put(
        `https://api.medstown.com/admin/api/location/edit/${suggestion.place_id}`,
        { businessPhone: pharmacyDetails.businessPhone }
      );

      setPharmacyDetails({
        ...pharmacyDetails,
      });
      setSearchTerm(suggestion.description);

      setSuggestions([]);
      setTimeout(() => {
        setSearchTerm("");
      }, 300);
      setAlertMessage("Location added successfully");

      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating location:", error);
      setAlertMessage("Error updating location");
      setAlertOpen(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handledetailsClick = async (id, name) => {
    try {
      const res = await axios.get(
        `https://api.medstown.com/admin/getpharmacy/details/${id}`
      );

      setSelectedUserDetails(res.data); // Store the user details in state

      setOpenOrder(true); // Open the modal
    } catch (error) {
      alert("Order history not available... - ", error);
    }
  };

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
            { field: "medstownid", headerName: "id", width: 150 },
            { field: "bussinessName", headerName: "Name", width: 300 },
            { field: "businessPhone", headerName: "Phone", width: 180 },
            { field: "fullName", headerName: "Owner Name", width: 180 },
            { field: "address", headerName: "Address", width: 350 },
            { field: "ownerPhone", headerName: "Owner Phone", width: 200 },
            { field: "email", headerName: "Email", width: 200 },
            {
              field: "dateOfRegistration",
              headerName: "Date Of Registration",
              width: 200,
            },
            {
              field: "dateOfMedicalLicense",
              headerName: "Date Of Medical License",
              width: 200,
            },
            {
              field: "bussinessRegNo",
              headerName: "Bussiness Reg No",
              width: 200,
            },
            { field: "gstNo", headerName: "GST No", width: 150 },
            {
              field: "medicalLicenseNo",
              headerName: "Medical License No",
              width: 150,
            },
            { field: "pincode", headerName: "Pincode", width: 100 },
            {
              field: "businessTiming",
              headerName: "Business Timing",
              width: 150,
              renderCell: (params) => (
                <div className="flex items-center">
                  {params?.row?.businessTiming?.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span>Start: {item.start} AM</span>
                      <span>End: {item.end} PM</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              field: "location",
              headerName: "Location",
              width: 150,
              renderCell: (params) => {
                const place_id = params?.row?.place_id;

                return (
                  <div className="flex items-center">
                    {place_id ? (
                      <FiExternalLink
                        size={24}
                        className="cursor-pointer"
                        onClick={() => {
                          // Construct the Google Maps URL using Place ID
                          const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

                          console.log(
                            `Opening Google Maps with URL: ${googleMapsUrl}`
                          );
                          window.open(googleMapsUrl, "_blank"); // Open in a new tab
                        }}
                      />
                    ) : (
                      <span>No Location</span> // Fallback for missing Place ID
                    )}
                  </div>
                );
              },
            },
            {
              field: "Action",
              headerName: "Action",
              width: 200,
              renderCell: (params) => (
                <div className="flex items-center">
                  <BiPencil
                    size={18}
                    onClick={() => handleEditPharmacy(params)}
                    className="mr-7 cursor-pointer hover:text-blue-500"
                  />
                  <AiFillDelete
                    size={18}
                    onClick={() => handleDeleteOpen(params)}
                    className="mr-7 cursor-pointer hover:text-red-500"
                  />
                  <FaInfoCircle
                    size={18}
                    onClick={() =>
                      handledetailsClick(
                        params?.row?.pharmacyId,
                        params.row.pharmacyName
                      )
                    }
                    className="mr-7 cursor-pointer hover:text-red-500"
                  />
                </div>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
          // onRowClick={(row) => handleEditPharmacy(row)}
        />
      </div>

      {/* Edit Pharmacy Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="sticky -top-10 z-50 mb-5 flex h-14 items-center justify-between bg-white px-1">
            <h4 className="text-2xl font-bold">Edit Pharmacy</h4>
          </div>
          <div>
            <TextField
              label="Location Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: searchTerm && (
                  <IconButton onClick={handleClearSearch}>
                    <CloseIcon />
                  </IconButton>
                ),
              }}
            />
            {suggestions.length > 0 && (
              <ul>
                {suggestions?.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handlePlaceSelect(suggestion)}
                    className="cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePlaceSelect({ place_id: searchTerm })} // Save button click handler
              disabled={!searchTerm}
              style={{ marginTop: "10px" }}
            >
              Save
            </Button>

            {/* Alert Modal */}
            <Dialog open={alertOpen} onClose={handleCloseAlert}>
              <DialogTitle>Notification</DialogTitle>
              <DialogContent>{alertMessage}</DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAlert} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* CloseIcon */}

          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Full Name"
              value={pharmacyDetails?.fullName}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  fullName: e.target.value,
                })
              }
            />
            <InputField
              label="Bussiness Name"
              value={pharmacyDetails?.bussinessName}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  bussinessName: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Bussiness Reg No"
              value={pharmacyDetails.bussinessRegNo}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  bussinessRegNo: e.target.value,
                })
              }
            />
            <InputField
              label="GST No"
              value={pharmacyDetails.gstNo}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  gstNo: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Medical License No"
              value={pharmacyDetails.medicalLicenseNo}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  medicalLicenseNo: e.target.value,
                })
              }
            />
            <InputField
              label="Address"
              value={pharmacyDetails.address}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Pincode"
              value={pharmacyDetails.pincode}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  pincode: e.target.value,
                })
              }
            />
            <InputField
              label="Business Phone"
              value={pharmacyDetails.businessPhone}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  businessPhone: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Owner Phone"
              value={pharmacyDetails.ownerPhone}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  ownerPhone: e.target.value,
                })
              }
            />
            <InputField
              label="Email"
              value={pharmacyDetails.email}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Date Of Registration"
              value={pharmacyDetails.dateOfRegistration}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  dateOfRegistration: e.target.value,
                })
              }
            />
            <InputField
              label="Date Of Medical License"
              value={pharmacyDetails.dateOfMedicalLicense}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  dateOfMedicalLicense: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Business Timing"
              value={pharmacyDetails.businessTiming}
              onChange={(e) =>
                setPharmacyDetails({
                  ...pharmacyDetails,
                  businessTiming: e.target.value,
                })
              }
            />
            {/* <InputField
              label="Location"
              value={pharmacyDetails.location}
              onChange={(e) => setPharmacyDetails({ ...pharmacyDetails, location: e.target.value })}
            /> */}
          </div>

          <Button
            variant="contained"
            onClick={handleSubmitDetails}
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Delete Pharmacy Modal */}
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <Alert severity="warning">
            Are you sure you want to delete this pharmacy?
          </Alert>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeletePharmacy(storeParams)}
            sx={{ marginTop: 2 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteClose}
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* user box detals  */}
      <div>
        <Modal
          open={openOrder}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
{data?.row?.pharmacyName}
                </Typography> */}
          <Box
            sx={{
              p: 4,
              backgroundColor: "white",
              borderRadius: 2,
              maxWidth: "80%",
              margin: "auto",
              height: "90vh", // Increased height
              overflowY: "auto", // Allow scrolling if content is too tall
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data?.row?.pharmacyName}
            </Typography>

            {selectedUserDetails ? (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Total no. of Order : {selectedUserDetails?.totalOrders}
                </Typography>
                <Grid container spacing={2} mt={3} sx={{ height: "100%" }}>
                  {/* Left Side: Order Details */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ cursor: "pointer", height: "90%" }}
                  >
                    <Paper
                      elevation={3}
                      sx={{ padding: 2, height: "100%", overflowY: "auto" }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {" "}
                        Notification Orders Pharmacy Details
                      </Typography>
                      {selectedUserDetails?.pharmacyairorders?.map(
                        (item, index) => (
                          <Box key={index} mt={1}>
                            <Typography variant="body1">
                              <strong>Order ID:</strong> {item.orderId}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Status:</strong> ₹{item.status}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Total Price:</strong> ₹{item.totalPrice}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Created At:</strong>{" "}
                              {new Date(item.date).toLocaleString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Order Details:</strong>
                            </Typography>
                            {item.orderDetails.map((orderdata, i) => (
                              <Box key={i} ml={2}>
                                <Typography variant="body2">
                                  - {orderdata.medicineName} (x
                                  {orderdata.medicineQuantity}) - ₹
                                  {orderdata.medicinePrice}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )
                      )}

                      <Divider sx={{ my: 4, height: 2 }} />

                      <Typography variant="h6" gutterBottom>
                        {" "}
                        Rejected Orders Pharmacy Details
                      </Typography>
                      {selectedUserDetails?.rejectedOrders?.map(
                        (item, index) => (
                          <Box key={index} mt={3}>
                            <Typography variant="body1">
                              <strong>Order ID:</strong> {item.orderId}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Total Price:</strong> ₹{item.totalPrice}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Created At:</strong>{" "}
                              {new Date(item.date).toLocaleString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Order Details:</strong>
                            </Typography>
                            {item.orderDetails.map((orderdata, i) => (
                              <Box key={i} ml={2}>
                                <Typography variant="body2">
                                  - {orderdata.medicineName} (x
                                  {orderdata.medicineQuantity}) - ₹
                                  {orderdata.medicinePrice}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )
                      )}

                      <Divider sx={{ my: 4, height: 2 }} />

                      <Typography variant="h6" gutterBottom>
                        {" "}
                        Missing Orders Pharmacy Details
                      </Typography>
                      {selectedUserDetails?.missingOrders?.map(
                        (item, index) => (
                          <Box key={index} mt={3}>
                            <Typography variant="body1">
                              <strong>Order ID:</strong> {item.orderId}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Total Price:</strong> ₹{item.totalPrice}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Created At:</strong>{" "}
                              {new Date(item.date).toLocaleString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Order Details:</strong>
                            </Typography>
                            {item.orderDetails.map((orderdata, i) => (
                              <Box key={i} ml={2}>
                                <Typography variant="body2">
                                  - {orderdata.medicineName} (x
                                  {orderdata.medicineQuantity}) - ₹
                                  {orderdata.medicinePrice}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )
                      )}
                    </Paper>
                  </Grid>

                  <Divider sx={{ my: 4, height: 2 }} />

                  {/* Right Side: Final Order Details */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ cursor: "pointer", height: "90%" }}
                  >
                    <Paper
                      elevation={3}
                      sx={{ padding: 2, height: "100%", overflowY: "auto" }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {" "}
                        Accepted Pharmacy Details
                      </Typography>
                      {selectedUserDetails?.acceptedOrders?.map(
                        (item, index) => (
                          <Box key={index}>
                            <Typography variant="body1">
                              <strong>Order ID:</strong> {item.orderId}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Total Price:</strong> ₹{item.totalPrice}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Created At:</strong>{" "}
                              {new Date(item.date).toLocaleString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Order Details:</strong>
                            </Typography>
                            {item.orderDetails.map((orderdata, i) => (
                              <Box key={i} ml={2}>
                                <Typography variant="body2">
                                  - {orderdata.medicineName} (x
                                  {orderdata.medicineQuantity}) - ₹
                                  {orderdata.medicinePrice}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )
                      )}

                      <Divider sx={{ my: 4, height: 2 }} />

                      <Typography variant="h6" gutterBottom>
                        Final Order Details
                      </Typography>
                      {selectedUserDetails?.finalOrders?.map(
                        (finalOrder, index) => (
                          <Box key={index} mt={2}>
                            <Typography variant="body1">
                              <strong>Order ID:</strong> {finalOrder.orderId}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Customer Name:</strong>{" "}
                              {finalOrder.customerName}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Customer Phone:</strong>{" "}
                              {finalOrder.customerPhone}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Pharmacy Name:</strong>{" "}
                              {finalOrder?.pharmacyName || null}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Payment Type:</strong>{" "}
                              {finalOrder.paymentType}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Status:</strong> {finalOrder.status}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Total Price:</strong> ₹
                              {finalOrder.totalPrice}
                            </Typography>
                            <Typography variant="body1">
                              <strong>OTP:</strong> {finalOrder.otpValue}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Delivery Boy:</strong>{" "}
                              {finalOrder.deliveryBoyName} -{" "}
                              {finalOrder.deliveryBoyPhone}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Created At:</strong>{" "}
                              {new Date(finalOrder.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Order Details:</strong>
                            </Typography>
                            {finalOrder.orderDetails.map((order, i) => (
                              <Box key={i} ml={2}>
                                <Typography variant="body2">
                                  - {order.medicineName} (x
                                  {order.medicineQuantity}) - ₹
                                  {order.medicinePrice}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="body1">Loading...</Typography>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SaleForce;
