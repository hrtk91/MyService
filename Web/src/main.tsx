import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/pages/App";
import Home from "./components/pages/Home";
import Signin from "./components/pages/Signin";
import Test from "./components/pages/Test";
import Signup from "./components/pages/Signup";
import { ServiceContext } from "./context";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/app" element={<App />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/test"
            element={
              <ServiceContext.Consumer>
                {(context) => <Test httpClient={context.httpClient} />}
              </ServiceContext.Consumer>
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
    </BrowserRouter>
  </React.StrictMode>
);
