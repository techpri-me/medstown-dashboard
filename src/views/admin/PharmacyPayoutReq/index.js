import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
// import moment from "moment";

// Component to render wallet history details for each pharmacy
const WalletHistoryTable = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which rows are expanded

  useEffect(() => {
    // Fetch wallet history data from API
    axios
      .get("https://api.medstown.com/pharmacy/getPharmacyWalletHistory")
      .then((response) => setPharmacies(response.data))
      .catch((error) => console.error("Error fetching wallet history:", error));
  }, []);

  // Function to handle row expansion/collapse
  const toggleExpand = (pharmacyId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [pharmacyId]: !prevExpanded[pharmacyId],
    }));
  };

  // Format date in DD-MM-YYYY HH:MM:SS format
  // const formatDate = (dateString) => {
  //   return moment(dateString).format("DD-MM-YYYY HH:mm:ss");
  // };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pharmacy ID</TableCell>
            <TableCell>Total Balance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pharmacies.map((pharmacy) => (
            <React.Fragment key={pharmacy.pharmacyId}>
              <TableRow>
                <TableCell>{pharmacy.pharmacyId}</TableCell>
                <TableCell>{pharmacy.totalBalance}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => toggleExpand(pharmacy.pharmacyId)}
                    aria-label="expand row"
                  >
                    {expanded[pharmacy.pharmacyId] ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Expandable Row for Wallet History */}
              {expanded[pharmacy.pharmacyId] && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Collapse in={expanded[pharmacy.pharmacyId]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom>
                          Wallet History
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Transaction ID</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Type</TableCell>
                              <TableCell>Date</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pharmacy.walletHistory.map((history) => (
                              <TableRow key={history.transactionId}>
                                <TableCell>{history.transactionId}</TableCell>
                                <TableCell>{history.amount}</TableCell>
                                <TableCell>{history.status}</TableCell>
                                <TableCell>{history.type}</TableCell>
                                <TableCell>{history.date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WalletHistoryTable;
