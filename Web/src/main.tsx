import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Test from "./pages/Test";
import Signup from "./pages/Signup";
import "./styles/index.css";
import MyPost from "./pages/MyPost";
import AuthProvider from "./context/providers/AuthProvider";
import RequireAuth from "./components/templates/RequireAuth";
import ServiceProvider from "./context/providers/ServiceProvider";
import Signout from "./pages/Signout";
import ArticleDetail from "./pages/ArticleDetail";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <MyPost />
                  </RequireAuth>
                }
              />
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
              <Route path="article/detail/:id" element={<ArticleDetail />} />
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
