import React,{useEffect,useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import UpImage from "../../../../assets/img/dashboards/up.png";
import DownImage from "../../../../assets/img/dashboards/down.png";

import axios from 'axios';

const CardComponent = ({type}) => {
  const[openOrders,setOpenOrders] = useState(null);
  const[loading,setLoading] = useState(false);
  useEffect(() => {
    const getAllOrders = () => {
      setLoading(true);
      axios
        .get(`https://api.medstown.com/customer/getAllAirOrders`)
        .then((res) => {
          setLoading(false);
          setOpenOrders(res.data);
          console.log("Data - ", res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };

    getAllOrders();
  }, []);

  return (
    <div style={styles.divContainer}>



{type ==="Open"  && (<div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">Open Orders</p>
           <p className="text-4xl font-large text-black-600 mt-5">{openOrders?.length}</p>
           <p className="text-sm font-small text-green-600 flex">
          


           
           </p>
           </CardContent>
        </div>)}

        
        {type ==="Ordered"  && (<div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">Today's Orders</p>
           <p className="text-4xl font-large text-black-600">100</p>
           <p className="text-sm font-small text-green-600 flex">
           <span>
           <img src={UpImage} alt="up" style={{width:20,height:20}}/>
           </span>


           +20.02% 
           </p>
           </CardContent>
        </div>)}


        {type ==="Canceled"  && (<div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">This Week</p>
           <p className="text-4xl font-large text-black-600">500</p>
           <p className="text-sm font-small text-green-600 flex">
           <span>
           <img src={DownImage} alt="down" style={{width:20,height:20}}/>
           </span>


           -2.02% 
           </p>
           </CardContent>
        </div>)}


        {type ==="Refunded"  && (<div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">This Month</p>
           <p className="text-4xl font-large text-black-600">2000</p>
           <p className="text-sm font-small text-green-600 flex">
           <span>
           <img src={DownImage} alt="down" style={{width:20,height:20}}/>
           </span>


           -0.2%
           </p>
           </CardContent>
        </div>)}


        {type ==="Avg Orders"  && (<div>
           <CardContent style={styles.cardContent}>
           <p className="text-sm font-medium text-gray-600">Total Orders</p>
           <p className="text-4xl font-large text-black-600">5000+</p>
           <p className="text-sm font-small text-green-600 flex">
           <span>
           <img src={UpImage} alt="up" style={{width:20,height:20}}/>
           </span>


           +35.32% 
           </p>
           </CardContent>
        </div>)}
    </div>
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
        textAlign:"left",
        marginLeft:"10%",
        borderRadius:10
    }
}

export default CardComponent