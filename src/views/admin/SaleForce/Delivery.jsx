import React, { useEffect, useState, useRef, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../../config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputField from "components/fields/InputField";
import { compose, withProps } from "recompose";
import { TextField ,Card,CardContent,Button} from "@mui/material";
import CardActions from '@mui/material/CardActions';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
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

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const Delivery = () => {
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
  const [showMarker, setShowMarker] = useState(false);
  const [searchText, setSearchText] = useState(""); 
  const[currentRow,setCurrentRow] = useState(null);
  const[openModal,setOpenModal] = useState(false);
  const[deliveryPersonDetails,setDeliveryPersonDetails] = useState(null);
  const[updated,setUpdated] = useState({type : '',message:'',open:false});
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getallpharmacies();
  }, []);

  const getallpharmacies = () => {
    axios
      .get(`https://api.medstown.com/delivery/getalldeliveryboy`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };


  function setRowHandler(row){
    setOpenModal(true);
    console.log('Delivery Boy Details - ',row);
     setDeliveryPersonDetails(row.row);
  }

  async function updateDetailsHandler(){
    const id = deliveryPersonDetails._id;
    console.log("Updating current delivery boy details");
    //call update api
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }

    const body = {
     fullname :  deliveryPersonDetails.fullname, 
     phone  : deliveryPersonDetails.phone,
     vehicleNumber : deliveryPersonDetails.vehicleNumber,
     drivingLicense: deliveryPersonDetails.drivingLicense
    }
   try {
    const response = await axios.put(`https://api.medstown.com/delivery/updateDetails/${id}`,body,config);
    if(response.data.status==="success"){
      setUpdated({type : "update",message:"updated details",open:true});
      function removeUpdateState(){
        setTimeout(()=>{
          setUpdated({open:false});
        },3000)
      }
      removeUpdateState();
      setUpdated({open:false});

      //details updated 
      getallpharmacies();

      console.log("updated",updated)

    }else{
      console.log(response.data);
    }
   } catch (error) {
    console.log(error);
   }
  }
  async function deleteDetailsHandler(){
    const id = deliveryPersonDetails._id;

    try {
      const response = await axios.delete(`https://api.medstown.com/delivery/detailDetails/${id}`);
      if(response.data.status==="success"){
        //delete successfully
      setUpdated({type : "deleted",message:"deleted details",open:true});
      function removeUpdateState(){
        setTimeout(()=>{
          setUpdated({open:false});
        },2000)
      }
      removeUpdateState();
        setOpenModal(false);
        getallpharmacies();

        console.log("updated",updated)


      }else{
      console.log(response.data);

      }
    } catch (error) {
      
    }
  }

  const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8z91LrDu6klUBb9BFBG3Zd_v_3kjVTBI&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `300px`, width: "100%" }} />,
      mapElement: <div style={{ height: `100%` }} />,
      data: data,
    }),
    withScriptjs,
    withGoogleMap
<<<<<<< main
  )((props) => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 28.4595, lng: 77.0266 }}>
=======
  )((props) => {

    console.log("Google Map Props - ",props);
    return(<>
    
    <GoogleMap defaultZoom={11} defaultCenter={{ lat: 17.4374837, lng: 78.5158477 }}>
>>>>>>> local
      {props &&props.data&&  props.data.map((item) => (
        <>
          <Marker
            key={item._id}
            position={{
              lat: item.location?.coordinates[0],
              lng: item.location?.coordinates[1],
            }}
            icon={{
              url: "https://usc1.contabostorage.com/f49065475849480fbcd19fb8279b2f98:medstowninternal/delbike.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => {
              setShowMarker(item._id);
            }}
          />
          {showMarker === item._id &&
          <InfoWindow
            position={{
              lat: item.location.coordinates[0],
              lng: item.location.coordinates[1],
            }}
            onCloseClick={() => {
              props.hideInfo();
            }}
          >
            <div>
              <h2>{item.fullname}</h2>
              <p>{item.phone}</p>
            </div>
          </InfoWindow>
          }
        </>
      ))}
    </GoogleMap></>)
  });



  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleButtonClick = (row) => {
    const { latitude, longitude } = row.location.coordinates;
    const googleMapsUrl = `https://www.google.com/maps?q=${row.location.coordinates[0]},${row.location.coordinates[1]}`;
    window.open(googleMapsUrl, '_blank');
  };
  return (
    <div>

 
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <MyMapComponent isMarkerShown />
      </div>
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
            { field: "fullname", headerName: "Name", width: 200 },
            { field: "phone", headerName: "Phone", width: 200 },
            {
              field: "vehicleNumber",
              headerName: "vehicle Number",
              width: 200,
            },
            {
              field: "drivingLicense",
              headerName: "driving License",
              width: 200,
            },
            {
              field: "location",
              headerName: "location",
              width: 200,
              renderCell: (params) => (
                <div>
                  {/* {params && params.location && (
                    <div>
                      <p>{params.location.coordinates[0]}</p>
                      <p>{params.location.coordinates[1]}</p>
                    </div>
                  )} */}

                  <Button
                  onClick={()=>handleButtonClick(params.row)}
                  >View Location</Button>
                </div>
              ),
            }
            
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
          // onRowClick={(row)=>setRowHandler(row)}

        />
      </div>

   {/* Modal block start here to edit or delete delivery boys */}
   <Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <Box style={modalBoxStyle}>
     <Card>
      <CardContent>

     {updated.open ? <>
      <div style={{marginVertical:20}}>
        <p style={{textAlign:"center",color:"green",fontSize:18}}>
          {updated.type ==="update" ? updated.message : updated.message}
        </p>
      </div>
     </>:<></>}
        {deliveryPersonDetails && (<>
          <TextField
            label="Name"
            value={deliveryPersonDetails.fullname}
            className="mt-5"
            style={{marginTop:15}}
            fullWidth={true}
            onChange = {(e)=>setDeliveryPersonDetails((current)=>({
              ...current,
              fullname : e.target.value
            }))}
          />


<TextField
            label="Phone"
            className="mt-5"
            style={{marginTop:15}}

            value={deliveryPersonDetails.phone}
            fullWidth={true}

            onChange = {(e)=>setDeliveryPersonDetails((current)=>({
              ...current,
              phone : e.target.value
            }))}
          />


<TextField
            label="Vehicle Number"
            className="mt-5"

            value={deliveryPersonDetails.vehicleNumber}
            fullWidth={true}
            style={{marginTop:15}}

            onChange = {(e)=>setDeliveryPersonDetails((current)=>({
              ...current,
              vehicleNumber : e.target.value
            }))}
          />


          
<TextField
            label="Driving License"
            className="mt-5"
            style={{marginTop:15}}

            value={deliveryPersonDetails.drivingLicense}
            fullWidth={true}

            onChange = {(e)=>setDeliveryPersonDetails((current)=>({
              ...current,
              drivingLicense : e.target.value
            }))}
          />

        </>)}
      </CardContent>

      <CardActions style={{display:"flex",justifyContent:"flex-end",marginVertical:30}}>
            <Button variant="contained" color="info"
            onClick={updateDetailsHandler}>Update Details</Button>
            <Button variant="contained" color="error"
            onClick={deleteDetailsHandler}>Delete Details</Button>
      </CardActions>
     </Card>
    </Box>

      </Modal>
{/* Modal block ends here to edit or delete delivery boys */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={modalBoxStyle}>
          {/* create input fields */}
          <div className="sticky -top-10 z-50 mb-5 flex h-14 items-center justify-between bg-white px-1">
            <h4 className="text-2xl font-bold">Edit Pharmacy now</h4>
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
          {/* <div className="flex justify-end mt-5">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md" onClick={submitDetails}>
              Submit
            </button>
          </div> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Delivery;
