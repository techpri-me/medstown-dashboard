import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const BACKEND_API_URL = "https://api.medstown.com";

const AddOrUpdateMedicineForm = ({ updateModal, modalData, onClose }) => {
  const [medicineDetails, setMedicineDetails] = useState({
    medicineName: "",
    medicineType: "",
    medicinePrice: "",
    medicineCompany: "",
    medicineQuantity: 1,
    medicineImage: [],
    medicineLeaf: "",
    medicineDescription: "",
    rxRequired: false,
    disease: "",
    medicineId: "",
    verified: false,
    dateOfUpdate: new Date().toLocaleString(),
    type: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (updateModal && modalData) {
      setMedicineDetails({
        ...modalData,
        dateOfUpdate: new Date().toLocaleString(),
      });
      setSelectedFiles(modalData.medicineImage || []);
    }
  }, [updateModal, modalData]);

  // Limit image uploads to 5 images
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (selectedFiles.length + newFiles.length > 5) {
      setErrorMessage("You can only upload up to 5 images.");
    } else {
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setErrorMessage(""); // Clear previous errors
    }
  };

  // Remove selected image
  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // Upload images to Cloudinary
  const uploadImages = async () => {
    const uploadPreset = "freu3elv"; // Cloudinary upload preset
    const cloudName = "df7u8xpms"; // Cloudinary cloud name
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const uploadedImageUrls = [];
    setLoading(true);

    const uploadPromises = selectedFiles.map(async (file) => {
      if (!(file instanceof File)) {
        uploadedImageUrls.push(file); // Add pre-existing images directly
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await axios.post(url, formData);
        uploadedImageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrorMessage("Error uploading images. Please try again.");
      }
    });

    await Promise.all(uploadPromises);
    setLoading(false);
    return uploadedImageUrls;
  };

  // Submit form data
  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const imageUrls = await uploadImages();
      const body = { ...medicineDetails, medicineImage: imageUrls };

      console.log(body )
      if (updateModal) {
        await axios.post(`https://api.medstown.com/admin/updatemedicine`, body, {
          headers: { "Content-Type": "application/json" },
        });
        setSuccessMessage("Medicine updated successfully.");
      } else {
        await axios.post(`${BACKEND_API_URL}/admin/addmedicine/new`, body, {
          headers: { "Content-Type": "application/json" },
        });
        setSuccessMessage("Medicine added successfully.");
      }
    } catch (error) {
      console.error("Error:", error , "Sssssssssssssssss");
      setErrorMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Box style={styles.boxContainer}>
      <TextField
        variant="outlined"
        label="Medicine Name"
        className="my-3"
        value={medicineDetails.medicineName}
        onChange={(e) =>
          setMedicineDetails({
            ...medicineDetails,
            medicineName: e.target.value,
          })
        }
      />
      <TextField
        variant="outlined"
        label="Medicine Type"
        className="my-3"
        value={medicineDetails.medicineType}
        onChange={(e) =>
          setMedicineDetails({
            ...medicineDetails,
            medicineType: e.target.value,
          })
        }
      />
      <TextField
        variant="outlined"
        label="Medicine Company"
        className="my-3"
        value={medicineDetails.medicineCompany}
        onChange={(e) =>
          setMedicineDetails({
            ...medicineDetails,
            medicineCompany: e.target.value,
          })
        }
      />
      <TextField
        variant="outlined"
        label="Medicine Price"
        className="my-3"
        value={medicineDetails.medicinePrice}
        onChange={(e) =>
          setMedicineDetails({
            ...medicineDetails,
            medicinePrice: e.target.value,
          })
        }
      />
      <TextField
        variant="outlined"
        label="Medicine Quantity"
        className="my-4"
        type="number"
        value={medicineDetails.medicineQuantity}
        onChange={(e) =>
          setMedicineDetails({
            ...medicineDetails,
            medicineQuantity: e.target.value,
          })
        }
      />
      <Box className="my-3">
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="medicine-image-upload"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <label htmlFor="medicine-image-upload">
          <Button variant="contained" component="span">
            Select Images
          </Button>
        </label>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Box mt={2} style={{ display: "flex", flexWrap: "wrap" }}>
          {selectedFiles.map((file, index) => {
            const imageUrl =
              file instanceof File ? URL.createObjectURL(file) : file;
            return (
              <Box key={index} style={{ position: "relative", margin: "5px" }}>
                <img
                  src={imageUrl}
                  alt={`Selected Image ${index + 1}`}
                  style={{ width: "100px", height: "100px" }}
                />
                <Button
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "red",
                  }}
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
      <TextField
        variant="outlined"
        label="Medicine Leaf"
        className="my-3"
        value={medicineDetails.medicineLeaf}
        onChange={(e) =>
          setMedicineDetails({
            ...medicineDetails,
            medicineLeaf: e.target.value,
          })
        }
      />
      <TextField
        variant="outlined"
        label="Medicine Description"
        className="my-3"
        value={medicineDetails.medicineDescription}
        onChange={(e) =>
          setMedicineDetails({
            ...medicineDetails,
            medicineDescription: e.target.value,
          })
        }
      />
      <Select
        value={medicineDetails.type}
        onChange={(e) =>
          setMedicineDetails({ ...medicineDetails, type: e.target.value })
        }
        className="my-3"
      >
        <MenuItem value="prescription">Prescription</MenuItem>
        <MenuItem value="non-prescription">Non-Prescription</MenuItem>
        <MenuItem value="product">Product</MenuItem>
      </Select>
      <TextField
        variant="outlined"
        label="Disease"
        className="my-3"
        value={medicineDetails.disease}
        onChange={(e) =>
          setMedicineDetails({ ...medicineDetails, disease: e.target.value })
        }
      />
      <Button
        variant="outlined"
        color="success"
        className="mt-3"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : updateModal ? (
          "Update Medicine"
        ) : (
          "Add Medicine"
        )}
      </Button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {onClose && <Button onClick={onClose}>Close</Button>}
    </Box>
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
};

export default AddOrUpdateMedicineForm
