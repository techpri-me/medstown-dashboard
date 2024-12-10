import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputField from "components/fields/InputField";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { TextField, Button, Alert } from "@mui/material";

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

const DeliveryDetails = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [storeParams, setStoreParams] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showMarker, setShowMarker] = useState(null);

  // State for Delivery Partner Details
  const [deliveryDetails, setDeliveryDetails] = useState({
    partnerId: "",
    fullname: "",
    phone: "",
    vehicleNumber: "",
    drivingLicense: "",
    address: "",
  });

  useEffect(() => {
    getAllDeliveryPartners();
  }, []);

  const getAllDeliveryPartners = () => {
    axios
      .get(`https://api.medstown.com/delivery/getalldeliveryboy`)
      .then((res) => {
        // Add _id as id for DataGrid
        const rows = res.data.map(item => ({
          ...item,
          id: item._id
        }));
        setData(rows);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDeleteOpen = (partnerId) => {
    setDeleteOpen(true);
    setStoreParams(partnerId);
  };

  const handleEditDeliveryPartner = (row) => {
    setOpen(true);
    setDeliveryDetails({
      partnerId: row.partnerId,
      fullname: row.fullname,
      phone: row.phone,
      vehicleNumber: row.vehicleNumber,
      drivingLicense: row.drivingLicense,
      address: row.address,
    });
  };

  console.log(deliveryDetails)

  const handleSubmitDetails = () => {
    
    axios.put
      (
        `https://api.medstown.com/delivery/updatedeliveryuser/${deliveryDetails.partnerId}`,
        deliveryDetails
      )
      .then(() => {
        console.log("gg")
        getAllDeliveryPartners();
        handleClose();
      })
      .catch((err) => {
        console.error(err);

      });
  };

  const handleDeleteDeliveryPartner = (partnerId) => {
    axios
      .get(`https://api.medstown.com/delivery/deletedelvaryuser/${partnerId}`)
      .then(() => {
        getAllDeliveryPartners();
        handleDeleteClose();
      })
      .catch((err) => {
        console.error(err);
        handleDeleteClose();
      });
  };




  const MyMapComponent = withScriptjs(withGoogleMap((props) => (
    <GoogleMap defaultZoom={11} defaultCenter={{ lat: 17.4374837, lng: 78.5158477 }}>
      {props.data && props.data.map((item) => (
        <React.Fragment key={item._id}>
          <Marker
            position={{ lat: item.location?.coordinates[0], lng: item.location?.coordinates[1] }}
            icon={{
              url: "https://usc1.contabostorage.com/f49065475849480fbcd19fb8279b2f98:medstowninternal/delbike.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => setShowMarker(item._id)}
          />
          {showMarker === item._id &&
            <InfoWindow
              position={{ lat: item.location.coordinates[0], lng: item.location.coordinates[1] }}
              onCloseClick={() => setShowMarker(null)}
            >
              <div>
                <h2>{item.fullname}</h2>
                <p>{item.phone}</p>
              </div>
            </InfoWindow>
          }
        </React.Fragment>
      ))}
    </GoogleMap>
  )));










  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">

      <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8z91LrDu6klUBb9BFBG3Zd_v_3kjVTBI&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `300px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
          data={data}
        />

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
            { field: "partnerId", headerName: "ID", width: 200 },
            { field: "fullname", headerName: "Name", width: 200 },
            { field: "phone", headerName: "Contact", width: 150 },
            {
              field: "vehicleNumber",
              headerName: "Vehicle Number",
              width: 150,
            },
            {
              field: "drivingLicense",
              headerName: "Driving License No.",
              width: 250,
            },
            {
              field: "Action",
              headerName: "Action",
              width: 200,
              renderCell: (params) => (
                <div className="flex items-center">
                  <BiPencil
                    size={18}
                    onClick={() => handleEditDeliveryPartner(params.row)}
                    className="mr-7 cursor-pointer hover:text-blue-500"
                  />
                  <AiFillDelete
                    size={18}
                    onClick={() => handleDeleteOpen(params.row.partnerId)}
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
          getRowId={(row) => row.id} // Ensure this matches the id field you set
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      {/* Edit Delivery Partner Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="sticky -top-10 z-50 mb-5 flex h-14 items-center justify-between bg-white px-1">
            <h4 className="text-2xl font-bold">Edit Delivery Partners</h4>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="PartnerId"
              value={deliveryDetails.partnerId}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  partnerId: e.target.value,
                })
              }
            />
            <InputField
              label="Full Name"
              value={deliveryDetails.fullname}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  fullname: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Phone No."
              value={deliveryDetails.phone}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  phone: e.target.value,
                })
              }
            />
            <InputField
              label="Vehicle Number"
              value={deliveryDetails.vehicleNumber}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  vehicleNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Driving License No"
              value={deliveryDetails.drivingLicense}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  drivingLicense: e.target.value,
                })
              }
            />
            <InputField
              label="Address"
              value={deliveryDetails.address}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  address: e.target.value,
                })
              }
            />
          </div>
          <Box className="flex justify-end">
            <Button
              onClick={handleSubmitDetails}
              variant="contained"
              color="primary"
              className="mr-2"
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Delivery Partner Modal */}
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <h4 className="text-2xl font-bold">Delete Delivery Partner</h4>
          <p>Are you sure you want to delete this delivery partner?</p>
          <Box className="flex justify-end mt-4">
            <Button
              onClick={() => handleDeleteDeliveryPartner(storeParams)}
              variant="contained"
              color="error"
              className="mr-2"
            >
              Delete
            </Button>
            <Button onClick={handleDeleteClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeliveryDetails;

