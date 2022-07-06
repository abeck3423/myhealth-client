import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  handleNewPrescriptionSubmit,
  handleEditPrescriptionSubmit,
} from "./Utils";

const PrescriptionForm = (props) => {
  const {
    prescriptionDialogOpen,
    handleToggle,
    type,
    dialogData,
    setAllPrescriptions,
    setDialogType,
  } = props;
  // Empty formData to reset to
  const emptyFormData = {
    prescriptionName: "",
    prescriptionDose: "",
    refillDate: "",
  };

  // State to track form input - Ternary functions add default values for edit forms
  const [formData, setFormData] = useState(emptyFormData);

  // Use effect to only set state when data is available
  React.useEffect(() => {
    if (type === "edit" && prescriptionDialogOpen) {
      setFormData({
        prescriptionName: dialogData.prescriptionName,
        prescriptionDose: dialogData.prescriptionDose,
        refillDate: dialogData.refillDate,
      });
    }
  }, [prescriptionDialogOpen]);

  // Handle functions set state to form values
  const handlePrescriptionNameChange = (event) => {
    const newData = { ...formData };
    newData.prescriptionName = event.target.value;
    setFormData(newData);
  };
  const handlePrescriptionDoseChange = (event) => {
    const newData = { ...formData };
    newData.prescriptionDose = event.target.value;
    setFormData(newData);
  };
  const handleRefillDateChange = (event) => {
    const newData = { ...formData };
    newData.refillDate = event.target.value;
    setFormData(newData);
  };

  // Array to create form elements
  const formArray = [
    {
      label: "Prescription Name",
      value: formData.prescriptionName,
      onChange: handlePrescriptionNameChange,
    },
    {
      label: "Prescription Dose",
      value: formData.prescriptionDose,
      onChange: handlePrescriptionDoseChange,
    },
    {
      label: "Refill Date",
      value: formData.refillDate,
      onChange: handleRefillDateChange,
    },
  ];

  return (
    <Dialog
      open={prescriptionDialogOpen}
      onClose={() => {
        setFormData(emptyFormData);
        setDialogType("");
        handleToggle();
      }}
    >
      <DialogTitle>
        {type === "edit" ? "Edit Prescription" : "Add Prescription"}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          {formArray.map((field) => {
            return (
              <TextField
                key={field.label}
                required
                id={field.label}
                label={field.label}
                value={field.value}
                variant="outlined"
                onChange={field.onChange}
              />
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setFormData(emptyFormData);
            setDialogType("");
            handleToggle();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            type === "edit"
              ? handleEditPrescriptionSubmit(
                  formData,
                  setDialogType,
                  handleToggle,
                  dialogData,
                  setAllPrescriptions,
                  setFormData,
                  emptyFormData
                )
              : handleNewPrescriptionSubmit(
                  formData,
                  setDialogType,
                  handleToggle,
                  setAllPrescriptions,
                  setFormData,
                  emptyFormData
                );
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrescriptionForm;
