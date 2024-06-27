import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import { UserProvider } from "./providers/UserContext";
import App from "./App";
import { CategoryProvider } from "./providers/CategoryContext";
import { PostProvider } from "./providers/PostContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <PostProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </PostProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
