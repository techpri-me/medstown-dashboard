import React, { useEffect, useMemo, useState } from "react";
import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import Card from "components/card";
import StepperComponent from "./Stepper"
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdOutlineError, MdPending } from "react-icons/md";
import axios from "axios";
import { formattedDate,correctFormattedDate } from "utils";
import { Box, CardContent } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';



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
// time
const events = [
  { id: 1, title: "Order Placed", date: "10:19 PM" },
  { id: 2, title: "Order Accept Time Pharmacy", date: "12:00 AM" },
  { id: 3, title: "Order Accept Time Delivery Partner", date: "2:00 AM" },
  { id: 4, title: "Order Delivery Time", date: "5:20 AM" },
];

const styles = {
  timeline: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflowX: "auto",
    width: "100%",
    whiteSpace: "nowrap",
    padding: "10px 20px",
  },

  timelineEvent: {
    backgroundColor: "#014d4d",
    color: "white",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    padding: "10px",
    minWidth: "200px",
    margin: "10px 0",
  },

  eventDate: {
    marginBottom: "5px",
  },
  
  eventTitle: {
    fontWeight: "bold",
    fontSize: "14px",
  },
};

const dateOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const CheckTable = (props) => {
  const { columnsData, tableData, title } = props;
  // const[pendingData,setPendingData] = useState(tableData);
  const [selectedItem, setSelectedItem] = useState();
  const [location, setLocation] = useState("");
  const[pharmLocation,setPharmLocation] = useState("")
  const [rowSelected, setRowSelected] = useState(false);
  const[showModal,setShowModal] = useState(false);
  const[currentRow,setCurrentRow] = useState(null);


  const columns = useMemo(() => columnsData, [columnsData]);

  const data = useMemo(() => tableData, [tableData]);
  const pendingData = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;
  console.log("Current Page Data - ",page);
  const handleCheck = (selected) => {
    setSelectedItem(selected?.id);
  };


  const tableColumns = [
    { id: 'orderId', label: 'Order Id', minWidth: 150 },
    { id: 'userLocation', label: 'User Location', minWidth: 250 },
    {
      id: 'pharmacy Location',
      label: 'Pharmacy Location',
      minWidth: 250,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'deliverycode',
      label: 'Delivery Code',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'quantity',
      label: 'Quantity',
      minWidth: 150,
      align: 'left',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'total price',
      label: 'Total Price',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 250,
      align: 'left',
      format: (value) => value.toFixed(2),
    },
  ];
  useEffect(() => {
<<<<<<< main
    const fetchData = async ( latitude, longitude ) => {
      console.log("inside function");
      console.log("latitue", latitude);
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC8z91LrDu6klUBb9BFBG3Zd_v_3kjVTBI&v`
        );

        const addressComponents = response.data.results[0].address_components;
        const city = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        const area = addressComponents.find(
          (component) =>
            component.types.includes("sublocality") ||
            component.types.includes("neighborhood")
        );

        const cityName = city ? city.long_name : "N/A";
        const areaName = area ? area.long_name : "N/A";

        const formattedLocation = `${areaName}, ${cityName}`;
        console.log("formatted Location - ",+areaName + " , "+cityName)
        setLocation(formattedLocation);
      } catch (error) {
        console.error("Error fetching location:", error);
        console.log("Error Code - ",error.code);
        throw error; // Re-throw the error to handle it outside of the fetchData function if needed
      }
=======
    const getAllOrders = () => {
      setLoading(true);
      axios
        .get(`https://api.medstown.com/customer/finalorder`)
        .then((res) => {
          setLoading(false);
          console.log(res.data )
          setOpenOrders(res.data);
          console.log("Data - ", res.data);
        })
        .catch((err) => {
          setLoading(false);  
          console.log(err);
        });
>>>>>>> local
    };

    

<<<<<<< main
=======



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
>>>>>>> local

    const order = pendingData?.find((item) => item);
    fetchData(order?.userLat, order?.userLng);
    // fetchPharmData(order?.pharmacyLat, order?.pharmacyLng)
  }, [pendingData]);

  const handleRowSlected = (selectedRow) => {
    setRowSelected(!rowSelected);
    handleCheck(selectedRow);
  };

  const AdditionalRowContent = ({ data }) => {
    return (
      <tr className="cursor-pointer border">
        <td colSpan={8}>
          <div className="flex w-full items-center justify-between px-5 py-2">
            <div>
              <p className="py-1 text-sm font-semibold">User Name</p>
              <p className="text-sm">username</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">Pharmacy Name</p>
              <p className="text-sm">pharmacy name</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Pharmacy Phone Number
              </p>
              <p className="text-sm">pharmacyPhoneNumber</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Delivery Partner Name
              </p>
              <p className="text-sm">deliveryPartnerName</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Delivery Partner Location
              </p>
              <p className="text-sm">deliveryPartnerLocation</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Delivery Partner Number
              </p>
              <p className="text-sm">deliveryPartnerNumber</p>
            </div>
          </div>
          <div className="bg-gray-50" style={styles?.timeline}>
            {events.map((event, index) => (
              <React.Fragment key={event.id}>
                <div style={styles?.timelineEvent}>
                  <div className="card" style={styles?.eventDate}>
                    {event.date}
                  </div>
                  <div style={styles?.eventTitle}>{event.title}</div>
                </div>
                {index !== events.length - 1 && (
                  <hr
                    className="relative z-10 h-1 w-32"
                    style={{ background: "#014d4d" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </td>
      </tr>
    );
  };

  function handleRowFunction(row){
    setShowModal(true);
    setCurrentRow(row);
    console.log("current row ");
    console.log(row);
  }
  function checkAll(row){
    if(row.orderId!==null){
      return true;
    }
    else{
      return false;
    }
  }

  function checkNull(data1,data2){
   
   
    if(data2){
      if((data1!==null && data1) && (data2!==null && data2)){
        return true;
      }
      if(data1!==null && data1){
        
        return true
       }

       else{
        return false
    }
   
   }
  }
  return (
    // <Card extra={"w-full h-full sm:overflow-auto px-6"}>
    //   <header className="relative flex items-center justify-between pt-4">
    //     <div className="w-full text-center text-xl font-bold text-navy-700 dark:text-white">
    //       {title}
    //     </div>
    //     <CardMenu />
    //   </header>

    //   <div className="mt-8 overflow-x-auto">
    //     {page?.length ? (
    //       <table
    //         {...getTableProps()}
    //         className="w-full pb-5"
    //         variant="simple"
    //         color="gray-500"
    //         mb="24px"
    //       >
    //         <thead>
    //           {headerGroups.map((headerGroup, index) => (
    //             <tr {...headerGroup.getHeaderGroupProps()} key={index}>
    //               {headerGroup.headers.map((column, index) => (
    //                 <th
    //                   {...column.getHeaderProps(column.getSortByToggleProps())}
    //                   className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
    //                   key={index}
    //                 >
    //                   <div
    //                     className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs"
    //                     style={{ width: column.width }}
    //                   >
    //                     {column.render("Header")}
    //                   </div>
    //                 </th>
    //               ))}
    //             </tr>
    //           ))}
    //         </thead>
    //         <tbody {...getTableBodyProps()} className="border">
    //           {page.map((row, index) => {
    //             prepareRow(row);
    //             return (
    //               <>
    //                 <tr
    //                   {...row.getRowProps()}
    //                   key={index}
    //                   // onClick={() => handleCheck(row)}
    //                   className="border"
    //                 >
    //                   {row.cells.map((cell, index) => {
    //                     let data = "";
    //                     if (cell.column.Header === "ORDER Id") {
    //                       data = (
    //                         <div className="flex items-center gap-2">
    //                           <Checkbox
    //                             value={rowSelected}
    //                             handleChange={() => handleRowSlected(row)}
    //                           />
    //                           <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                             {cell.value}
    //                           </p>
    //                         </div>
    //                       );
    //                     } else if (cell.column.Header === "USER NAME") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "USER LOCATION") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {location}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "PHARMACY NAME") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "PHARMACY LOCATION") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (
    //                       cell.column.Header === "PHARMACY PHONE NUMBER"
    //                     ) {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "STATUS") {
    //                       data = (
    //                         <div className="flex items-center gap-2">
    //                           <div className={`rounded-full text-xl`}>
    //                             {cell.value === "accepted" ? (
    //                               <MdCheckCircle className="text-green-500" />
    //                             ) : cell.value === "pending" ? (
    //                               <MdPending className="text-orange-500" />
    //                             ) : cell.value === "Error" ? (
    //                               <MdOutlineError className="text-red-500" />
    //                             ) : null}
    //                           </div>
    //                           <p className="text-sm font-bold capitalize text-navy-700 dark:text-white">
    //                             {cell.value}
    //                           </p>
    //                         </div>
    //                       );
    //                     } else if (
    //                       cell.column.Header === "DELIVERY PARTNER NAME"
    //                     ) {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (
    //                       cell.column.Header === "DELIVERY PARTNER LOCATION"
    //                     ) {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (
    //                       cell.column.Header === "DELIVERY PARTNER NUMBER"
    //                     ) {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "PRICE") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "TOTAL ORDER ITEMS") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "QUANTITY") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "TOTAL PRICE") {
    //                       data = (
    //                         <p className="bg-red-200 text-sm font-bold text-navy-700 dark:text-white">
    //                           {cell.value}
    //                         </p>
    //                       );
    //                     } else if (cell.column.Header === "DATE") {
    //                       data = (
    //                         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //                           {formattedDate(cell.value, dateOptions)}
    //                         </p>
    //                       );
    //                     }
    //                     return (
    //                       <td
    //                         {...cell.getCellProps()}
    //                         key={index}
    //                         className="px-2 pt-[14px] pb-[16px] sm:text-[14px]"
    //                         style={{
    //                           width: `${cell.column.width}px`,
    //                         }}
    //                       >
    //                         {data}
    //                       </td>
    //                     );
    //                   })}
    //                 </tr>
    //                 {selectedItem === row?.id && rowSelected ? (
    //                   <AdditionalRowContent
    //                     key={`additionalRow_${row?.id}`}
    //                     data={row.original}
    //                   />
    //                 ) : null}
    //               </>
    //             );
    //           })}
    //         </tbody>
    //       </table>
    //     ) : (
    //       <div className="flex h-[50vh] w-full items-center justify-center">
    //         <p className="text-sm font-bold text-navy-700 dark:text-white">
    //           No Data Found
    //         </p>
    //       </div>
    //     )}
    //   </div>
    // </Card>
    <>
      <Card>
        <CardContent>
        
    <TableContainer component={Paper}>
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

<Modal
  open={showModal}
  onClose = { ()=>setShowModal(false)}
  aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
<<<<<<< main
>

<Box style={modalStyle}>
        <Card>
          <CardContent>
            <p>You are Viewing Order With Id - {currentRow && currentRow.orderId}</p>
            <StepperComponent data = {currentRow}/>
          </CardContent>
        </Card>
</Box>
=======
      >
       <Box>
       <Stepper data = {orderDetails}/>
       </Box>
      </Modal>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={openOrders.length}
            />
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.orderId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.orderId,row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderId}
                      selected={isItemSelected}
                      style={{padding:8}}
                      
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="normal">
                        {row.orderId}
                      </TableCell>
                      <TableCell align="left">{row.quantity || 1}</TableCell>
                      <TableCell align="left">{row.totalPrice}</TableCell>
                      <TableCell align="left">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={openOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      
    </Box>
>>>>>>> local

</Modal>

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
            {pendingData
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}
                  onClick={()=>handleRowFunction(row)}
                  >
                   <TableCell style={{width:150}} align="left">{(row.orderId)}</TableCell>
                   <TableCell style={{width:250}} align="left">{row.userLng === null && row.userLat===null ? "" :""}</TableCell>
                   <TableCell style={{width:250}} align="left">{row.pharmacyLng ===null && row.pharmacyLat === null ? "" : ""}</TableCell>
                   <TableCell style={{width:150}} align="left">{(row.status) }</TableCell>
                   <TableCell style={{width:150}} align="left"> {1000}</TableCell>
                   <TableCell style={{width:150}} align="left">{(row.quantity)}</TableCell>
                   <TableCell style={{width:150}} align="left">{(row.totalPrice)}</TableCell>
                   <TableCell style={{width:150}} align="left">{correctFormattedDate(row.createdAt)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>

      </Table>
    </TableContainer>

        </CardContent>
      </Card>
    </>
   
  );
};

export default CheckTable;
