import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableControls from "./TableControls";

const HealthRow = (props) => {
  const {
    tablet,
    desktop,
    selected,
    setSelected,
    dataName,
    row,
    handlePrescriptionDialogToggle,
    handleInsuranceDialogToggle,
    handleDetailsDialogToggle,
    handleMenuOpen,
    setAllPrescriptions,
    setDialogData,
    setDialogType,
  } = props;

  const [rowCollapseOpen, setRowCollapseOpen] = React.useState(false);

  // Sets whichever row is selected by ID
  const isItemSelected = selected._id === row._id ? true : false;
  let priorityBackground = "";

  const tableControlls = (
    <TableControls
      open={rowCollapseOpen}
      dataName={dataName}
      handlePrescriptionDialogToggle={handlePrescriptionDialogToggle}
      handleInsuranceDialogToggle={handleInsuranceDialogToggle}
      handleDetailsDialogToggle={handleDetailsDialogToggle}
      handleMenuOpen={handleMenuOpen}
      row={row}
      setAllPrescriptions={setAllPrescriptions}
      setDialogData={setDialogData}
      setDialogType={setDialogType}
    />
  );

  if (dataName === "Prescription") {
    return (
      <React.Fragment>
        <TableRow
          hover
          onClick={() => {
            row === selected ? setSelected({}) : setSelected(row);
            setRowCollapseOpen(!rowCollapseOpen);
          }}
          aria-checked={isItemSelected}
          selected={isItemSelected}
          sx={{
            "& > *": { borderBottom: "unset" },
            backgroundColor: priorityBackground,
          }}
        >
          <TableCell>
            <IconButton aria-label="expand row" size="small">
              {rowCollapseOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.prescriptionName}
          </TableCell>
        </TableRow>
        <TableRow selected={true}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            {tableControlls}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  if (dataName === "Insurance") {
    return (
      <React.Fragment>
        <TableRow
          hover
          onClick={() => {
            row === selected ? setSelected({}) : setSelected(row);
            setRowCollapseOpen(!rowCollapseOpen);
          }}
          aria-checked={isItemSelected}
          selected={isItemSelected}
          sx={{ "& > *": { borderBottom: "unset" } }}
        >
          <TableCell>
            <IconButton aria-label="expand row" size="small">
              {rowCollapseOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.insuranceName}
          </TableCell>
        </TableRow>
        <TableRow selected={true}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            {tableControlls}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
};

export default HealthRow;
