import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

import Dashboard from "./pages/Dashboard";
import { LoginPage } from "./pages/auth/Login/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword/ResetPassword";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
