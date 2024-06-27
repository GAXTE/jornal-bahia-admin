import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

import Dashboard from "./pages/Dashboard";
import { LoginPage } from "./pages/auth/Login/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword/ResetPassword";
import { News } from "./pages/NewsPage/NewsPage";
import { Categories } from "./pages/CategoriesPage/CategoriesPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/password" element={<ResetPassword />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
}

export default App;
