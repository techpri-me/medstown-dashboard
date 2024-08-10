import React, { useEffect, useState } from "react";
import { columnsDataCheck } from "./variables/columnsData";
import CheckTable from "components/CheckTable";
import axios from "axios";
import { formattedDate } from "utils";

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const OpenOrders = () => {
  const [AllOrder, setOpenOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getallpharmacies(pageNumber);
  }, [pageNumber]);

  const getallpharmacies = (page) => {
    setLoading(true);
    axios
      .get(`http://localhost:7001/customer//getAllOrders/${page}`)
      .then((res) => {
        setLoading(false);
        setOpenOrders(res.data.reverse());
        console.log("Data - ",res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePagination = (direction) => {
    if (direction === "back") {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        getallpharmacies(pageNumber);
      }
    } else {
      if (AllOrder?.length) {
        setPageNumber(pageNumber + 1);
        getallpharmacies(pageNumber);
      }
    }
  };

  const currentDate = AllOrder?.find((item) => item?.updatedAt);
  const openOrders = AllOrder.filter((order) => order.status === "pending");
  
  return (
    <div className="bgpr mt-8">
      <div>
        <CheckTable
          columnsData={columnsDataCheck}
          tableData={openOrders}
          title={formattedDate(currentDate?.updatedAt, dateOptions)}
        />
        <div className="mt-4 flex items-center justify-end gap-5">
          <p className="font-semibold">
            Page No: {!loading ? pageNumber : "_"}
          </p>
          <button
            disabled={loading ? true : false}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => handlePagination("back")}
          >
            Back
          </button>
          <button
            disabled={loading ? true : false}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => handlePagination("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenOrders;
