import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";

const EnhancedTableToolbar = (props) => {
  const {
    title,
    dataName,
    handleMenuOpen,
    handlePrescriptionDialogToggle,
    handleInsuranceDialogToggle,
  } = props;

  return (
    // This toolbar contains the table header OR the selected prescription feature
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Tooltip
        title={
          dataName === "Prescription" ? "Add Prescription" : "Add Insurance"
        }
      >
        <IconButton
          onClick={() => {
            dataName === "Prescription"
              ? handlePrescriptionDialogToggle()
              : handleInsuranceDialogToggle();
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
      <Tooltip
        title="Filter list"
        onClick={(event) => handleMenuOpen(event, "filter")}
      >
        <IconButton></IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
