import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import HealthRow from "./HealthRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import {
  getComparator,
  stableSort,
  handleChangePage,
  handleChangeRowsPerPage,
} from "./Utils";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { useLocation } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Details from "./Details";
import PrescriptionForm from "./PrescriptionForm";
import InsuranceForm from "./InsuranceForm";

const Home = (props) => {
  const {
    dataName,
    tablet,
    desktop,
    homeTitle,
    allPrescriptions,
    allInsurances,
    setAllPrescriptions,
    setAllInsurances,
  } = props;
  // Create an object to reset dialogData
  const emptyDialogData = {
    prescriptionName: "",
    prescriptionDose: "",
    refillDate: "",
    insuranceName: "",
    insuranceID: "",
    insuranceGroupNumber: "",
  };

  // States for controlling the Table
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [title, setTitle] = React.useState(homeTitle);
  // State for controlling filter menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  // State for controlling the Dialogs
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] =
    React.useState(false);
  const [insuranceDialogOpen, setInsuranceDialogOpen] = React.useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(emptyDialogData);
  const [dialogType, setDialogType] = React.useState("");
  // Variable to track location to load state properly
  let location = useLocation().pathname;

  // Event handlers for menu open and close
  const handleMenuOpen = (event, menuType) => {
    setAnchorEl(event.currentTarget);
  };
  // Open and close the Add Form
  const handlePrescriptionDialogToggle = () => {
    setPrescriptionDialogOpen(!prescriptionDialogOpen);
  };
  // Open and close the Edit Form
  const handleInsuranceDialogToggle = () => {
    setInsuranceDialogOpen(!insuranceDialogOpen);
  };
  // Open and close the Details Dialog
  const handleDetailsDialogToggle = () => {
    setDetailsDialogOpen(!detailsDialogOpen);
  };

  // Use Effect resets state data on navigation to make sure prescriptions / insurances display properly
  React.useEffect(() => {
    setTitle(homeTitle);
    setRows(dataName === "Prescription" ? allPrescriptions : allInsurances);
    setDialogData(emptyDialogData);
  }, [location, allPrescriptions, allInsurances]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          handleMenuOpen={handleMenuOpen}
          title={title}
          dataName={dataName}
          handlePrescriptionDialogToggle={handlePrescriptionDialogToggle}
          handleInsuranceDialogToggle={handleInsuranceDialogToggle}
        />
        <TableContainer>
          <Table sx={{ minWidth: 370 }} aria-labelledby="tableTitle">
            <TableBody>
              {
                /* if you don't need to support IE11, you can replace the `stableSort` call with:
                                rows.slice().sort(getComparator(order, orderBy)) */
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <HealthRow
                      key={row._id}
                      row={row}
                      selected={selected}
                      setSelected={setSelected}
                      tablet={tablet}
                      desktop={desktop}
                      dataName={dataName}
                      handlePrescriptionDialogToggle={
                        handlePrescriptionDialogToggle
                      }
                      handleInsuranceDialogToggle={handleInsuranceDialogToggle}
                      handleDetailsDialogToggle={handleDetailsDialogToggle}
                      handleMenuOpen={handleMenuOpen}
                      setAllPrescriptions={setAllPrescriptions}
                      setDialogData={setDialogData}
                      setDialogType={setDialogType}
                    />
                  ))
              }
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) =>
            handleChangePage(event, newPage, setPage)
          }
          onRowsPerPageChange={(event) =>
            handleChangeRowsPerPage(event, setRowsPerPage, setPage)
          }
        />
      </Paper>
      {/* Works for prescriptions or insurances based on DataName */}
      <Details
        open={detailsDialogOpen}
        handleToggle={handleDetailsDialogToggle}
        dataName={dataName}
        dialogData={dialogData}
        handleMenuOpen={handleMenuOpen}
        handlePrescriptionDialogToggle={handlePrescriptionDialogToggle}
        handleInsuranceDialogToggle={handleInsuranceDialogToggle}
        setAllPrescriptions={setAllPrescriptions}
      />
      {/* Works for Edit or New based on type */}
      <PrescriptionForm
        prescriptionDialogOpen={prescriptionDialogOpen}
        dataName={dataName}
        handleToggle={handlePrescriptionDialogToggle}
        desktop={desktop}
        type={dialogType}
        dialogData={dialogData}
        setAllPrescriptions={setAllPrescriptions}
        setDialogType={setDialogType}
      />
      {/* Works for Edit or New based on type */}
      <InsuranceForm
        insuranceDialogOpen={insuranceDialogOpen}
        dataName={dataName}
        handleToggle={handleInsuranceDialogToggle}
        type={dialogType}
        dialogData={dialogData}
        setAllInsurances={setAllInsurances}
        setDialogType={setDialogType}
      />
    </Box>
  );
};

export default Home;
