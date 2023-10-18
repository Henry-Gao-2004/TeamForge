import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegisterPage";
//import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  //  user object == null -> show a sign in button
  // user object != null -> show a log out button

  // if anything in the array changes, the "useEffect" runs again. if no change, "useEffect runs only once."

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegistrationPage />} />
          {/* <Route path="/HomePage" element={<HomePage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
