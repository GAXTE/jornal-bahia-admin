import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import { LoginPage } from "./pages/auth/Login/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword/ResetPassword";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { CategoriesPage } from "./pages/CategoriesPage/CategoriesPage";
import { TagsPage } from "./pages/TagsPage/TagsPage";
import { AddsPage } from "./pages/AddsPage/AddsPage";
import { TeamPage } from "./pages/TeamPage/TeamPage";
import { RouterMain } from "./Routes/Routes";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <RouterMain />
    </>
  );
}

export default App;
