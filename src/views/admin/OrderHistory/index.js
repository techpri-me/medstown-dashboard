import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CheckTable from "components/CheckTable";
import { columnsDataCheck } from "./variables/columnsData";
import { Box, CardContent } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { MyContext } from "Contextapi/MyContext";
import MyLocation from "Contextapi/MyLocation";
const OrderHistory = () => {
  const [AllOrder, setOrderHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  useEffect(() => {
    getallpharmacies(pageNumber);
  }, [pageNumber]);

  const getallpharmacies = (page) => {
    setLoading(true);
    axios
      .get(`http://localhost:7001/customer/getorders/${page}`)
      .then((res) => {
        setLoading(false);
        setOrderHistory(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePagination = (direction) => {
    if (direction === "back") {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        getallpharmacies(pageNumber);
      }
    } else {
      setPageNumber(pageNumber + 1);
      getallpharmacies(pageNumber);
    }
  };

  const acceptedOrders = AllOrder.filter(
    (order) => order.status === "accepted"
  );
  console.log("Accepted orders - ", acceptedOrders);

  const tableColumns = [
    { id: "orderId", label: "Order Id", minWidth: 150 },
    { id: "userLocation", label: "User Location", minWidth: 250 },
    {
      id: "pharmacy Location",
      label: "Pharmacy Location",
      minWidth: 250,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "deliverycode",
      label: "Delivery Code",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    // {
    //   id: "quantity",
    //   label: "Quantity",
    //   minWidth: 150,
    //   align: "left",
    //   format: (value) => value.toFixed(2),
    // },
    {
      id: "total price",
      label: "Total Price",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "Payment Type",
      label: "Payment Type",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "date",
      label: "Date",
      minWidth: 250,
      align: "left",
      format: (value) => value.toFixed(2),
    },
  ];
<<<<<<< main
  const[data,setData] = useState([
    {
    orderId:"7823231",
    userLocation:"Chintal Balanagar",
    pharmacyLocation : "Chintal, Balanagar",
    orderTotal:1000,
    date:"12/05/2024",
    code:"87120",
    status:"completed",
    quantity:2
  },
  {
    orderId:"7823231",
    userLocation:"Chintal Balanagar",
    pharmacyLocation : "Chintal, Balanagar",
    orderTotal:1000,
    date:"12/05/2024",
    code:"87120",
    status:"completed",
    quantity:2

  },
  {
    orderId:"7823231",
    userLocation:"Near Police Station, Medchal",
    pharmacyLocation : "Ambedkar Statue, Medchal",
    orderTotal:1000,
    date:"12/05/2024",
    code:"87120",
    status:"completed",
    quantity:2

  },
  {
    orderId:"7823231",
    userLocation:"Ananadh Nagar, Hyderabad",
    pharmacyLocation : "Ananadh Nagar, Near Birla Mandir,Hyderabad",
    orderTotal:1000,
    date:"12/05/2024",
    code:"87120",
    status:"completed",
    quantity:2

  },
  {
    orderId:"7823231",
    userLocation:"Plot No. 123, Near DSNR Bus Stop, Hyderabad",
    pharmacyLocation : "Near DSNR Metro Station, Hyderabad",
    orderTotal:1000,
    date:"12/05/2024",
    code:"87120",
    status:"completed",
    quantity:2

  }

]);
  function handleRowFunction(row){
    console.log("clicked on row - ",row);
    setCurrentRow(row)
  }
=======

  function handleRowFunction(row) {
    console.log("clicked on row - ", row);
    setCurrentRow(row);
  }

  const { dataorder } = useContext(MyContext);

  const [pharmacy, setPharmacy] = useState([]);
  console.log(pharmacy);

  // console.log(dataorder)

  // const res = dataorder?.map( async (item)=> {
  //     const customer =   await axios.get(`https://api.medstown.com/pharmacy/getPharmacy/${item.pharmacyId}`)
  //     setPharmacy(customer.data)
  // })
>>>>>>> local

  return (
    <div className="mt-8">
      <div>
        <TableContainer component={Paper}>
<<<<<<< main
      <Table sx={{ minWidth: 650 }} aria-label="simple table">


        {/* <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="left" width={150}>User Location</TableCell>
            <TableCell align="left" width={150}>Pharmacy Location</TableCell>
            <TableCell align="left" width={150}>Status</TableCell>
            <TableCell align="left" width={150}>Delivery Code</TableCell>
            <TableCell align="left" width={150}>Quantity</TableCell>
            <TableCell align="left" width={150}>Total Price</TableCell>
            <TableCell align="left" width={150}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingData && pendingData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
            

              {checkAll(row) ? <>

                <TableCell align="left" width={150}>{row.orderId}</TableCell>
              <TableCell align="left" width={150}>{checkNull(row.userLat,row.userLang) ? row.userLat+","+row.userLang:""}</TableCell>
              <TableCell align="left" width={150}>{checkNull(row.pharmacyLat,row.pharmacyLang) ? row.pharmacyLat+","+row.pharmacyLang:""}</TableCell>
              <TableCell align="left" width={150}>1023</TableCell>
              <TableCell align="left" width={150}>{checkNull(row.quantity) ? row.quantity : ''}</TableCell>
              <TableCell align="left" width={150}>{checkNull(row.totalPrice) ? row.totalPrice  :""}</TableCell>
              <TableCell align="left" width={150}>{checkNull(row.status) ? row.status :''}</TableCell>
              <TableCell align="left" width={150}>{row.createdAt}</TableCell>
              </> : <></>}
            </TableRow>
          ))}
        </TableBody> */}







        <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((row,index) => {
=======
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableColumns &&
                  tableColumns?.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataorder?.map((row, index) => {
>>>>>>> local
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={() => handleRowFunction(row)}
                  >
                    <TableCell style={{ width: 150 }} align="left">
                      {row.orderId}
                    </TableCell>
                    <TableCell style={{ width: 250 }} align="left">
                      <MyLocation
                        latitude={row?.userLat}
                        longitude={row?.userLng}
                      />
                    </TableCell>
                    <TableCell style={{ width: 250 }} align="left">
                      {/* {row.pharmacyLocation} */}
                      <MyLocation
                        latitude={row?.pharmacyLng}
                        longitude={row?.pharmacyLat}
                      />
                    </TableCell>
                    <TableCell style={{ width: 150 }} align="left">
                      {row.status}
                    </TableCell>
                    <TableCell style={{ width: 150 }} align="left">
                      {" "}
                      {row.otpValue}
                    </TableCell>
                    {/* <TableCell style={{ width: 150 }} align="left">
                      {row.quantity}
                    </TableCell> */}
                    <TableCell style={{ width: 150 }} align="left">
                      {row.totalPrice}
                    </TableCell>
                    <TableCell style={{ width: 150 }} align="left">
                      {row.paymentType}
                    </TableCell>
                    <TableCell style={{ width: 150 }} align="left">
                      {new Date(row.createdAt).toDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="mt-4 flex items-center justify-end gap-5">
          <p className="font-semibold">
            Page No: {!loading ? pageNumber : "_"}
          </p>
          <button
            disabled={loading ? true : false}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => handlePagination("back")}
          >
            Back
          </button>
          <button
            disabled={loading ? true : false}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => handlePagination("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
