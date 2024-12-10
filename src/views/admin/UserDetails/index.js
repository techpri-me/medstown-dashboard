import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Modal,
  TextField,
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Button
} from "@mui/material";
import axios from "axios";
import { MyContext } from "Contextapi/MyContext";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import MyLocation from "Contextapi/MyLocation";

const UserDetails = () => {
  const [searchText, setSearchText] = useState("");
  const [usersData, setUsersData] = useState([]);
  const { setUsercount } = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await axios.get(
          "https://api.medstown.com/customer/getallusers"
        );
        if (Array.isArray(res.data.data)) {
          setUsersData(res.data.data.reverse());
          setUsercount(res.data.data.length);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.log("Error Occurred! - ", error);
      }
    }

    getAllUsers();
  }, [setUsercount]);

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

  const handleClose = () => {
    setOpen(false);
    setSelectedUserDetails(null);
  };

  const handledetailsClick = async (userId) => {
    try {
      const res = await axios.get(
        `https://api.medstown.com/customer/getuser/allorder/${userId}`
      );
      setSelectedUserDetails(res.data); // Store the user details in state
      setOpen(true); // Open the modal
    } catch (error) {
      console.log("Error fetching user details - ", error);
    }
  };

  console.log("responese-user", selectedUserDetails);

  const tableColumns = [
    { field: "fullName", headerName: "Name", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "pincode", headerName: "Pincode", width: 300 },
    {
      field: "datetime",
      headerName: "Date / Time",
      width: 300,
      renderCell: (params) => {
        const date = new Date(params.value || null);
        return (
          <div>
            {date.toDateString()} - {date.toLocaleTimeString()}
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
          <FaInfoCircle
            size={18}
            onClick={() => handledetailsClick(params?.row?.userId)} // Fetch user details when clicking the info icon
            className="mr-7 cursor-pointer hover:text-blue-500"
          />
          <AiFillDelete
            size={18}
            className="mr-7 cursor-pointer hover:text-red-500"
          />
        </div>
      ),
    },
  ];
  const handleDownload = () => {
    window.location.href = "https://api.medstown.com/admin/users/download-csv";
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            borderRadius: 2,
            maxWidth: "80%",
            margin: "auto",
            height: "100vh",
          }}

          // onClick={()=> handleClose() }
        >
          {selectedUserDetails ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Order Details for {selectedUserDetails?.customerName}
              </Typography>

              {/* Grid for Side-by-Side Layout */}
              <Grid container spacing={4} mt={3} sx={{ height: "100%" }}>
                {/* Air Order Details - Left Side */}
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
                      Place Order Details
                    </Typography>
                    {selectedUserDetails?.airOrder?.map((item, index) => (
                      <Box key={index} mt={5}>
                        <Typography variant="body1">
                          <strong>Order Type:</strong> {item.type}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Order status:</strong> {item.orderId}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Order ID:</strong> {item.status}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Customer Name:</strong> {item.customerName}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Customer Phone:</strong> {item.customerPhone}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Customer location:</strong>
                          <MyLocation
                            latitude={item?.userLat}
                            longitude={item?.userLng}
                          />

                          {item.customerPhone}
                        </Typography>

                        <Typography variant="body1">
                          <strong>Pharmacy Name:</strong> {item.pharmacyName}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Delivery Boy Name:</strong>{" "}
                          {item.deliveryBoyName || "N/A"}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Total Price:</strong> ₹{item.totalPrice}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Created At:</strong>{" "}
                          {new Date(item.createdAt).toLocaleString()}
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
                    ))}
                  </Paper>
                </Grid>

                {/* Final Order Details - Right Side */}
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
                      Final Order Details
                    </Typography>
                    {selectedUserDetails?.finalorderdetal?.map(
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
  );
};

export default UserDetails;
