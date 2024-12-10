import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Button,
  styled,
} from "@mui/material";
import { MyContext } from "Contextapi/MyContext";
import MyLocation from "Contextapi/MyLocation";

const TimelineContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  overflowX: "auto",
  width: "100%",
  padding: "16px",
  whiteSpace: "nowrap",
  position: "relative",
}));

const TimelineItem = styled(Box)(({ theme, isLast }) => ({
  display: "inline-block",
  position: "relative",
  textAlign: "center",
  width: "200px",
  "&:not(:last-child)": {
    marginRight: "32px",
  },
}));

const TimelineDot = styled(Box)(({ theme, hasData }) => ({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: hasData ? "#004d4d" : "#d3d3d3",
  border: `2px solid ${hasData ? "#004d4d" : "#d3d3d3"}`,
  marginBottom: "8px",
  position: "relative",
  zIndex: 1,
}));

const TimelineLine = styled(Box)(({ theme, hasData, isLast }) => ({
  position: "absolute",
  left: 50,
  bottom: 9,
  width: "5px", // Width of the vertical line
  height: "calc(100% + 16px)", // Extend beyond the timeline item
  backgroundColor: hasData ? "#004d4d" : "#d3d3d3",
  transform: "rotate(90deg) ", // Center the line horizontally

  zIndex: 0,
  visibility: isLast ? "hidden" : "visible", // Hide the line for the last item
}));
const TimelineLine2 = styled(Box)(({ theme, hasData, isLast }) => ({
  position: "absolute",
  left: 100,
  bottom: 9,
  width: "5px", // Width of the vertical line
  height: "calc(100% + 16px)", // Extend beyond the timeline item
  backgroundColor: hasData ? "#004d4d" : "#d3d3d3",
  transform: "rotate(90deg) ", // Center the line horizontally

  zIndex: 0,
  visibility: isLast ? "hidden" : "visible", // Hide the line for the last item
}));
const TimelineLine3 = styled(Box)(({ theme, hasData, isLast }) => ({
  position: "absolute",
  left: 150,
  bottom: 9,
  width: "5px", // Width of the vertical line
  height: "calc(100% + 16px)", // Extend beyond the timeline item
  backgroundColor: hasData ? "#004d4d" : "#d3d3d3",
  transform: "rotate(90deg) ", // Center the line horizontally

  zIndex: 0,
  visibility: isLast ? "hidden" : "visible", // Hide the line for the last item
}));
const TimelineLine4 = styled(Box)(({ theme, hasData, isLast }) => ({
  position: "absolute",
  left: 200,
  bottom: 9,
  width: "5px", // Width of the vertical line
  height: "calc(100% + 16px)", // Extend beyond the timeline item
  backgroundColor: hasData ? "#004d4d" : "#d3d3d3",
  transform: "rotate(90deg) ", // Center the line horizontally

  zIndex: 0,
  visibility: isLast ? "hidden" : "visible", // Hide the line for the last item
}));

const DetailBox = styled(Box)(({ theme }) => ({
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
}));

function OrderHistoryPage() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allOrders, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    getAllOrders();

    const intervalId = setInterval(() => {
      getAllOrders();
    }, 5000);
    return () => clearInterval(intervalId);


  }, []);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://api.medstown.com/customer/finalorder"
      );
      setOrderHistory(res.data.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = allOrders.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleRowClick = (row) => {
    setCurrentRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleDotClick = (step) => {
    setSelectedStep(step);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const cancelOrderHandler = async (id) => {
    setLoading(true);
    const data = {
      orderId: id,
    };
    try {
      const res = await axios.post(
        `https://api.medstown.com/customer/finalorder/status`,
        data
      );
      alert(res.data.message);
    } catch (error) {
      console.error(
        "Error cancelling order:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const isCancelled = currentRow?.status === "Order Cancelled";

 

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
            { field: "orderType", headerName: "Order Type", minWidth: 150 },
            { field: "orderId", headerName: "Order Id", minWidth: 150 },
            {
              field: "customerName",
              headerName: "Customer Name",
              minWidth: 150,
            },
            { field: "status", headerName: "Status", minWidth: 150 },
            { field: "totalPrice", headerName: "Total Price", minWidth: 150 },
            { field: "paymentType", headerName: "Payment Type", minWidth: 150 },
            {
              field: "createdAt",
              headerName: "Time and Date",
              width: 250,
              renderCell: (params) => (
                <>
                  {new Date(params.value).toLocaleTimeString()} -{" "}
                  {new Date(params.value).toDateString()}
                </>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row.orderId}
          components={{
            Toolbar: GridToolbar,
          }}
          onRowClick={handleRowClick}
        />

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            {currentRow ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Order ID: {currentRow?.id}
                </Typography>
                <Typography variant="body1">
                  User Location:{" "}
                  <MyLocation
                    latitude={currentRow?.row.userLat}
                    longitude={currentRow?.row.userLng}
                  />
                </Typography>
                <Typography variant="body1">
                  Pharmacy Location:
                  <MyLocation
                    latitude={currentRow?.row.pharmacyLng}
                    longitude={currentRow?.row.pharmacyLat}
                  />
                </Typography>
                <Typography variant="body1">
                  Status: {currentRow?.row.status}
                </Typography>
                <Typography variant="body1">
                  Delivery Code: {currentRow?.row.otpValue}
                </Typography>
                <Typography variant="body1">
                  Total Price: {currentRow?.row.totalPrice}
                </Typography>
                <Typography variant="body1">
                  Payment Type: {currentRow?.row.paymentType}
                </Typography>
                <Typography variant="body1">
                  Date: {new Date(currentRow?.row.createdAt).toDateString()}
                </Typography>
                <Typography variant="body1">
                  Time:{" "}
                  {new Date(currentRow?.row.createdAt).toLocaleTimeString()}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  margin="30px"
                >
                  <Typography variant="h6">Order Timeline</Typography>

                  <Button
                    variant="contained"
                    onClick={() => cancelOrderHandler(currentRow?.orderId)}
                    disabled={loading} // Assume `loading` is managed in the component's state
                  >
                    {loading ? "Cancelling..." : "Cancel Order"}
                  </Button>
                </Box>

                <TimelineContainer>
                  {/* Timeline Steps */}
                  <TimelineItem isLast={false}>
                    {/* <CheckCircleIcon/> */}

                    <TimelineDot
                      onClick={() => handleDotClick("user")}
                      hasData={
                        !isCancelled &&
                        currentRow?.row.userLat &&
                        currentRow?.row.userLng
                      }
                    />
                    <TimelineLine
                      hasData={
                        !isCancelled &&
                        currentRow?.row.userLat &&
                        currentRow?.row.userLng
                      }
                      isLast={false}
                    />
                    <TimelineLine2
                      hasData={
                        !isCancelled &&
                        currentRow?.row.userLat &&
                        currentRow?.row.userLng
                      }
                      isLast={false}
                    />
                    <TimelineLine3
                      hasData={
                        !isCancelled &&
                        currentRow?.row.userLat &&
                        currentRow?.row.userLng
                      }
                      isLast={false}
                    />
                    <TimelineLine4
                      hasData={
                        !isCancelled &&
                        currentRow?.row.userLat &&
                        currentRow?.row.userLng
                      }
                      isLast={false}
                    />

                    <Box sx={{ marginTop: "8px", textAlign: "center" }}>
                      <Typography>User Details</Typography>
                    </Box>
                  </TimelineItem>
                  <TimelineItem isLast={false}>
                    <TimelineDot
                      hasData={!isCancelled && currentRow?.row.pharmacyLat}
                      onClick={() => handleDotClick("pharmacy")}
                    />
                    <TimelineLine
                      hasData={!isCancelled && currentRow?.row.pharmacyLat}
                      isLast={false}
                    />
                    <TimelineLine2
                      hasData={!isCancelled && currentRow?.row.pharmacyLat}
                      isLast={false}
                    />
                    <TimelineLine3
                      hasData={!isCancelled && currentRow?.row.pharmacyLat}
                      isLast={false}
                    />
                    <TimelineLine4
                      hasData={!isCancelled && currentRow?.row.pharmacyLat}
                      isLast={false}
                    />
                    <Box sx={{ marginTop: "8px", textAlign: "center" }}>
                      <Typography>Pharmacy Details</Typography>
                    </Box>
                  </TimelineItem>
                  <TimelineItem isLast={false}>
                    <TimelineDot
                      hasData={!isCancelled && currentRow?.row.deliveryBoyLat}
                      onClick={() => handleDotClick("delivery")}
                    />
                    <TimelineLine
                      hasData={!isCancelled && currentRow?.row.deliveryBoyLat}
                      isLast={false}
                    />
                    <TimelineLine2
                      hasData={!isCancelled && currentRow?.row.deliveryBoyLat}
                      isLast={false}
                    />
                    <TimelineLine3
                      hasData={!isCancelled && currentRow?.row.deliveryBoyLat}
                      isLast={false}
                    />
                    <TimelineLine4
                      hasData={!isCancelled && currentRow?.row.deliveryBoyLat}
                      isLast={false}
                    />
                    <Box sx={{ marginTop: "8px", textAlign: "center" }}>
                      <Typography>Delivery Details</Typography>
                    </Box>
                  </TimelineItem>
                  <TimelineItem isLast={true}>
                    <TimelineDot
                      hasData={currentRow?.row.status === "Delivered"}
                      onClick={() => handleDotClick("status")}
                    />
                    <Box sx={{ marginTop: "8px", textAlign: "center" }}>
                      <Typography>Status:{currentRow?.row.status}</Typography>
                    </Box>
                  </TimelineItem>
                </TimelineContainer>

                {/* DetailBox */}
                <Dialog
                  open={openDetail}
                  onClose={handleCloseDetail}
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle>Details</DialogTitle>
                  <DialogContent>
                    <DetailBox>
                      {selectedStep === "user" && (
                        <>
                          <Typography variant="h6">
                            {" "}
                            Customer Details
                          </Typography>

                          <Typography variant="body1">
                            Customer Name: {currentRow?.row.customerName}
                          </Typography>
                          <Typography variant="body1">
                            Phone: {currentRow?.row.customerPhone}
                          </Typography>
                          <Typography variant="body1">
                            Customer Location:{" "}
                            <MyLocation
                              latitude={currentRow?.row.userLat}
                              longitude={currentRow?.row.userLng}
                            />
                          </Typography>
                        </>
                      )}
                      {selectedStep === "pharmacy" && (
                        <>
                          <Typography variant="h6">Pharmacy Details</Typography>

                          <Typography variant="body1">
                            Pharmacy Store : {currentRow?.row.pharmacyName}
                          </Typography>
                          <Typography variant="body1">
                            Phone: {currentRow?.row.pharmacyPhone}
                          </Typography>
                          <Typography variant="body1">
                            Pharmacy Location:{" "}
                            <MyLocation
                              latitude={currentRow?.row.pharmacyLng}
                              longitude={currentRow?.row.pharmacyLat}
                            />
                          </Typography>
                        </>
                      )}
                      {selectedStep === "delivery" && (
                        <>
                          <Typography variant="h6">
                            Delivery Partner Details
                          </Typography>

                          <Typography variant="body1">
                            Delivery partner Name:{" "}
                            {currentRow?.row.deliveryBoyName}
                          </Typography>
                          <Typography variant="body1">
                            Phone: {currentRow?.row.deliveryBoyPhone}
                          </Typography>
                          <Typography variant="body1">
                            Location:{" "}
                            <MyLocation
                              latitude={currentRow?.row.deliveryBoyLat}
                              longitude={currentRow?.row.deliveryBoyLng}
                            />
                          </Typography>
                        </>
                      )}
                      {selectedStep === "status" && (
                        <>
                          <Typography variant="h6">Order Status</Typography>
                          <Typography variant="body1">
                            Date:{" "}
                            {new Date(currentRow?.row.createdAt).toDateString()}
                          </Typography>
                          <Typography variant="body1">
                            Time:{" "}
                            {new Date(
                              currentRow?.row.createdAt
                            ).toLocaleTimeString()}
                          </Typography>
                          <Typography variant="body1">
                            Status: {currentRow?.row.status}
                          </Typography>
                        </>
                      )}
                    </DetailBox>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDetail} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <Typography>No details available</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default OrderHistoryPage;
