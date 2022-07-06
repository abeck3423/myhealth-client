import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import User from "./Components/User";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import { fetchAllPrescriptions, fetchAllInsurances } from "./Components/Utils";
import Home from "./Components/Home";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableTemporaryDrawer from "./Components/SideBar";

function App() {
  // All Data from fetch request
  const [allPrescriptions, setAllPrescriptions] = React.useState([]);
  const [allInsurances, setAllInsurances] = React.useState([]);
  // Media queries to set width
  let tablet = useMediaQuery("(min-width:600px)");
  let desktop = useMediaQuery("(min-width:900px)");

  // On app load: Set allPrescriptions and allInsurances
  React.useEffect(() => {
    fetchAllPrescriptions(setAllPrescriptions);
    fetchAllInsurances(setAllInsurances);
  }, []);
  return (
    <div className="App">
      <NavBar />
      <SwipeableTemporaryDrawer />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/prescriptions"
          element={
            <Home
              dataName="Prescription"
              tablet={tablet}
              desktop={desktop}
              homeTitle="myPrescriptions"
              allPrescriptions={allPrescriptions}
              allInsurances={allInsurances}
              setAllPrescriptions={setAllPrescriptions}
              setAllInsurances={setAllInsurances}
            />
          }
        />
        <Route
          path="/insurances"
          element={
            <Home
              dataName="Insurance"
              tablet={tablet}
              desktop={desktop}
              homeTitle="myInsurances"
              allPrescriptions={allPrescriptions}
              allInsurances={allInsurances}
              setAllPrescriptions={setAllPrescriptions}
              setAllInsurances={setAllInsurances}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
