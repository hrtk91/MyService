import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/pages/App";
import Home from "./components/pages/Home";
import Signin from "./components/pages/Signin";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/app" element={<App />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="*"
            element={
              <main>
                <h1>404 NotFound</h1>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
