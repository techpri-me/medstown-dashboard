import React,{useState,useEffect} from 'react'
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import Divider from "@mui/material/Divider"
const UserCard = ({type}) => {
    const[data,setData] = useState(null);
    const[loading,setLoading] = useState(false);
    useEffect(()=>{
        async function getData(){
            setLoading(true);
            try {
                const res = await axios.get(`https://api.medstown.com/admin/allDetails`);
                if(res.data){
                    console.log("response - ",res.data);
                    setData(res.data);
            setLoading(false);

                }
            } catch (error) {
                console.log("Error Occurred");
            setLoading(false);

            }
        }
        getData();
    },[])
  return (
    <>
       {loading ? <div style={styles.loadingContainer}>
        <p style={{textAlign:"center"}}>Loading... Analytics</p>
       </div>: <>
       <div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">Total Users</p>
           <p className="text-4xl font-large text-black-600">{data && data.userCount}</p>
          
           </CardContent>
        </div>

<Divider orientation="vertical"/>
      <div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">Total Pharmacies</p>
           <p className="text-4xl font-large text-black-600">{data && data.pharmCount}</p>

          
           </CardContent>
        </div>
        <Divider orientation="vertical"/>

        
        <div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">Total Delivery Partners</p>
           <p className="text-4xl font-large text-black-600">{data && data.deliveryCount}</p>

          
           </CardContent>
        </div>
       </>}
    </>
  )
}


const styles = {
    divContainer:{
        width:"100%",
        height:"90%",
        padding:10
    },
    cardContent:{
        padding:20,
        textAlign:"center",
        marginLeft:"10%",
        borderRadius:10
    },
    loadingContainer:{
        
    }
}

export default UserCard