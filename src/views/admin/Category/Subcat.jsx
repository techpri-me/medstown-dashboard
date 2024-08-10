import React,{useState,useEffect} from 'react'
import axios from 'axios'
import config from '../../../config'
import { DataGrid } from "@mui/x-data-grid";

function Subcat() {
  const [disease,setDisease] = useState([])
  const [data,setData] = useState([])
  useEffect(() => {
    console.log("subcat")
    // get url params
    const urlParams = window.location.search;
    console.log(urlParams.split("?")[1])
    setDisease(urlParams.split("?")[1])
<<<<<<< main
    const obj = { disease: urlParams.split("?")[1],offset:50}
    axios.post(`${config.api}/getmedsbydisease`,obj).then((res)=>{
=======
    const body = { disease: urlParams.split("?")[1],offset:50, type:state.type};

    console.log("Your body ");
    console.log(body);
    console.log("Getting Medicine By Category")
    axios.post('https://api.medstown.com/admin/getmedsbydisease',body).then((res)=>{
      
      console.log("response data ")
>>>>>>> local
      console.log(res.data)
      setData(res.data)
    }
    ).catch((err)=>{
      console.log(err)
    })
<<<<<<< main
  }, [])
=======
  }, []);
  
  function handleCurrentRow(row){
    console.log("current row --- ",row);
    setSelectedRow(row);
    let type = row.row.type;
    setCurrentType(type)
    setClicked(true);

  }
async function editCategoryTypeHandler(){
  const body = {category : currentType, medicineId : selectedRow.row.medicineId};
  const config = {
    headers:{"Content-Type":"application/json"}
  }
  try { 
    setLoading(true);
    // console.log("body details - ",body);
    const response = await axios.post('https://api.medstown.com/admin/editcategory',body,config);
    console.log("response data - ",response.data);
    if(response.data.medicine){
      setSuccess(true);
    setLoading(false);

      setTimeout(()=>{
        setSuccess(false);
      },3000)
      // return 
    }
  } catch (error) {
    console.log("Error Occurred - ",error);
    setLoading(false);

  }
}

>>>>>>> local
  return (
    <div className="mt-5">
    <h4 className=" text-2xl font-bold text-[#014d4d]">{disease}</h4>
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
        getRowId={(row) => row._id}
      />
    </div>
    </div>
  )
}

export default Subcat