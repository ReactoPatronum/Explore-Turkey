import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ activities }) {
  return (
    <TableContainer className="px-5" component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Destination</StyledTableCell>
            <StyledTableCell align="right">Admission Fees</StyledTableCell>
            <StyledTableCell align="right">Guided Tours</StyledTableCell>
            <StyledTableCell align="right">Cultural Activities</StyledTableCell>
            <StyledTableCell align="right">Souvenir Shopping</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities?.map((item) => (
            <StyledTableRow key={item._key}>
              <StyledTableCell align="left">{item.destination}</StyledTableCell>
              <StyledTableCell align="left">
                {item.admissionFees}
              </StyledTableCell>
              <StyledTableCell align="left">{item.guidedTours}</StyledTableCell>
              <StyledTableCell align="left">
                {item.culturalActivities}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.souvenirShopping}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
