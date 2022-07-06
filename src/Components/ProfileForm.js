import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { handleNewProfileSubmit, handleEditProfileSubmit } from "./Utils";

const ProfileForm = (props) => {
  const {
    profileDialogOpen,
    handleToggle,
    type,
    dialogData,
    setAllProfiles,
    setDialogType,
  } = props;
  // Empty formData to reset to
  const emptyFormData = {
    patientName: "",
    birthDate: "",
    weight: "",
    height: "",
    bloodPressure: "",
  };

  // State to track form input - Ternary functions add default values for edit forms
  const [formData, setFormData] = useState(emptyFormData);

  // Use effect to only set state when data is available
  React.useEffect(() => {
    if (type === "edit" && profileDialogOpen) {
      setFormData({
        patientName: dialogData.patientName,
        birthDate: dialogData.birthDate,
        weight: dialogData.weight,
        height: dialogData.height,
        bloodPressure: dialogData.bloodPressure,
      });
    }
  }, [profileDialogOpen]);

  // Handle functions set state to form values
  const handlePatientNameChange = (event) => {
    const newData = { ...formData };
    newData.profileName = event.target.value;
    setFormData(newData);
  };
  const handleBirthDateChange = (event) => {
    const newData = { ...formData };
    newData.birthDate = event.target.value;
    setFormData(newData);
  };
  const handleWeightChange = (event) => {
    const newData = { ...formData };
    newData.weight = event.target.value;
    setFormData(newData);
  };
  const handleHeightChange = (event) => {
    const newData = { ...formData };
    newData.height = event.target.value;
    setFormData(newData);
  };
  const handleBloodPressureChange = (event) => {
    const newData = { ...formData };
    newData.bloodPressure = event.target.value;
    setFormData(newData);
  };
  // Array to create form elements
  const formArray = [
    {
      label: "Patient Name",
      value: formData.patientName,
      onChange: handlePatientNameChange,
    },
    {
      label: "Birth Date",
      value: formData.birthDate,
      onChange: handleBirthDateChange,
    },
    { label: "Weight", value: formData.weight, onChange: handleWeightChange },
    { label: "Height", value: formData.height, onChange: handleHeightChange },
    {
      label: "Blood Pressure",
      value: formData.bloodPressure,
      onChange: handleBloodPressureChange,
    },
  ];

  return (
    <Dialog
      open={profileDialogOpen}
      onClose={() => {
        setFormData(emptyFormData);
        setDialogType("");
        handleToggle();
      }}
    >
      <DialogTitle>
        {type === "edit" ? "Edit Profile" : "Add Profile"}
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
              ? handleEditProfileSubmit(
                  formData,
                  setDialogType,
                  handleToggle,
                  dialogData,
                  setAllProfiles,
                  setFormData,
                  emptyFormData
                )
              : handleNewProfileSubmit(
                  formData,
                  setDialogType,
                  handleToggle,
                  setAllProfiles,
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

export default ProfileForm;
