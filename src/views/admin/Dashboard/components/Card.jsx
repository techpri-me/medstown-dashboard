import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import UpImage from "../../../../assets/img/dashboards/up.png";
import DownImage from "../../../../assets/img/dashboards/down.png";
import axios from 'axios';

const CardComponent = ({ type }) => {
  const [openOrders, setOpenOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const [todayOrders, setTodayOrders] = useState(0);
  const [weekOrders, setWeekOrders] = useState(0);
  const [monthOrders, setMonthOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.medstown.com/customer/finalorder`);
        setLoading(false);
        const orders = res.data;
        calculateOrderStats(orders);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    const calculateOrderStats = (orders) => {
      const today = new Date();
      let todayCount = 0;
      let weekCount = 0;
      let monthCount = 0;
      let openCount = 0;

      orders.forEach(order => {
        const orderDate = new Date(order.createdAt);
        const isToday = (
          orderDate.getDate() === today.getDate() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );

        const isThisWeek = (
          orderDate >= new Date(today.setDate(today.getDate() - today.getDay())) && 
          orderDate <= new Date(today.setDate(today.getDate() - today.getDay() + 6))
        );

        const isThisMonth = (
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );

        if (isToday) todayCount++;
        if (isThisWeek) weekCount++;
        if (isThisMonth) monthCount++;

        if (order.status !== "Delivered" && order.status !== "Canceled") openCount++;
      });

      setTodayOrders(todayCount);
      setWeekOrders(weekCount);
      setMonthOrders(monthCount);
      setTotalOrders(orders);
      setOpenOrders(openCount);
    };

    getAllOrders();
  }, []);

  return (
    <div style={styles.divContainer}>
      {type === "Open" && (
        <CardContent style={styles.cardContent}>
          <p className="text-sm font-medium text-gray-600">Open Orders</p>
          <p className="text-4xl font-large text-black-600 mt-5">{openOrders}</p>
        </CardContent>
      )}

      {type === "Ordered" && (
        <CardContent style={styles.cardContent}>
          <p className="text-sm font-medium text-gray-600">Today's Orders</p>
          <p className="text-4xl font-large text-black-600 mt-5">{todayOrders}</p>
          <p className="text-sm font-small text-green-600 flex">
            <span>
              <img src={UpImage} alt="up" style={{ width: 20, height: 20 }} />
            </span>
            +20.02%
          </p>
        </CardContent>
      )}

      {type === "Canceled" && (
        <CardContent style={styles.cardContent}>
          <p className="text-sm font-medium text-gray-600">This Week</p>
          <p className="text-4xl font-large text-black-600 mt-5">{weekOrders}</p>
          <p className="text-sm font-small text-green-600 flex">
            <span>
              <img src={DownImage} alt="down" style={{ width: 20, height: 20 }} />
            </span>
            -2.02%
          </p>
        </CardContent>
      )}

      {type === "Refunded" && (
        <CardContent style={styles.cardContent}>
          <p className="text-sm font-medium text-gray-600">This Month</p>
          <p className="text-4xl font-large text-black-600 mt-5">{monthOrders}</p>
          <p className="text-sm font-small text-green-600 flex">
            <span>
              <img src={DownImage} alt="down" style={{ width: 20, height: 20 }} />
            </span>
            -0.2%
          </p>
        </CardContent>
      )}

      {type === "Avg Orders" && (
        <CardContent style={styles.cardContent}>
          <p className="text-sm font-medium text-gray-600">Total Delivered Orders</p>
          <p className="text-4xl font-large text-black-600 mt-5">
            {totalOrders.filter(order => order.status === "Delivered").length}
          </p>
          <p className="text-sm font-small text-green-600 flex">
            <span>
              <img src={UpImage} alt="up" style={{ width: 20, height: 20 }} />
            </span>
            +35.32%
          </p>
        </CardContent>
      )}
    </div>
  );
};

const styles = {
  divContainer: {
    width: "100%",
    height: "90%",
    padding: 10
  },
  cardContent: {
    padding: 20,
    textAlign: "left",
    marginLeft: "10%",
    borderRadius: 10
  }
};

export default CardComponent;
