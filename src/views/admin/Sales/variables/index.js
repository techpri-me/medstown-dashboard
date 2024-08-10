export const tableColumns = [
  {
    field: "orderId",
    headerName: "Order ID",
    width: 200,
  },
  {
    field: "totalOrderPrice",
    headerName: "Total Order Price",
    width: 150,
    renderCell: (params) => (
      <div>₹ {params.value === null ? 0 : params.value}</div>
    ),
  },
  {
    field: "ItemsOrdered",
    headerName: "Items Ordered",
    width: 200,
  },
  {
    field: "paymentMode",
    headerName: "Payment mode",
    width: 200,
  },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    width: 200,
  },
  {
    field: "orderNumber",
    headerName: "Order Number of User",
    width: 200,
  },
];

export const tableData = [
  {
    _id: "63c3c2a266cf04998f995657",
    ItemsOrdered: 4,
    orderId: "MED38261802",
    totalOrderPrice: "12",
    medicineQuantity: null,
    medicineType: null,
    paymentMode: "Paypal",
    paymentStatus: "paid",
    orderNumber: 3422,
  },
  {
    _id: "63c3c2a266cf04998f347657",
    ItemsOrdered: 4,
    orderId: "MD38261801",
    totalOrderPrice: "10",
    medicineQuantity: null,
    medicineType: null,
    paymentMode: "Paypal",
    paymentStatus: "paid",
    orderNumber: 1423,
  },
];
