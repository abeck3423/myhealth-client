import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { handlePrescriptionDelete, handleInsuranceDelete } from "./Utils";

function Details(props) {
  const {
    open,
    handleToggle,
    dataName,
    dialogData,
    handlePrescriptionDialogToggle,
    handleInsuranceDialogToggle,
    setAllPrescriptions,
    setAllInsurances,
  } = props;

  let textFieldList = "";
  let displayList = "";
  let prescriptionList = "";
  if (dialogData.prescriptions) {
    prescriptionList =
      dialogData.prescriptions.length > 0
        ? dialogData.prescriptions.reduce(
            (previous, current) =>
              previous.prescriptionName + " " + current.prescriptionName
          )
        : "None";
  }
  let insuranceList = "";
  if (dialogData.insurances) {
    insuranceList =
      dialogData.insurances.length > 0
        ? dialogData.insurances.reduce(
            (previous, current) =>
              previous.insuranceName + " " + current.insuranceName
          )
        : "None";
  }
  if (dataName === "Prescription" && Object.keys(dialogData).length > 0) {
    displayList = [
      { label: "Prescription Name", value: dialogData.prescriptionName },
      { label: "Prescription Dose", value: dialogData.prescriptionDose },
      { label: "Refill Date", value: dialogData.refillDate },
    ];
  }
  if (dataName === "Insurance" && Object.keys(dialogData).length > 0) {
    displayList = [
      { label: "Insurance Name", value: dialogData.insuranceName },
      { label: "Insurance ID", value: dialogData.insuranceID },
      {
        label: "Insurance Group Number",
        value: dialogData.insuranceGroupNumber,
      },
    ];
  }
  if (Object.keys(dialogData).length > 0) {
    textFieldList = displayList.map((item) => {
      return (
        <TextField
          key={item.label}
          id="outlined-read-only-input"
          label={item.label}
          value={item.value}
          InputProps={{
            readOnly: true,
          }}
          sx={{ width: "90%", m: 2 }}
        />
      );
    });
  }
  return (
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>{dataName} Details</DialogTitle>
      <DialogContent>{textFieldList}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            dataName === "Prescription"
              ? handlePrescriptionDialogToggle(dialogData, "edit")
              : handleInsuranceDialogToggle(dialogData, "edit");
            handleToggle();
          }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            handlePrescriptionDelete(dialogData, setAllPrescriptions);
            handleInsuranceDelete(dialogData, setAllInsurances);
            handleToggle();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Details;
