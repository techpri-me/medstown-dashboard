import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../../config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputField from "components/fields/InputField";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
<<<<<<< main
import { Alert, TextField } from "@mui/material";

=======
import { Alert, Button, Card, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import PharmacyDetails from "./components/PharmacyDetails";
>>>>>>> local
const style = {
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
const style1 = {
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
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = useState("");
  const [bussinessName, setBussinessName] = useState("");
  const [bussinessRegNo, setBussinessRegNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [medicalLicenseNo, setMedicalLicenseNo] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [dateOfMedicalLicense, setDateOfMedicalLicense] = useState("");
  const [businessTiming, setBusinessTiming] = useState("");
  const [location, setLocation] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");
  const handleClose = () => setOpen(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [storeParams, setStoreParams] = useState(null); //[{}
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

 

  const handleDeleteClose = () => setDeleteOpen(false);
  const handelDeleteOpen = (params) => {
    setDeleteOpen(true);
    console.log(params.row);
    setStoreParams(params);
  };
  useEffect(() => {
    getallpharmacies();
  }, []);

  const getallpharmacies = () => {
    axios
      .get(`https://api.medstown.com/pharmacy/getpharmacy`)
      .then((res) => {
<<<<<<< main
        setData(res.data.reverse());
=======
        console.log("Loaded Data Of All Pharamacies");
        setData(res.data.pharmacies);
        console.log(res.data);
>>>>>>> local
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditPharmacy = (data) => {
    setOpen(true);
    console.log(data.row);
    setFullName(data.row.fullName);
    setBussinessName(data.row.bussinessName);
    setBussinessRegNo(data.row.bussinessRegNo);
    setGstNo(data.row.gstNo);
    setMedicalLicenseNo(data.row.medicalLicenseNo);
    setAddress(data.row.address);
    setPincode(data.row.pincode);
    setBusinessPhone(data.row.businessPhone);
    setOwnerPhone(data.row.ownerPhone);
    setEmail(data.row.email);
    setDateOfRegistration(data.row.dateOfRegistration);
    setDateOfMedicalLicense(data.row.dateOfMedicalLicense);
    setBusinessTiming(data.row.businessTiming);
    setLocation(data.row.location);
    setPharmacyId(data.row.pharmacyId);
  };
  const submitDetails = () => {
    const data = {
      fullName,
      bussinessName,
      bussinessRegNo,
      gstNo,
      medicalLicenseNo,
      address,
      pincode,
      businessPhone,
      ownerPhone,
      email,
      dateOfRegistration,
      dateOfMedicalLicense,
      businessTiming,
      location,
      pharmacyId,
    };
    axios
      .post(`${config.api}/editpharmacy`, data)
      .then((res) => {
        console.log(res);
        getallpharmacies();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(pharmacyId, "data");
  }, [
    fullName,
    bussinessName,
    bussinessRegNo,
    gstNo,
    medicalLicenseNo,
    address,
    pincode,
    businessPhone,
    ownerPhone,
    email,
    dateOfRegistration,
    dateOfMedicalLicense,
    businessTiming,
    location,
  ]);

  const deletePharmacy = (data) => {
    console.log(data.row.pharmacyId);
    axios
      .post(`${config.api}/deletepharmacy`, { pharmacyId: data.row.pharmacyId })
      .then((res) => {
        console.log(res);
        getallpharmacies();
        handleDeleteClose();
      })
      .catch((err) => {
        console.log(err);
        handleDeleteClose();
      });
  };
<<<<<<< main
function setRowHandler(row){
  console.log(row);
}
=======
  function setRowHandler(row) {
    console.log("Clicked on data grid row")
    console.log(row);
    setOpen(true);
    setCurrPharmacyDetails(row.row)

    setFullName(row.row.fullName);
    setAddress(row.row.address);
    setGstNo(row.row.gstNo);
    setDateOfMedicalLicense(row.row.dateOfMedicalLicense);
    setBusinessPhone(row.row.businessPhone);
    setEmail(row.row.email);
    setOwnerPhone(row.row.ownerPhone);
    setBussinessName(row.row.bussinessName);
    setBussinessRegNo(row.row.bussinessRegNo);
    setDateOfRegistration(row.row.dateOfRegistration);
    setMedicalLicenseNo(row.row.medicalLicenseNo);
    setPincode(row.row.pincode);

  }


  // const filteredRows = data.filter((row) =>
  //   Object.values(row).some(
  //     (value) =>
  //       value &&
  //       value.toString().toLowerCase().includes(searchText.toLowerCase())
  //   )
  // );
  async function fetchPharmacyDetails() {
    try {
      const res = await axios.get("http://localhost:7001/admin/getMoreInfo/" + currPharmacyDetails.pharmacyId);
      if (res.data) {
        console.log("Pharmacy More Info");
        console.log(res.data.data);
        setPharmacyMoreInfo(res.data.data)
      }
    } catch (error) {
      console.log("Error Occurred while fetching pharmacy details")
    }
  }
  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
>>>>>>> local
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
            { field: "bussinessName", headerName: "Name", width: 200 },
            { field: "businessPhone", headerName: "Phone", width: 200 },
            { field: "fullName", headerName: "Owner Name", width: 200 },
            { field: "address", headerName: "Address", width: 200 },
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
            { field: "gstNo", headerName: "GST No", width: 200 },
            {
              field: "medicalLicenseNo",
              headerName: "Medical License No",
              width: 200,
            },
            { field: "pincode", headerName: "Pincode", width: 200 },
            {
              field: "businessTiming",
              headerName: "Business Timing",
              width: 200,
              renderCell: (params) => (
                <div className="flex items-center">
                  {params.row.businessTiming.map((item) => (
                    <div className="flex flex-col">
                      <span>Start: {item.start} AM</span>
                      <span>End: {item.end} PM</span>
                    </div>
<<<<<<< main
                  ))}
                </div>
              ),
            },
            {
              field: "location",
              headerName: "Location",
              width: 200,
              renderCell: (params) => (
                <div className="flex items-center">
                  <FiExternalLink
                    size={24}
                    className="cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${params.row.address}${params.row.pincode}`
                      )
                    }
                  />
                </div>
              ),
            },
            {
              field: "Action",
              headerName: "Action",
              width: 200,
              renderCell: (params) => (
                <div className="flex items-center">
                  <BiPencil
                    size={18}
                    onClick={() => EditPharmacy(params)}
                    className="mr-7 cursor-pointer hover:text-blue-500"
                  />
                  <AiFillDelete
                    size={18}
                    onClick={() => handelDeleteOpen(params)}
                    className="mr-7 cursor-pointer hover:text-red-500"
                  />
                  {/* <AiFillEye size={18} className="cursor-pointer" onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${params.row.address}${params.row.pincode}`)} /> */}
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
          onRowClick={(row)=>setRowHandler(row)}
        />
      </div>
=======
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
              onRowClick={(row) => setRowHandler(row)}
            />

           
          </div>
        </>
      }
>>>>>>> local
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
<<<<<<< main
        <Box sx={style}>
          {/* create input fields */}
=======
        <Box style={buttonContainer}>

          <div style={buttonInnerStyle}>
        <p style={closeIcon}>Close Icon</p>


       <Button variant="contained" color="info"
       onClick={()=>setViewPharmacyDetails(true)}
       >View Pharmacy</Button>


       <Button variant="contained" color="success"
       onClick={()=>setPharmacyPayouts(true)}
       >Edit Pharmacy</Button>


       <Button variant="contained" color="info"
        onClick={()=>setViewPharmacyBankDetails(true)}
       >View Pharmacy Bank Details</Button>


       <Button variant="contained" color="secondary"
       onClick={()=>setViewPharmacyOrders(true)}
       >View Orders</Button>


       <Button variant="contained" color="warning"
          onClick={()=>setPharmacyPayouts(true)}
       >View Pharmacy Payouts</Button>
       </div>

        </Box>
        {/* Edit Pharmacy Starts */}
        {/* <Box sx={style}>
         
>>>>>>> local
          <div className="sticky -top-10 z-50 mb-5 flex h-14 items-center justify-between bg-white px-1">
            <h4 className="text-2xl font-bold">Edit Pharmacy</h4>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputField
              label="Bussiness Name"
              value={bussinessName}
              onChange={(e) => setBussinessName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Bussiness Reg No"
              value={bussinessRegNo}
              onChange={(e) => setBussinessRegNo(e.target.value)}
            />
            <InputField
              label="GST No"
              value={gstNo}
              onChange={(e) => setGstNo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Medical License No"
              value={medicalLicenseNo}
              onChange={(e) => setMedicalLicenseNo(e.target.value)}
            />
            <InputField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <InputField
              label="Business Phone"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Owner Phone"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
            />
            <InputField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Date Of Registration"
              value={dateOfRegistration}
              onChange={(e) => setDateOfRegistration(e.target.value)}
            />
            <InputField
              label="Date Of Medical License"
              value={dateOfMedicalLicense}
              onChange={(e) => setDateOfMedicalLicense(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            {/* <InputField
            label="Business Timing"
            value={businessTiming}
            onChange={(e) => setBusinessTiming(e.target.value)}
          />
          <InputField
            label="Location"
            value={JSON.stringify(location)}
            onChange={(e) => setLocation(e.target.value)}
          /> */}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              className="rounded-md bg-blue-500 px-5 py-2 text-white"
              onClick={submitDetails}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <div className="sticky -top-10 z-50 mb-5 flex h-14 items-center justify-between bg-white px-1">
            <h4 className="text-2xl font-bold">
              Are you sure you want to delete this pharmacy?
            </h4>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              className="rounded-md bg-blue-500 px-5 py-2 text-white"
              onClick={handleDeleteClose}
            >
              No
            </button>
            <button
              className="ml-5 rounded-md bg-red-500 px-5 py-2 text-white"
              onClick={() => deletePharmacy(storeParams)}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SaleForce;
