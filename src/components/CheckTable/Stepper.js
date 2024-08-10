

import MyLocation from "Contextapi/MyLocation";
import React, { useState } from "react";

const Timeline = ({ data }) => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      label: "View Order Details",
      isActive: !!data.orderId,
      details: data.orderId ? (
        <>
        <p>Order ID : {data.orderId}</p>
        {/* <p>Order ID : {data.}</p>
        <p>Order ID : {data.orderId}</p> */}
        </>
      ) : null,
    },

    {
      label: "View Customer Details",
      isActive: !!data.customerId,
      details: data.customerId ? (
        <>
          <p>Customer ID: {data.customerId}</p>
          <p>Customer Name: {data.customerName}</p>
          <p>Customer Phone: {data.customerPhone}</p>
           <p>Customer Address:</p> 
          <MyLocation
                        latitude={data?.userLat}
                        longitude={data?.userLng}
                      />
          {/* Add more pharmacy-related details as needed */}
        </>
      ) : null,
    },

    {
      label: "View Pharmacy Details",
      isActive: !!data.pharmacyId,
      details: data.pharmacyId ? (
        <>
          <p>Pharmacy ID: {data.pharmacyId}</p>
          <p>Pharmacy Name: {data.pharmacyName}</p>
          <p>Pharmacy Phone: {data.pharmacyPhone}</p>
           <p>Pharmacy Address: {data.pharmacyAddress}</p> 
          <MyLocation
                        latitude={data?.pharmacyLng}
                        longitude={data?.pharmacyLat}
                      />
          {/* Add more pharmacy-related details as needed */}
        </>
      ) : null,
    },
    // {
    //   label: 'View Payment',
    //   isActive: !!data.paymentType,
    //   details: data.paymentType ? `Payment Type: ${data.paymentType}` : null,
    // },
    {
      label: "Order Delivery ",
      isActive: !!data.deliveryBoyId,
      details: data.deliveryBoyId ? (
        <>
          <p>Delivery ID: {data.deliveryBoyId}</p>
          <p>Delivery Name: {data.deliveryBoyName}</p>
          <p>Delivery Phone: {data.deliveryBoyPhone}</p>
          <p>Delivery Price: {data.deliveryPrice}</p>
          <p>Delivery Address: {data.pharmacyAddress}</p>
        </>
      ) : null,
    },
    {
      label: "Order Delivered",
      isActive: data.status === "Delivered",
      details: data.status === "Delivered" ? `Status: ${data.status}` : null,
    },
  ];

  const handleStepClick = (index) => {
    setActiveStep(index === activeStep ? null : index); // Toggle active step
  };

  const closeModal = () => {
    setActiveStep(null); // Close the modal
  };

<<<<<<< main

const CustomizedSteppers =({data})=>{

    const[openDialog,setOpenDialog] = useState({
        open : false,
        type : ''
    });


    const [onAirTime, setOnAirTime] = useState(120); // 2 minutes in seconds
    const [orderTime, setOrderTime] = useState(1800); // 30 minutes in seconds

    const [isInAir, setIsInAir] = useState(false);
    const [isOrderAssigned, setIsOrderAssigned] = useState(false);
    const[airOrderTimeOut,setAirOrderTimeOut] = useState(0);
    const[orderDelivered,setOrderDelivered] = useState(false);
    const[deliverTime,setDeliverTime] = useState(0);
    const[deliveryPartnerDetails,setDeliveryPartnerDetails] = useState(null)
    const[currentPharmacyDetails,setCurrentPharmacyDetails] = useState(null);
    const[customerDetails,setCustomerDetails] = useState(null);
    const[currentUserLocation,setCurrentUserLocation] = useState(null);
    const[currentPharmacyLocation,setCurrentPharmacyLocation] = useState(null);
    // Timers for "in air" and "order assigned"

    async function viewDeliverPartner(){
      const id = data.deliveryBoyId;
      setOpenDialog({ open: true, type: 'delivery person' });
      try {
        const res = await axios.get(`http://localhost:7001/delivery/getDetails/${id}`);
      if(res.data){
        setDeliveryPartnerDetails(res.data);
      }
      } catch (error) {
        console.log("error occurred")
      }
    }
    async function handlePharmacyDetails(){
      setOpenDialog({ open: true, type: 'Pharm' });
      const id = data.pharmacyId;
      try {
          const response = await axios.get(`http://localhost:7001/admin/getPharmacy/${id}`);
          if(response.data.status==="success"){
            setCurrentPharmacyDetails(response.data.data);
            console.log("pharmacy details ",response.data.data);
            fetchLocation(response.data.data.location.coordinates[0],response.data.data.location.coordinates[1],true)
          }
      } catch (error) {
        console.log("Error Occurred while fetching pharmacy details")
      }
    }

    async function fetchLocation(lat,lng,isPharm){
      
      console.log("inside fetch location ")
      console.log("pharm location ",data.pharmacyLat,data.pharmacyLng)
      console.log("lat - ",lat+" long - "+lng);
      try {
        const response = await axios.get(`http://localhost:7001/customer/getLocationDetails/${lat}/${lng}`);
        console.log("location name ", response);
          if(response.data){
            
            if(isPharm){
              setCurrentPharmacyLocation(response.data)
            }else{
              setCurrentUserLocation(response.data);
            }
          }
      } catch (error) {
        console.log("Error Occurred")
      }
    }

    async function handleOrderDetails(){
      console.log("Fetching Customer Details");
      setOpenDialog({ open: true, type: 'Order' })
      const id = data.customerId;
      try{
        const response = await axios.get(`http://localhost:7001/customer/getUser/${id}`);
        console.log("response",response.data);
        if(response.data){
          setCustomerDetails(response.data);
          console.log('data ---',response.data);
      console.log(" fetch location before")
      console.log("lattitude - ",data.userLat)
          fetchLocation(data.userLat,data.userLng);
        }
      }catch(err){
        console.log("Error Occurred while fetching customer details")

      }
    }
    useEffect(() => {
        let onAirInterval;
        if (isInAir) {
            onAirInterval = setInterval(() => {
                setOnAirTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(onAirInterval);
            setOnAirTime(120); // Reset timer
        }

        return () => {
            clearInterval(onAirInterval);
        };
    }, [isInAir]);

    useEffect(() => {
        let orderInterval;
        if (isOrderAssigned) {
            orderInterval = setInterval(() => {
                setOrderTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(orderInterval);
            setOrderTime(1800); // Reset timer
        }

        return () => {
            clearInterval(orderInterval);
        };
    }, [isOrderAssigned]);
    // const[onAirTimer,setOnAirTimer] = useState(0);
    // const[orderTimer,setOrderTimer] = useState(0);
    const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
          color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
          color: '#784af4',
          zIndex: 1,
          fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        },
      }));
      
      function QontoStepIcon(props) {
        const { active, completed, className } = props;
      
        return (
          <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
              <Check className="QontoStepIcon-completedIcon" />
            ) : (
              <div className="QontoStepIcon-circle" />
            )}
          </QontoStepIconRoot>
        );
      }
      
      QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
      };
      
      const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
          top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`&.${stepConnectorClasses.completed}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`& .${stepConnectorClasses.line}`]: {
          height: 3,
          border: 0,
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
          borderRadius: 1,
        },
      }));
      
      const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
          backgroundColor:
            '#004d4d',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
          backgroundColor:
            '#004d4d',
        }),
      }));
      
      function ColorlibStepIcon(props) {
        const { active, completed, className } = props;
      
        const icons = {
          1: <MedicalServicesIcon />,
          2: <MedicalServicesIcon />,
          3: <MedicalServicesIcon />,
          4: <MedicalServicesIcon />,
          5: <MedicalServicesIcon />,
          6: <MedicalServicesIcon />,
        };
      
        return (
          <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
          </ColorlibStepIconRoot>
        );
      }
      
      ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
      };
      
      const steps = [
        {
            details: (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Order Details</p>
                    <Button size="small" onClick={handleOrderDetails}>
                        View Order Details
                    </Button>
                </div>
            ),
        },
        {
            details: (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>In Air</p>
                    {/* Display air time if the order is in air */}
                    {(isInAir || isOrderAssigned || orderDelivered) && (
                        <p>{Math.floor(onAirTime / 60)} minutes {onAirTime % 60} seconds remaining</p>
                    )}
                    <Button size="small">No</Button>
                </div>
            ),
        },
        {
            details: (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Accepted by Pharmacy</p>
                    <Button size="small" onClick={handlePharmacyDetails}>
                        Pharmacy Details
                    </Button>
                </div>
            ),
        },
        {
            details: (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Assigned Delivery Partner</p>
                    {/* Display order time if the order is assigned but not yet delivered */}
                    {isOrderAssigned && !orderDelivered && (
                        <p>{Math.floor(orderTime / 60)} minutes {orderTime % 60} seconds remaining</p>
                    )}
                    <Button size="small" onClick={viewDeliverPartner}>
                       View Delivery Partner
                    </Button>
                </div>
            ),
        },
        // {
        //     details: (
        //         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        //             <p>Order Picked</p>
        //             <Button size="small" onClick={() => setOpenDialog({ open: true, type: 'location' })}>
        //                 View location
        //             </Button>
        //         </div>
        //     ),
        // },
        // {
        //     details: (
        //         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        //             <p>Order Delivered</p>
        //             {/* Display delivery time if the order has been delivered */}
        //             {orderDelivered && (
        //                 <p>{Math.floor(deliverTime / 60)} minutes {deliverTime % 60} seconds</p>
        //             )}
        //             <Button size="small" onClick={() => setOpenDialog({ open: true, type: 'otp' })}>
        //                 View OTP
        //             </Button>
        //         </div>
        //     ),
        // },
    ];
    



function AssignOrderHandler(){
  setAirOrderTimeOut(onAirTime);
  setIsInAir(false);
  setIsOrderAssigned(true);
}


function DeliverOrderHandler(){
  setDeliverTime(orderTime);
  setOrderDelivered(true);

}




  return (
    <Stack sx={{ width: '100%' ,marginTop:20}} spacing={4}>
     
<div style={{position:"relative",display:"flex",flexDirection:"row",justifyContent:"space-between",padding:20,marginTop:-60}}>
<div>
{isInAir && onAirTime}
{/* {!isInAir && onAirTime > 1 && <p>Order Picked Up By Pharm at : {Math.floor(airOrderTimeOut/60)+":"+(airOrderTimeOut%60)}</p>} */}
<p style={{marginVertical:10}}>Order Accepted by Pharmacy at : 10:50:10 AM</p>
<p>Total Time Taken For Delivery : 29 Minutes 10 s</p>
{!isInAir && isOrderAssigned && !orderDelivered&& orderTime}
{!isInAir && isOrderAssigned && orderDelivered && <p>Total Time left for Delivery - {Math.floor(deliverTime/60)+":"+(deliverTime%60)}</p>}
</div>

<div>
<p style={{fontSize:20,color:"green"}}>Order Value - ₹{data.totalPrice}/-</p>
<p>OTP : 73291</p>
</div>

</div>
      <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label.details}</StepLabel>

          </Step>
        ))}
      </Stepper>

      <Dialog open={openDialog.open} onClose={()=>setOpenDialog({open:false})}>
        <DialogTitle>Details</DialogTitle>
            {openDialog.type === "Order"&& (<Box sx={{minWidth:400,px:4}}>
              <p style={{marginVertical:10,fontSize:18}}>Customer Details</p>
            
                <p>Order Id : {data.orderId}</p>
                <p>Customer Id : {data.customerId?data.customerId :"Not Found"}</p>
                {customerDetails && (<>
                    <p>Name : {customerDetails.fullName}</p>
                    <p>Mobile : {customerDetails.phone}</p>
                    <p>Email : {customerDetails.email}</p>
                    <p>Location : {currentUserLocation&&currentUserLocation}</p>
                </>)}

                {customerDetails===null && (<>
                  <p style={{marginTop:10}}>Customer Details Not Found</p>
                </>)}
                {/* <p>{data.orderDetails.length}</p> */}
                <p>
                </p>
                {data.orderDetails.length>0 &&(<>
                <p style={{marginTop:10,fontSize:18}}>Order Details</p>
                    {data.orderDetails.map((order,index)=>{
                        return(<div style={{marginTop:15}}>
                            <p>Medicine Name - {order.medicineName}</p>
                            <p>Medicine Id - {order.medicineId}</p>
                            <p>Medicine Price - {order.medicinePrice}</p>
                            <p>Medicine Quantity - {order.medicineQuantity}</p>
                            {index<=data.orderDetails.length-1 ? <>
                              <Divider/>
                            </> : <></>}
                        </div>)
                    })}
                </>)}
                <p style={{marginTop:15,color:"green", fontSize:20}}>Total Price - {data.totalPrice}</p>
            </Box>)}

            {openDialog.type === "Pharm"&& currentPharmacyDetails && (<Box sx={{minWidth:400,px:4,padding:5,gap:3,display:"flex",flexDirection:"column"}}>
                <p>Pharmacy ID : {data.pharmacyId}</p>
                <p>Pharmacy Name : {currentPharmacyDetails.fullName}</p>
                <p>Pharmacy Email : {currentPharmacyDetails.email}</p>
                <p>Address : {currentPharmacyLocation&&currentPharmacyLocation}</p>
                <p>Business Phone : {currentPharmacyDetails.businessPhone}</p>
                <p>Owner Phone : {currentPharmacyDetails.ownerPhone}</p>
            </Box>)}


            {openDialog.type === "delivery person"&& deliveryPartnerDetails && (<Box sx={{minWidth:400,px:4,padding:5,gap:3,display:"flex",flexDirection:"column"}}>
                <p>Delivery Partner ID : {deliveryPartnerDetails.partnerId!=='' ? deliveryPartnerDetails.partnerId:'NA'}</p>
                <p>Delivery Partner Name : {deliveryPartnerDetails.fullName}</p>
                <p>Delivery Partner License : {deliveryPartnerDetails.drivingLicense}</p>
                <p>Delivery Partner Vehicle Number : {deliveryPartnerDetails.vehicleNumber}</p>
                <p>Delivery Partner Phone : {deliveryPartnerDetails.phone}</p>
            </Box>)}


            
            {openDialog.type === "delivery person"&& deliveryPartnerDetails===null && (<Box sx={{minWidth:400,px:4,padding:5,gap:3,display:"flex",flexDirection:"column"}}>
                {/* <p>Delivery Partner ID : {deliveryPartnerDetails.partnerId!=='' ? deliveryPartnerDetails.partnerId:'NA'}</p>
                <p>Delivery Partner Name : {deliveryPartnerDetails.fullName}</p>
                <p>Delivery Partner License : {deliveryPartnerDetails.drivingLicense}</p>
                <p>Delivery Partner Vehicle Number : {deliveryPartnerDetails.vehicleNumber}</p>
                <p>Delivery Partner Phone : {deliveryPartnerDetails.phone}</p> */}

                <p>Name : Goutham</p>
                <p>Phone : +91 1234567890</p>
                <p>Vehicle Number : TS 01 1234</p>
                <p>License  : RTX12HK</p>
                <p>Location : H.No : 123, Chintal , Bala Nagar</p>

            </Box>)}
          <Button onClick={()=>setOpenDialog({open: false})} color="primary">
            Close
          </Button>
      </Dialog>

      
    </Stack>
=======
  return (
    <div className="mt-20 ml-7 mr-7 bg-[#ffff] p-12">
      <h1 className="text-center text-xl">
        Order Accepted by Pharmacy at  
      || Date: {new Date(data.createdAt).toLocaleDateString()} ||
        Time : {new Date(data.createdAt).toLocaleTimeString()}
      </h1>

      <div className="mt-5 flex-col">
        <p>
          Order Status:{" "}
          <span style={{ color: "#004d4d", fontWeight: "bold" }}>
            {data.status}
          </span>
        </p>
        <p>Confirm OTP: {data.otpValue}</p>
      </div>

      <div className="relative mt-10 flex justify-between">
        <div className="absolute inset-x-0 top-1/2 z-0 h-px bg-gray-300"></div>

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            <div
              onClick={() => handleStepClick(index)}
              className={`mb-2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full ${
                step.isActive ? "bg-[#004d4d]" : "bg-gray-400"
              }`}
            >
              <span className="font-bold text-white">{`Step ${
                index + 1
              }`}</span>
            </div>
            <p>{step.label}</p>
          </div>
        ))}
      </div>

      {activeStep !== null && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="relative w-full max-w-lg rounded bg-white p-8 shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 rounded-full bg-gray-200 p-2 text-2xl text-gray-600 hover:bg-gray-300 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="mb-4 text-xl font-bold">
              {steps[activeStep].label}
            </h2>
            <div>{steps[activeStep].details}</div>
          </div>
        </div>
      )}
    </div>
>>>>>>> local
  );
};

export default Timeline;
