import apiUrl from "../apiUrl";

// *** CRUD Functions ****

// Functions to fetch all data from database
const fetchAllUsers = (setAllUsers) => {
  fetch(apiUrl + `/users/`)
    .then((res) => res.json())
    .then((data) => {
      setAllUsers(data.users);
    })
    .catch((err) => console.log("something went wrong", err));
};
const fetchAllProfiles = (setAllProfiles) => {
  fetch(apiUrl + `/profiles/`)
    .then((res) => res.json())
    .then((data) => {
      setAllProfiles(data.profiles);
    })
    .catch((err) => console.log("something went wrong", err));
};
const fetchAllPrescriptions = (setAllPrescriptions) => {
  fetch(apiUrl + `/prescriptions/`)
    .then((res) => res.json())
    .then((data) => {
      setAllPrescriptions(data.prescriptions);
    })
    .catch((err) => console.log("something went wrong", err));
};
const fetchAllInsurances = (setAllInsurances) => {
  fetch(apiUrl + `/insurances/`)
    .then((res) => res.json())
    .then((data) => {
      setAllInsurances(data.insurances);
    })
    .catch((err) => console.log("something went wrong", err));
};
// User Add: Calls fetch request to CREATE new user
const handleNewUserSubmit = (
  formData,
  setDialogType,
  handleToggle,
  setFormData,
  emptyFormData
) => {
  fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
      setDialogType("");
      handleToggle();
    })
    .catch((err) => console.log("something went wrong", err));
};

// User login: Calls fetch request to login
const handleUserLoginSubmit = (formData, setFormData, emptyFormData) => {
  fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Profile Add: Calls fetch request to CREATE
const handleNewProfileSubmit = (
  formData,
  setDialogType,
  handleToggle,
  setAllProfiles,
  setFormData,
  emptyFormData
) => {
  fetch(`${apiUrl}/profiles/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientName: formData.patientName,
      birthDate: formData.birthDate,
      weight: formData.weight,
      height: formData.height,
      bloodPressure: formData.bloodPressure,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
      setDialogType("");
      handleToggle();
      fetchAllProfiles(setAllProfiles);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Profile Edit: Calls fetch request to create OR update based on form type
const handleEditProfileSubmit = (
  formData,
  setDialogType,
  handleToggle,
  dialogData,
  setAllProfiles,
  setFormData,
  emptyFormData
) => {
  fetch(`${apiUrl}/profiles/${dialogData._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientName: formData.patientName,
      birthDate: formData.birthDate,
      weight: formData.weight,
      height: formData.height,
      bloodPressure: formData.bloodPressure,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
      setDialogType("");
      handleToggle();
      fetchAllProfiles(setAllProfiles);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Prescription Add: Calls fetch request to CREATE
const handleNewPrescriptionSubmit = (
  formData,
  setDialogType,
  handleToggle,
  setAllPrescriptions,
  setFormData,
  emptyFormData
) => {
  fetch(`${apiUrl}/prescriptions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prescriptionName: formData.prescriptionName,
      prescriptionDose: formData.prescriptionDose,
      refillDate: formData.refillDate,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
      setDialogType("");
      handleToggle();
      fetchAllPrescriptions(setAllPrescriptions);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Prescription Edit: Calls fetch request to create OR update based on form type
const handleEditPrescriptionSubmit = (
  formData,
  setDialogType,
  handleToggle,
  dialogData,
  setAllPrescriptions,
  setFormData,
  emptyFormData
) => {
  fetch(`${apiUrl}/prescriptions/${dialogData._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      presciptionName: formData.presciptionName,
      prescriptionDose: formData.prescriptionDose,
      refillDate: formData.refillDate,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
      setDialogType("");
      handleToggle();
      fetchAllPrescriptions(setAllPrescriptions);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Remove a prescription by ID
const handlePrescriptionDelete = (dialogData, setAllPrescriptions) => {
  fetch(`${apiUrl}/prescriptions/${dialogData._id}`, {
    method: "DELETE",
  })
    .then(() => {
      fetchAllPrescriptions(setAllPrescriptions);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Insurance Add: Calls fetch request to CREATE
const handleNewInsuranceSubmit = (
  formData,
  setDialogType,
  handleToggle,
  setAllInsurances,
  setFormData,
  emptyFormData
) => {
  fetch(`${apiUrl}/insurances/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      insuranceName: formData.insuranceName,
      insuranceID: formData.insuranceID,
      insuranceGroupNumber: formData.insuranceGroupNumber,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
      setDialogType("");
      handleToggle();
      fetchAllInsurances(setAllInsurances);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Insurance Edit: Calls fetch request to create OR update based on form type
const handleEditInsuranceSubmit = (
  formData,
  setDialogType,
  handleToggle,
  dialogData,
  setAllInsurances,
  setFormData,
  emptyFormData
) => {
  fetch(`${apiUrl}/insurances/${dialogData._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      insuranceName: formData.insuranceName,
      insuranceID: formData.insuranceID,
      insuranceGroupNumber: formData.insuranceGroupNumber,
    }),
  })
    .then(() => {
      setFormData(emptyFormData);
      setDialogType("");
      handleToggle();
      fetchAllInsurances(setAllInsurances);
    })
    .catch((err) => console.log("something went wrong", err));
};

// Remove a insurance by ID
const handleInsuranceDelete = (dialogData, setAllInsurances) => {
  fetch(`${apiUrl}/insurances/${dialogData._id}`, {
    method: "DELETE",
  })
    .then(() => {
      fetchAllInsurances(setAllInsurances);
    })
    .catch((err) => console.log("something went wrong", err));
};

// *** Table Functions ****

// This function sorts the table
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// This function sets how the sort function above sorts (ascending or descending)
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// This function handles the sort order
const handleRequestSort = (
  event,
  property,
  order,
  orderBy,
  setOrder,
  setOrderBy
) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

// Changes which page of the table is being displayed
const handleChangePage = (event, newPage, setPage) => {
  setPage(newPage);
};

// Changes number of rows displayed per page
const handleChangeRowsPerPage = (event, setRowsPerPage, setPage) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

export {
  fetchAllUsers,
  fetchAllProfiles,
  fetchAllPrescriptions,
  fetchAllInsurances,
  handleNewUserSubmit,
  handleUserLoginSubmit,
  handleNewProfileSubmit,
  handleEditProfileSubmit,
  handleNewPrescriptionSubmit,
  handleEditPrescriptionSubmit,
  handleNewInsuranceSubmit,
  handleEditInsuranceSubmit,
  getComparator,
  stableSort,
  handleChangePage,
  handleChangeRowsPerPage,
  handlePrescriptionDelete,
  handleInsuranceDelete,
};
