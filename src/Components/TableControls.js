import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { handlePrescriptionToggle } from "./Utils";

const TableControls = (props) => {
  const {
    open,
    dataName,
    handlePrescriptionDialogToggle,
    handleInsuranceDialogToggle,
    handleDetailsDialogToggle,
    handleMenuOpen,
    row,
    setAllPrescriptions,
    setDialogData,
    setDialogType,
  } = props;

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1, justifyContent: "center" }}>
        <Button
          key="details"
          variant="contained"
          sx={{ mx: 1 }}
          onClick={() => {
            handleDetailsDialogToggle();
            setDialogData(row);
          }}
        >
          Details
        </Button>
        <Button
          key="edit"
          variant="contained"
          sx={{ mx: 1 }}
          onClick={() => {
            dataName === "Prescription"
              ? handlePrescriptionDialogToggle()
              : handleInsuranceDialogToggle();
            setDialogData(row);
            setDialogType("edit");
          }}
        >
          Edit
        </Button>
      </Box>
    </Collapse>
  );
};

export default TableControls;
