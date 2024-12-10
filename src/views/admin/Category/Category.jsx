import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import InputField from "components/fields/InputField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Category = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [newName, setNewName] = useState(""); // Add state for newName
  const [type, setType] = useState(""); // Added for category type
  const [gst, setGst] = useState("");   // Added for GST
  const [discount, setDiscount] = useState(""); // Added for Discount
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.api}/getdiseaselist`) // Adjust URL based on your requirement
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function addCategoryHandler() {
    console.log("Adding new category");
    const body = { name: categoryName, type, gst, discount };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (type === "") {
      return alert("Please choose a category type");
    }
    try {
      setLoading(true);
      const res = await axios.post(`${config.api}/admin/addNew`, body, config); // Adjust URL based on your requirement
      if (res.data) {
        console.log("Category added");
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Error Occurred - ", error);
      setLoading(false);
    }
  }

  async function updateHandler() {
    const body = { name: categoryName, newName, gst, discount };
    console.log("Updating Category Details - ", body);
    try {
      setLoading(true);
      const res = await axios.put(`${config.api}/admin/editCategory`, body); // Adjust URL based on your requirement
      if (res.data) {
        console.log("Updated category");
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred - ", error);
    }
  }

  async function deleteCategoryHandler(name, type) {
    console.log("Deleting category - " + name + " with type - " + type);
    try {
      setLoading(true);
      const res = await axios.delete(`${config.api}/admin/deleteCategoryType/${name}/${type}`); // Adjust URL based on your requirement
      if (res.data) {
        console.log("Category deleted");
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred - ", error);
    }
  }

  const prescription = data.filter(item => item.type === "prescription");
  const nonPrescription = data.filter(item => item.type === "non-prescription");

  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <button className="bg-[#014d4d] text-white px-3 py-2 rounded-md" onClick={() => setOpen(true)}>
          Add Category+
        </button>
      </div>
      <h4 className="text-2xl font-bold text-[#014d4d]">Non-Prescription</h4>
      <div className="mt-5 flex h-full flex-row flex-wrap">
        {nonPrescription.map((item) => (
          <div
            key={item.id}
            className="m-2 cursor-pointer rounded-md bg-[#CCDBDB] p-2 hover:bg-[#014d4d] hover:text-white"
            onClick={() => navigate(`/admin/subcat?${item.id}`)} // Adjust the navigation path based on your needs
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h4 className="text-2xl font-bold text-[#014d4d]">Prescription</h4>
        <div className="mt-5 flex h-full flex-row flex-wrap">
          {prescription.map((item) => (
            <div key={item.id} className="m-2 cursor-pointer rounded-md bg-[#CCDBDB] p-2 hover:bg-[#014d4d] hover:text-white">
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div>
            <h4 className="text-2xl font-bold text-[#014d4d]">Add Category</h4>
            <div className="mt-5">
              <div className="flex items-center align-middle gap-5">
                <div className="flex items-center align-middle gap-2">
                  <input
                    type="radio"
                    name="category"
                    id="prescription"
                    checked={type === "prescription"}
                    onChange={() => setType("prescription")}
                    className="mr-2"
                  />
                  <label htmlFor="prescription">Prescription</label>
                </div>
                <div className="flex items-center align-middle gap-2">
                  <input
                    type="radio"
                    name="category"
                    id="non-prescription"
                    checked={type === "non-prescription"}
                    onChange={() => setType("non-prescription")}
                    className="mr-2"
                  />
                  <label htmlFor="non-prescription">Non-Prescription</label>
                </div>
              </div>
              <InputField
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
              />
              <InputField
                label="GST"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                placeholder="Enter GST Percentage"
              />
              <InputField
                label="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter Discount Percentage"
              />
              <InputField
                label="New Category Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter New Category Name"
              />
            </div>
            <div className="mt-5 flex justify-end">
              <button
                className="bg-[#014d4d] text-white px-3 py-2 rounded-md"
                onClick={addCategoryHandler}
              >
                Add Category +
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Category;
