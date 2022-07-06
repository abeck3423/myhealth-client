import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="topNavBar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} component={RouterLink} to="/">
              Users
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={RouterLink}
              to="/profile"
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={RouterLink}
              to="/prescriptions"
            >
              Prescriptions
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={RouterLink}
              to="/insurances"
            >
              Insurances
            </MenuItem>
          </Menu>
          <Typography
            className="navHeader"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            myHEALTH
          </Typography>
          <Button color="inherit">Sign Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
