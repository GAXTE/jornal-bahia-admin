import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import { UserProvider } from "./providers/UserContext";
import App from "./App";
import { CategoryProvider } from "./providers/CategoryContext";
import { PostProvider } from "./providers/PostContext";
import { TagsProvider } from "./providers/TagsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <PostProvider>
            <CategoryProvider>
              <TagsProvider>
                <App />
              </TagsProvider>
            </CategoryProvider>
          </PostProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
