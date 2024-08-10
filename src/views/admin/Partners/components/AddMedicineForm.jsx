import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const BACKEND_API_URL = "http://localhost:7001"
const AddMedicineForm = ({updateModal,modalData}) => {
  const[medicineDetails,setMedicineDetails] = useState({
    medicineName : '',
    medicineType : '',
    medicinePrice:"",
    medicineCompany:"",
    medicineQuantity:0,
    medicineImage:[],
    medicineLeaf:"",
    medicineDescription:"",
    rxRequired:false,
    disease:""


  });
  const[updateMedicineDetails,setUpdateMedicineDetails] = useState({
    medicineName : modalData.medicineName,
    medicineType : modalData.medicineType,
    medicinePrice: modalData.medicinePrice,
    medicineCompany: modalData.medicineCompany,
    medicineQuantity:modalData.medicineQuantity,
    medicineLeaf:modalData.medicineLeaf,
    medicineDescription:modalData.medicineDescription,
    rxRequired:modalData.rxRequired,
    disease:modalData.disease,
    medicineId : modalData.medicineId,
    verified : modalData.verified,
    dateOfUpdate : Date.now(),
    type: modalData.type
  })
  const [selectedFiles, setSelectedFiles] = useState([]);
  const[medicineImages,setMedicineImages] = useState([]); 
  const[loading,setLoading] = useState(false);
  // const[imagesUploaded,setImageUploaded] = useState(false);
  const[currentMedicineUrl,setCurrentMedicineUrls] = useState([]);
  const[showSuccess,setShowSuccess] = useState(false);
  const[medicineAdded,setMedicineAdded] = useState(false);
  const[responseMessage,setResponseMessage] = useState(false);

  //update logics
  const[medicineUpdated,setMedicineUpdated] = useState(false);
  const handleFileChange = (event) => {
    console.log("File Event - "+event);
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      console.log("selected images - ",files);
      setMedicineImages([...medicineImages,...files])

     

    }
  };
  function handleUploadImages(){
          uploadImage(medicineImages);

  }
  const uploadImage = async (imageFiles) => {
    // Define your Cloudinary upload preset and URL
    const uploadPreset = 'freu3elv';
    const cloudName = 'df7u8xpms';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    // Create an array to hold the image URLs
    const uploadedImageUrls = [];
    setLoading(true); // Set loading state to true
    // Iterate through each file and upload it to Cloudinary
    for (const file of imageFiles) {
        // Create a FormData instance for each file
        const formData = new FormData();
        formData.append("file", file);
        formData.append('upload_preset', uploadPreset);

        try {
            // Make a POST request to Cloudinary
            const response = await axios.post(url, formData);
            
            // The response contains the URL of the uploaded image
            console.log('Image uploaded successfully:', response.data.secure_url);

            // Add the uploaded image URL to the list
            setMedicineDetails((current)=>({
            ...current,
            medicineImage: [...current.medicineImage,response.data.secure_url]
          }))
            uploadedImageUrls.push(response.data.secure_url);
            console.log("Uploaded Images length - ",)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        if(uploadedImageUrls.length>0){
          setCurrentMedicineUrls(uploadedImageUrls)
          setShowSuccess(true);
          function runFunction(){
            setTimeout(()=>{
              setShowSuccess(false)
            },5000)
          }
          runFunction();
          
        }
    }

    // After all images have been uploaded, update the state
    setLoading(false);
    setCurrentMedicineUrls(uploadedImageUrls);
};

async function handleAddMedicine(){
  console.log("form details",medicineDetails);
  // console.log("modified")
  const body = medicineDetails;
  const config = {
    headers:{
      "Content-Type":"application/json"
    }
  }
  setLoading(true);
  try {
    const response = await axios.post(BACKEND_API_URL+"/admin/addmedicine",body,config);
    if(response.data.medicineId){
      
      console.log("Medicine Added Successfully");
      console.log("Data - ",response.data);
      setMedicineAdded(true);
      setResponseMessage(true)
      setLoading(false);
    }
  } catch (error) {
    console.log("Error Occurred - ",error.message);
      setLoading(false);

  }
}

//update medicine function
async function handleUpdateMedicine(){
  setLoading(true);
  const body = updateMedicineDetails;
  const config = {
    headers:{
      "Content-Type":"application/json"
    }
  }
  try {
    const response = await axios.post(BACKEND_API_URL+"/admin/editmedicine",body,config);
    if(response.data.medicine){
      console.log("Medicine with id "+updateMedicineDetails.medicineId+" updated successfully at "+response.data.medicine.dateOfUpdate);
      setMedicineUpdated(true);
    }
  } catch (error) {
    console.log("Error Occurred - ",error.message);
      setLoading(false);
  }
}
  return (
   <>
    {updateModal ? <>
      <p>You are updating medicine id - {updateMedicineDetails.medicineId}</p>
      <Box style={styles.boxContainer}>
      <TextField variant="outlined" label="Medicine Name" className="my-3" 
      value={updateMedicineDetails.medicineName}
        onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      medicineName: e.target.value,
    }))}
      />
      <TextField variant="outlined" label="Medicine Type" className="my-3" 
      value={updateMedicineDetails.medicineType}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      medicineType: e.target.value,
    }))}
      />

      <TextField variant="outlined" label="Medicine Company" className="my-3" 
      value={updateMedicineDetails.medicineCompany}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      medicineCompany: e.target.value,
    }))}
      />
      <TextField variant="outlined" label="Medicine Price" className="my-3" 
      value={updateMedicineDetails.medicinePrice}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      medicinePrice: e.target.value,
    }))}
      />
      <TextField
        variant="outlined"
        label="Medicine Quantity"
        className="my-4"
        type="number"
      value={updateMedicineDetails.medicineQuantity}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      medicineQuantity: e.target.value,
    }))}
      />
      
      {/* Input element for file upload */}
      {/* <Box className="my-3">
        <input
          accept="image/*" // Accept only image files
          style={{ display: "none" }}
          id="medicine-image-upload"
          type="file"
          multiple={true} // Enable multiple file selection
          onChange={handleFileChange}
        />
        <label htmlFor="medicine-image-upload">
          <Button variant="contained" component="span">
           Select Images
          </Button>
        </label>
        {selectedFiles.length>0 ? <Box style={styles.innerBox}>
          {selectedFiles.map((file,index)=>{
            return(<p>
              {file.name} {index===selectedFiles.length-1 ? ".":","}
            </p>)
          })}
        </Box>:<></>}

        {selectedFiles.length>0 ? <Button onClick={handleUploadImages}
        style={{marginTop:10}}
        variant={currentMedicineUrl.length>0&& showSuccess ? "contained":"outlined"}
        color={currentMedicineUrl.length>0&& showSuccess?"success":"primary"}>

          {loading ? "Loading..":currentMedicineUrl.length>0&& showSuccess ? "Images Uploaded":"Upload Images"}
        </Button>:<>
        </>}
      </Box> */}
      
      <TextField variant="outlined" label="Medicine Leaf" className="my-3" 
      value={updateMedicineDetails.medicineLeaf}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      medicineLeaf: e.target.value,
    }))}
      />
      <TextField variant="outlined" label="Medicine Description" className="my-3" 
      value={updateMedicineDetails.medicineDescription}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      medicineDescription: e.target.value,
    }))}
      />
      {/* <TextField variant="outlined" label="Rx Required" className="my-3" 
      value={updateMedicineDetails.rxRequired}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      rxRequired: e.target.value==="false" ? false : true
    }))}
      /> */}


      <Select
      value={updateMedicineDetails.rxRequired?"true":"false"}
      onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      rxRequired: e.target.value==="false" ? false : true
    }))}
      >
        <MenuItem key="false" value="false">False</MenuItem>
        <MenuItem key="true" value="true">True</MenuItem>
      </Select>


      <TextField  label="Disease" className="my-3" 
      value={updateMedicineDetails.disease}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      disease: e.target.value,
    }))}
      />

<TextField  label="Type" className="my-3" 
      value={updateMedicineDetails.type}

         onChange= {(e)=>setUpdateMedicineDetails((current) => ({
      ...current,
      type: e.target.value,
    }))}
      />

      <Button variant="outlined" color="success" className="mt-3"
      onClick={handleUpdateMedicine}>
        {loading ? "Loading...":"Update Medicine"}
      </Button>
      {medicineUpdated ? "Medicine Updated Successfully":""}
    </Box>
    </> : <>
    <Box style={styles.boxContainer}>
      <TextField variant="outlined" label="Medicine Name" className="my-3" 
        onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      medicineName: e.target.value,
    }))}
      />
      <TextField variant="outlined" label="Medicine Type" className="my-3" 
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      medicineType: e.target.value,
    }))}
      />

      <TextField variant="outlined" label="Medicine Company" className="my-3" 
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      medicineCompany: e.target.value,
    }))}
      />
      <TextField variant="outlined" label="Medicine Price" className="my-3" 
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      medicinePrice: e.target.value,
    }))}
      />
      <TextField
        variant="outlined"
        label="Medicine Quantity"
        className="my-4"
        type="number"
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      medicineQuantity: e.target.value,
    }))}
      />
      
      {/* Input element for file upload */}
      <Box className="my-3">
        <input
          accept="image/*" // Accept only image files
          style={{ display: "none" }}
          id="medicine-image-upload"
          type="file"
          multiple={true} // Enable multiple file selection
          onChange={handleFileChange}
        />
        <label htmlFor="medicine-image-upload">
          <Button variant="contained" component="span">
           Select Images
          </Button>
        </label>
        {selectedFiles.length>0 ? <Box style={styles.innerBox}>
          {selectedFiles.map((file,index)=>{
            return(<p>
              {file.name} {index===selectedFiles.length-1 ? ".":","}
            </p>)
          })}
        </Box>:<></>}

        {selectedFiles.length>0 ? <Button onClick={handleUploadImages}
        style={{marginTop:10}}
        variant={currentMedicineUrl.length>0&& showSuccess ? "contained":"outlined"}
        color={currentMedicineUrl.length>0&& showSuccess?"success":"primary"}>

          {loading ? "Loading..":currentMedicineUrl.length>0&& showSuccess ? "Images Uploaded":"Upload Images"}
        </Button>:<>
        </>}
      </Box>
      
      <TextField variant="outlined" label="Medicine Leaf" className="my-3" 
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      medicineLeaf: e.target.value,
    }))}
      />
      <TextField variant="outlined" label="Medicine Description" className="my-3" 
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      medicineDescription: e.target.value,
    }))}
      />
      {/* <TextField variant="outlined" label="Rx Required" className="my-3" 
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      rxRequired: e.target.value==="false" ? false : true
    }))}
      /> */}

      <Select
      value={medicineDetails.rxRequired?"true":"false"}
     onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      rxRequired: e.target.value==="false" ? false : true
    }))}
      >
        <MenuItem key="false" value="false">False</MenuItem>
        <MenuItem key="true" value="true">True</MenuItem>
      </Select>
      <TextField variant="outlined" label="Disease" className="my-3" 
         onChange= {(e)=>setMedicineDetails((current) => ({
      ...current,
      disease: e.target.value,
    }))}
      />

      <Button variant="outlined" color="success" className="mt-3"
      onClick={handleAddMedicine}>
        {loading ? "Loading...":"Add Medicine"}
      </Button>
      {responseMessage ? "Medicine Added Successfully":""}
    </Box>
    </>}
   </>
  );
};

const styles = {
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  innerBox:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    flexWrap:"wrap",
    width:"100%",
    marginTop:15,
    gap:5
  }
};

export default AddMedicineForm;
