import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/pages/App";
import Home from "./components/pages/Home";
import Signin from "./components/pages/Signin";
import Test from "./components/pages/Test";
import Signup from "./components/pages/Signup";
import "./styles/index.css";
import MyPost from "./components/pages/MyPost";
import AuthProvider from "./components/templates/AuthProvider";
import RequireAuth from "./components/templates/RequireAuth";
import ServiceProvider from "./components/templates/ServiceProvider";
import Signout from "./components/pages/Signout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/app" element={<App />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signout" element={<Signout />} />
              <Route path="/test" element={<Test />} />
              <Route
                path="/mypost"
                element={
                  <RequireAuth>
                    <MyPost />
                  </RequireAuth>
                }
              />
              <Route
                path="/500"
                element={
                  <main>
                    <h1>500 Internal Server Error</h1>
                  </main>
                }
              />
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
        </AuthProvider>
      </ServiceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
