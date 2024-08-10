import React,{useEffect,useState} from "react";
import PieChartCard from "./components/PieChartCard";
import TotalSpent from "./components/TotalSpent";
import DailyTraffic from "../default/components/DailyTraffic";
import BarChart from "components/charts/BarChart";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardComponent from "./components/Card";
import Divider from '@mui/material/Divider';
import PieChart from "./components/PieChartCard";
import UserCard from "./components/UserCard";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
const Dashboard = () => {
  const [catName, setCatName] = useState("");
  const [catCount, setCatCount] = useState("");
  useEffect(() => {
    axios.get("https://api.medstown.com/pharmacy/getdiseasewisemedicinecount").then((res) => {
      console.log(res.data);
      setCatName(res.data.map((item) => item._id));
      setCatCount(res.data.map((item) => item.count));
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  useEffect(() => {
    console.log(catName);
    console.log(catCount);
  }, [catName, catCount]);
  return (
    <div>
      {/* Card widget */}
      <Card className="mt-5">
      <button className="linear mt-2 ml-5 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">Orders</span>
        </button>
      <div className="mt-1 grid grid-cols-1 gap-5 md:grid-cols-1">
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
            
        <div style={{width:"33.33%"}}>
            <CardComponent type="Open"/>
            </div>
            <Divider orientation="vertical" style={{height:"70%"}}/>

            <div style={{width:"33.33%"}}>
            <CardComponent type="Ordered"/>
            </div>

          <Divider orientation="vertical" style={{height:"70%"}}/>

            <div style={{width:"33.33%"}}>
            <CardComponent type="Canceled"/>
            </div>

            <Divider orientation="vertical" style={{height:"70%"}}/>
            <div style={{width:"33.33%"}}>
            <CardComponent type="Refunded"/>
            </div>

            <Divider orientation="vertical" style={{height:"70%"}}/>
            <div style={{width:"33.33%"}}>
            <CardComponent type="Avg Orders"/>
            </div>
        </div>
      </div>
      </Card>

      {/* User Analytics */}
      <Card className="mt-2">
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
         

          <UserCard/>
        </div>
      </div>
      </Card>
      {/* User Analytics end */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"></div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <TotalSpent />
      </div>

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <PieChart />
      </div> */}
      {/* Bar Chart */}
      {/* <div>
        <BarChart
          chartData={[
            {
              name: catName,
              data: catCount,
            },
          ]}
          chartOptions={{
            series: [
              {
                name: catName,
                data: catCount,
              },
            ],
            options: {
              chart: {
                height: 500,
                type: "bar",
                width: "100%",
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: "top", // top, center, bottom
                  },
                },
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          }}
        />
      </div>  */}
    </div>
  );
};

export default Dashboard;
