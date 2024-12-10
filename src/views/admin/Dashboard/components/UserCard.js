import React, { useState, useEffect, useContext } from "react";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import Divider from "@mui/material/Divider";
import { MyContext } from "Contextapi/MyContext";
const UserCard = ({ type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { usercount } = useContext(MyContext);
  const { pharmaciescount } = useContext(MyContext);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.medstown.com/admin/showcount`);
        if (res.data) {
          console.log("response - ", res.data);
          setData(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error Occurred");
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <div style={styles.loadingContainer}>
          <p style={{ textAlign: "center" }}>Loading... Analytics</p>
        </div>
      ) : (
        <>
          <div>
            <CardContent style={styles.cardContent}>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="font-large text-black-600 text-4xl">{data?.user}</p>
            </CardContent>
          </div>

          <Divider orientation="vertical" />
          <div>
            <CardContent style={styles.cardContent}>
              <p className="text-sm font-medium text-gray-600">
                Total Pharmacies
              </p>
              <p className="font-large text-black-600 text-4xl">
                {data?.pharmacies}
              </p>
            </CardContent>
          </div>
          <Divider orientation="vertical" />

          <div>
            <CardContent style={styles.cardContent}>
              <p className="text-sm font-medium text-gray-600">
                Total Delivery Partners
              </p>
              <p className="font-large text-black-600 text-4xl">
                {data && data?.delivaryuser
 }
              </p>
            </CardContent>
          </div>
        </>
      )}
    </>
  );
};

const styles = {
  divContainer: {
    width: "100%",
    height: "90%",
    padding: 10,
  },
  cardContent: {
    padding: 20,
    textAlign: "center",
    marginLeft: "10%",
    borderRadius: 10,
  },
  loadingContainer: {},
};

export default UserCard;
