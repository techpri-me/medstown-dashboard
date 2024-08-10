import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import InputField from "components/fields/InputField";
import Radio from "components/radio";
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
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true)
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
<<<<<<< main
      .get(`${config.api}/getdiseaselist`)
=======
      .get('https://api.medstown.com/admin/categories')
>>>>>>> local
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
<<<<<<< main

=======
  async function addCategoryHandler() {
    console.log("Adding new category");
    const body = { name: categoryName, type: type ,gst : gst, discount:discount}
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    if(type===""){
      return alert("Please choose prescription type")
    }
    try {
      setLoading(true);
      const res = await axios.post('https://api.medstown.com/admin/addNew', body, config);
      if (res.data) {
        console.log("data --- ", data);
      setLoading(false);
        setSuccess(true);

        setTimeout(()=>{
          setSuccess(false);
        },3000)
      }
    } catch (error) {
      //  return res.send("Error Occurred - ",error) 
      console.log("Error Occurred - ", error);
      setLoading(false);

    }
  }


  //prescription 

  const prescription = data && data.filter(item => item.type === "prescription");
  const nonPrescription = data && data.filter(item => item.type === "non-prescription");

  async function updateHandler() {
    const body = { name: categoryName, newName: newName ,gst : gst, discount: discount};
    console.log("Updating Category Details - ", body);
    try {
      setLoading(true);
      const res = await axios.put("https://api.medstown.com/admin/editCategory", body);
      if (res.data) {
        console.log("Updated category");
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000)
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred ! - ,error");

    }
  }
  async function deletCategoryHandler(name, type) {
    console.log("Deleting category - " + name+" with type - "+type)
    const body = { name : categoryName,type : type}
    console.log("body --- ",body);
    try {
      setLoading(true);
      const res = await axios.delete("https://api.medstown.com/admin/deleteCategoryType/"+name+"/"+type);
      console.log("")
      console.log("after deleting --- ",res.data);
      if (res.data) {
        setLoading(false)
        setSuccess(true);

        setTimeout(() => { setSuccess(false) }, 3000)
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred ! ", error);
    }
  }
>>>>>>> local
  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <button className="bg-[#014d4d] text-white px-3 py-2 rounded-md" onClick={handleOpen}>Add Category+</button>
      </div>
      <h4 className=" text-2xl font-bold text-[#014d4d]">Non-Prescription</h4>
      <div className="mt-5 flex h-full flex-row flex-wrap">
        {data.map((item) => {
          return (
            <div
              className="m-2 cursor-pointer rounded-md bg-[#CCDBDB] p-2 hover:bg-[#014d4d] hover:text-white"
              // redirect to a component with the selected category
              onClick={() => navigate(`/admin/subcat?${item}`)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <h4 className=" text-2xl font-bold text-[#014d4d]">Prescription</h4>
        <div className="mt-5 flex h-full flex-row flex-wrap">
          {data.map((item) => {
            return (
              <div className="m-2 cursor-pointer rounded-md bg-[#CCDBDB] p-2 hover:bg-[#014d4d] hover:text-white">
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4 className="text-2xl font-bold text-[#014d4d]">Add Category</h4>
            <div className="mt-5">
              <div className="flex items-center align-middle gap-5">
                <div className="flex items-center align-middle gap-2">
                  <input type="radio" name="category" id="prescription" className="mr-2" />
                  <label htmlFor="prescription">Prescription</label>
                </div>
                <div className="flex items-center align-middle gap-2">
                  <input type="radio" name="category" id="non-prescription" className="mr-2" />
                  <label htmlFor="non-prescription">Non-Prescription</label>
                </div>
              </div>
              <InputField
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
              />
<<<<<<< main
=======

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
>>>>>>> local
            </div>
            <div className="mt-5 flex justify-end">
              <button className="bg-[#014d4d] text-white px-3 py-2 rounded-md">Add Category +</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Category;
