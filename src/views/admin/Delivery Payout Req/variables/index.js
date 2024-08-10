export const tableColumns = [
  {
    field: "deliverypartnername",
    headerName: "Delivery Partner Name",
    width: 200,
  },
  {
    field: "deliverypartnerage",
    headerName: "Delivery Partner Age",
    width: 150,
    renderCell: (params) => (
      <div>₹ {params.value === null ? 0 : params.value}</div>
    ),
  },
  {
    field: "reqdate",
    headerName: "Req Date",
    width: 200,
  },
  {
    field: "payoutamount",
    headerName: "Payout Amount",
    width: 200,
  },

  {
    field: "Action",
    headerName: "Action",
    width: 200,
    renderCell: () => (
      <div className="m flex items-center">
        <button className="m-2 rounded-sm bg-green-400 p-2 font-normal text-white ">
          Accept{" "}
        </button>
        <button className="m-2 rounded-sm bg-red-400 p-2 font-normal text-white ">
          Hold
        </button>
      </div>
    ),
  },
];

export const tableData = [
  {
    _id: "63c3c2a266cf04998f995657",
    ItemsOrdered: 4,
    deliverypartnername: "Noman",
    deliverypartnerage: "23",
    reqdate: "12-01-2012",
    payoutamount: "120000",
  },
  {
    _id: "63c3c2a266cf04998f995658",
    ItemsOrdered: 4,
    deliverypartnername: "Ali",
    deliverypartnerage: "21",
    reqdate: "14-02-2012",
    payoutamount: "1200",
  },
];
