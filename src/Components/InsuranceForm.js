import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { handleNewInsuranceSubmit, handleEditInsuranceSubmit } from "./Utils";

const InsuranceForm = (props) => {
  const {
    insuranceDialogOpen,
    handleToggle,
    type,
    dialogData,
    setAllInsurances,
    setDialogType,
  } = props;
  // Empty formData to reset to
  const emptyFormData = {
    insuranceName: "",
    insuranceID: "",
    insuranceGroupNumber: "",
  };

  // State to track form input - Ternary functions add default values for edit forms
  const [formData, setFormData] = useState(emptyFormData);

  // Use effect to only set state when data is available
  React.useEffect(() => {
    if (type === "edit" && insuranceDialogOpen) {
      setFormData({
        insuranceName: dialogData.insuranceName,
        insuranceID: dialogData.insuranceID,
        insuranceGroupNumber: dialogData.insuranceGroupNumber,
      });
    }
  }, [insuranceDialogOpen]);

  // Handle functions set state to form values
  const handleInsuranceNameChange = (event) => {
    const newData = { ...formData };
    newData.insuranceName = event.target.value;
    setFormData(newData);
  };
  const handleInsuranceIDChange = (event) => {
    const newData = { ...formData };
    newData.insuranceID = event.target.value;
    setFormData(newData);
  };
  const handleInsuranceGroupNumberChange = (event) => {
    const newData = { ...formData };
    newData.insuranceGroupNumber = event.target.value;
    setFormData(newData);
  };

  // Array to create form elements
  const formArray = [
    {
      label: "Insurance Name",
      value: formData.insuranceName,
      onChange: handleInsuranceNameChange,
    },
    {
      label: "Insurance ID",
      value: formData.insuranceID,
      onChange: handleInsuranceIDChange,
    },
    {
      label: "Insurance Group Number",
      value: formData.insuranceGroupNumber,
      onChange: handleInsuranceGroupNumberChange,
    },
  ];

  return (
    <Dialog
      open={insuranceDialogOpen}
      onClose={() => {
        setFormData(emptyFormData);
        setDialogType("");
        handleToggle();
      }}
    >
      <DialogTitle>
        {type === "edit" ? "Edit Insurance" : "Add Insurance"}
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
              ? handleEditInsuranceSubmit(
                  formData,
                  setDialogType,
                  handleToggle,
                  dialogData,
                  setAllInsurances,
                  setFormData,
                  emptyFormData
                )
              : handleNewInsuranceSubmit(
                  formData,
                  setDialogType,
                  handleToggle,
                  setAllInsurances,
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

export default InsuranceForm;
