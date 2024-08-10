export const tableColumns = [
  {
    field: "paymentIdentifier",
    headerName: "Payment identifier",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    renderCell: (params) => (
      <div>₹ {params.value === null ? 0 : params.value}</div>
    ),
  },
  {
    field: "valueDate",
    headerName: "Value Date",
    width: 200,
  },
  {
    field: "beneficiaryName",
    headerName: "BeneficiaryName",
    width: 200,
  },
  {
    field: "beneAccountNumber",
    headerName: "BeneAccountNumber",
    width: 200,
  },
  {
    field: "emailIDofbeneficiary",
    headerName: "Email ID of beneficiary",
    width: 200,
  },
  {
    field: "emailBody",
    headerName: "Email Body",
    width: 200,
  },
  {
    field: "debitAccountNumber",
    headerName: "Debit Account Number",
    width: 200,
  },
  {
    field: "cRNNarrationRemarks",
    headerName: "CRN (Narration  / Remarks)",
    width: 200,
  },
  {
    field: "receiverIFSC",
    headerName: "Receiver IFSC",
    width: 200,
  },
  {
    field: "receiverActype",
    headerName: "Receiver A/c type",
    width: 200,
  },
  {
    field: "remarksBeneficiaryAccountStmtnarrationctype",
    headerName: "Remarks (Beneficiary Account Stmt narration)",
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
    paymentIdentifier: "N",
    amount: "1200",
    valueDate: "12-01-2012",
    beneficiaryName: "MeeraNair",
    beneAccountNumber: "992100111",
    emailIDofbeneficiary: "nairmeera@rediff.com",
    emailBody: "This payment pertains to invoice 871A88923",
    debitAccountNumber: "901298982345678",
    cRNNarrationRemarks: "050601",
    receiverIFSC: "ICIC0000004",
    receiverActype: "11",
    remarksBeneficiaryAccountStmtnarrationctype: "By EXP Mar14",
  },
  {
    _id: "63c3c2a266cf04998f995658",
    ItemsOrdered: 4,
    paymentIdentifier: "R",
    amount: "2300000",
    valueDate: "12-01-2012",
    beneficiaryName: "Kamlesh Gupta",
    beneAccountNumber: "000490456783",
    emailIDofbeneficiary: "gkamlesh@gmail.com",
    emailBody: "",
    debitAccountNumber: "901298982345678",
    cRNNarrationRemarks: "050602",
    receiverIFSC: "ICIC0000004",
    receiverActype: "11",
    remarksBeneficiaryAccountStmtnarrationctype: "By EXP Mar14",
  },
  {
    _id: "63c3c2a266cf04998f995757",
    ItemsOrdered: 4,
    paymentIdentifier: "I",
    amount: "900",
    valueDate: "12-01-2012",
    beneficiaryName: "Girish Subramaniam",
    beneAccountNumber: "447010113482341",
    emailIDofbeneficiary: "giri@yahoon.com",
    emailBody: "This payment pertains to invoice",
    debitAccountNumber: "901298982345678",
    cRNNarrationRemarks: "050603",
    receiverIFSC: "ICIC0000004",
    receiverActype: "11",
    remarksBeneficiaryAccountStmtnarrationctype: "By EXP Mar14",
  },
];
