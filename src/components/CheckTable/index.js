import React, { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from "axios";
import { MdCheckCircle, MdOutlineError, MdPending } from "react-icons/md";
import StepperComponent from "./Stepper";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
};

const events = [
  { id: 1, title: "Order Placed", date: "10:19 PM" },
  { id: 2, title: "Order Accept Time Pharmacy", date: "12:00 AM" },
  { id: 3, title: "Order Accept Time Delivery Partner", date: "2:00 AM" },
  { id: 4, title: "Order Delivery Time", date: "5:20 AM" },
];

const dateOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const CheckTable = ({ columnsData, tableData, title }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [location, setLocation] = useState("");
  const [rowSelected, setRowSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
        );

        const addressComponents = response.data.results[0]?.address_components || [];
        const city = addressComponents.find((component) => component.types.includes("locality"));
        const area = addressComponents.find((component) => component.types.includes("sublocality") || component.types.includes("neighborhood"));

        const cityName = city?.long_name || "N/A";
        const areaName = area?.long_name || "N/A";

        setLocation(`${areaName}, ${cityName}`);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    const getAllOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.medstown.com/customer/finalorder`);
        setPendingData(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllOrders();
  }, []);

  const handleRowFunction = (row) => {
    setShowModal(true);
    setCurrentRow(row);
  };

  const checkNull = (data1, data2) => {
    return (data1 !== null && data1) || (data2 !== null && data2);
  };

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">Loading...</TableCell>
                  </TableRow>
                ) : (
                  pendingData.map((row) => (
                    <TableRow
                      hover
                      onClick={() => handleRowFunction(row)}
                      key={row.orderId}
                    >
                      <TableCell>{row.orderId}</TableCell>
                      <TableCell>{checkNull(row.userLat, row.userLng) ? `${row.userLat}, ${row.userLng}` : ""}</TableCell>
                      <TableCell>{checkNull(row.pharmacyLat, row.pharmacyLng) ? `${row.pharmacyLat}, ${row.pharmacyLng}` : ""}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.deliveryCode}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.totalPrice}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pendingData.length}
            rowsPerPage={10}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </CardContent>
      </Card>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box style={modalStyle}>
          <Card>
            <CardContent>
              <p>You are Viewing Order With Id - {currentRow?.orderId}</p>
              <StepperComponent data={currentRow} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default CheckTable;
