import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./Public/PublicRoutes";
import { LoginPage } from "../pages/auth/Login/Login";
import { ForgotPassword } from "../pages/auth/ForgotPassword/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword/ResetPassword";
import { PrivateRoutes } from "./Private/PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import { NewsPage } from "../pages/NewsPage/NewsPage";
import { CategoriesPage } from "../pages/CategoriesPage/CategoriesPage";
import { TagsPage } from "../pages/TagsPage/TagsPage";
import { AddsPage } from "../pages/AddsPage/AddsPage";
import { TeamPage } from "../pages/TeamPage/TeamPage";

export const RouterMain = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/password" element={<ResetPassword />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/adds" element={<AddsPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Route>
    </Routes>
  );
};
