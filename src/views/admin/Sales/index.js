import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { TextField, Modal, Box, Typography, Card, Grid } from "@mui/material";
import axios from "axios";

const WalletDetails = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const paymentHandler = async () => {
    try {
      const res = await axios.get(
        "https://api.medstown.com/pay/p1/getpayments"
      );
      setTransaction(res?.data?.total_transaction);
      setTotalPrice(res.data.total_amount);
      setData(res?.data?.payment);
    } catch (error) {
      console.log(error);
    }
  };

  const transactionDetails = async (orderId) => {
    setOpenModal(true);
    console.log(orderId, "id");
    try {
      const finalOrderRes = await axios.get(
        `https://api.medstown.com/customer/findorderid/${orderId}`
      );
      console.log(finalOrderRes?.data, "sssssssssssss");
      setSelectedOrderDetails({ finalOrderDetails: finalOrderRes.data });
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    paymentHandler();
  }, []);

  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const tableColumns = [
    { field: "orderId", headerName: "Order ID", width: 150 },
    { field: "customerId", headerName: "Customer ID", width: 150 },
    {
      field: "orderTotal",
      headerName: "Order Total",
      width: 150,
      renderCell: (params) => params.value / 100,
    },
    { field: "orderNature", headerName: "Order Nature", width: 150 },
    { field: "paymentId", headerName: "Payment ID", width: 150 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
    { field: "paymentStatus", headerName: "Payment Status", width: 150 },
    {
      field: "createdAt",
      headerName: "Order Date",
      width: 180,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  console.log(selectedOrderDetails?.finalOrderDetails);

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{ padding: "16px" }}>
            <Typography variant="h6">Total Earnings</Typography>
            <Typography variant="h4">₹{totalPrice}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{ padding: "16px" }}>
            <Typography variant="h6">Total Transactions</Typography>
            <Typography variant="h4">{transaction}</Typography>
          </Card>
        </Grid>
      </Grid>

      <div style={{ marginTop: "20px" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchTextChange}
        />

        <div style={{ marginTop: "20px", height: "400px" }}>
          <DataGrid
            rows={filteredRows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{ width: "100%" }}
            getRowId={(row) => row._id}
            onRowClick={(params) => {
              transactionDetails(params.row.orderId);
            }}
          />
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="order-details-modal"
        aria-describedby="order-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="order-details-modal" variant="h6"></Typography>
          {selectedOrderDetails ? (
            <div>
              <Typography>
                <strong>Order ID:</strong>{" "}
                {selectedOrderDetails?.finalOrderDetails?.orderId}
              </Typography>
              <Typography>
                <strong>Total Price:</strong> ₹
                {selectedOrderDetails?.finalOrderDetails?.totalPrice}
              </Typography>
              <hr />
              <Typography>
                <strong>Items:</strong>{" "}
                {selectedOrderDetails.finalOrderDetails?.items?.join(", ")}
              </Typography>
              <Typography>
                <strong>Customer Name:</strong>
                {selectedOrderDetails?.finalOrderDetails?.customerName}
              </Typography>
              {/* <Typography>
                <strong>Total Amount:</strong> ₹
                {selectedOrderDetails?.finalOrderDetails?.customerName}
              </Typography> */}
              <Typography>
                <strong>Pharmacy Name:</strong>{" "}
                {selectedOrderDetails.finalOrderDetails.pharmacyName}
              </Typography>
              <Typography>
                <strong>Delivery Partner Name:</strong>{" "}
                {selectedOrderDetails?.finalOrderDetails?.deliveryBoyName}
              </Typography>

              <Typography>
                <strong>Delivery Price:</strong> ₹{" "}
                {selectedOrderDetails.finalOrderDetails.deliveryPrice}
              </Typography>
              <Typography>
                <strong>Payment Type:</strong>{" "}
                {selectedOrderDetails.finalOrderDetails.paymentType}
              </Typography>
            </div>
          ) : (
            <Typography>No order details found.</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default WalletDetails;
