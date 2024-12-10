import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, Box, Divider, Stack } from '@mui/material';
import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material'; // Import stepConnectorClasses
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Check from '@mui/icons-material/Check';

// Styled components
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
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { // Fixed: stepConnectorClasses is now imported
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: { // Fixed: stepConnectorClasses is now imported
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: { // Fixed: stepConnectorClasses is now imported
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: { // Fixed: stepConnectorClasses is now imported
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
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
    backgroundColor: '#004d4d',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#004d4d',
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
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

// Timeline Component
const Timeline = ({ data }) => {
  const [activeStep, setActiveStep] = useState(null);
  const [openDialog, setOpenDialog] = useState({ open: false, type: '' });
  const [onAirTime, setOnAirTime] = useState(120); // 2 minutes in seconds
  const [orderTime, setOrderTime] = useState(1800); // 30 minutes in seconds
  const [isInAir, setIsInAir] = useState(false);
  const [isOrderAssigned, setIsOrderAssigned] = useState(false);
  const [airOrderTimeOut, setAirOrderTimeOut] = useState(0);
  const [orderDelivered, setOrderDelivered] = useState(false);
  const [deliverTime, setDeliverTime] = useState(0);
  const [deliveryPartnerDetails, setDeliveryPartnerDetails] = useState(null);
  const [currentPharmacyDetails, setCurrentPharmacyDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
  const [currentPharmacyLocation, setCurrentPharmacyLocation] = useState(null);

  // Fetch details functions
  const fetchDetails = async (id, type) => {
    try {
      const res = await axios.get(`http://localhost:7001/${type}/getDetails/${id}`);
      if (res.data) {
        if (type === 'delivery') {
          setDeliveryPartnerDetails(res.data);
        } else if (type === 'pharmacy') {
          setCurrentPharmacyDetails(res.data.data);
          fetchLocation(res.data.data.location.coordinates[0], res.data.data.location.coordinates[1], true);
        } else if (type === 'customer') {
          setCustomerDetails(res.data);
          fetchLocation(data.userLat, data.userLng);
        }
      }
    } catch (error) {
      console.log('Error occurred while fetching details');
    }
  };

  const fetchLocation = async (lat, lng, isPharm = false) => {
    try {
      const response = await axios.get(`http://localhost:7001/customer/getLocationDetails/${lat}/${lng}`);
      if (response.data) {
        if (isPharm) {
          setCurrentPharmacyLocation(response.data);
        } else {
          setCurrentUserLocation(response.data);
        }
      }
    } catch (error) {
      console.log('Error occurred while fetching location');
    }
  };

  const handleStepClick = (index) => {
    setActiveStep(index === activeStep ? null : index); // Toggle active step
  };

  const closeModal = () => {
    setActiveStep(null); // Close the modal
  };

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

  const steps = [
    {
      label: 'View Order Details',
      isActive: !!data.orderId,
      details: data.orderId ? (
        <>
          <p>Order ID: {data.orderId}</p>
        </>
      ) : null,
    },
    {
      label: 'View Customer Details',
      isActive: !!data.customerId,
      details: data.customerId ? (
        <>
          <p>Customer ID: {data.customerId}</p>
          <p>Customer Name: {customerDetails?.name}</p>
          <p>Customer Phone: {customerDetails?.phone}</p>
        </>
      ) : null,
    },
    {
      label: 'View Pharmacy Details',
      isActive: !!data.pharmacyId,
      details: data.pharmacyId ? (
        <>
          <p>Pharmacy ID: {data.pharmacyId}</p>
          <p>Pharmacy Name: {currentPharmacyDetails?.name}</p>
          <p>Pharmacy Phone: {currentPharmacyDetails?.phone}</p>
        </>
      ) : null,
    },
    {
      label: 'Delivery Partner Details',
      isActive: !!data.deliveryPartnerId,
      details: data.deliveryPartnerId ? (
        <>
          <p>Delivery Partner ID: {data.deliveryPartnerId}</p>
          <p>Name: {deliveryPartnerDetails?.name}</p>
          <p>Phone: {deliveryPartnerDetails?.phone}</p>
        </>
      ) : null,
    },
    {
      label: 'Order Status',
      isActive: true,
      details: (
        <>
          <p>Order Status: {data.orderStatus}</p>
          <p>Delivery Status: {data.deliveryStatus}</p>
        </>
      ),
    },
  ];

  return (
    <>
      <Stepper activeStep={activeStep} connector={<ColorlibConnector />} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              onClick={() => handleStepClick(index)}
              style={{ cursor: 'pointer' }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ width: '100%', padding: 2 }}>
        {steps.map((step, index) => (
          <Box key={index} display={activeStep === index ? 'block' : 'none'}>
            {step.details}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Timeline;
