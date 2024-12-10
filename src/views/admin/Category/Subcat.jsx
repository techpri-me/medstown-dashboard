import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import { DataGrid } from "@mui/x-data-grid";

function Subcat() {
  const [disease, setDisease] = useState("");
  const [data, setData] = useState([]);
  const [state, setState] = useState({ type: "" }); // Added state for type
  const [currentType, setCurrentType] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const diseaseParam = urlParams.get("disease");
    setDisease(diseaseParam || "");

    const body = { disease: diseaseParam, offset: 50, type: state.type };

    axios.post(`${config.api}/getmedsbydisease`, body)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.type]);

  function handleCurrentRow(row) {
    console.log("current row --- ", row);
    setSelectedRow(row);
    let type = row.row.type;
    setCurrentType(type);
    setClicked(true);
  }

  async function editCategoryTypeHandler() {
    if (!selectedRow) return;

    const body = { category: currentType, medicineId: selectedRow.row.medicineId };
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    try {
      setLoading(true);
      const response = await axios.post('https://api.medstown.com/admin/editcategory', body, config);
      console.log("response data - ", response.data);
      if (response.data.medicine) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.log("Error Occurred - ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <h4 className="text-2xl font-bold text-[#014d4d]">{disease}</h4>
      <div className="mt-5 h-full flex flex-row flex-wrap">
        <DataGrid
          rows={data}
          columns={[
            { field: "medicineName", headerName: "Name", width: 200 },
            { field: "medicineCompany", headerName: "Company", width: 200 },
            { field: "medicinePrice", headerName: "Price", width: 200 },
            { field: "medicineDescription", headerName: "Description", width: 400 },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={handleCurrentRow}
          getRowId={(row) => row._id}
        />
      </div>
      {/* Example of how to call editCategoryTypeHandler */}
      <button onClick={editCategoryTypeHandler} disabled={loading}>
        {loading ? "Loading..." : "Edit Category"}
      </button>
      {success && <div>Category updated successfully!</div>}
    </div>
  );
}

export default Subcat;
