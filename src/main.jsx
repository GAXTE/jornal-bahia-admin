import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import { UserProvider } from "./providers/UserContext";
import App from "./App";
import { CategoryProvider } from "./providers/CategoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
