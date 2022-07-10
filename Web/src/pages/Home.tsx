import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth, useAuthService } from "../context";

export default function Home() {
  const auth = useAuth();
  const authService = useAuthService();
  const [userId, setUserId] = useState("");

  const getUserId = () =>
    auth.isAuthenticated() ? authService.userId(auth.token) : "";

  useEffect(() => {
    setUserId(getUserId());
  });

  return (
    <div>
      <div className="row">
        <div className="col">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/app" className="nav-link">
                App
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/test" className="nav-link">
                Test
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mypost" className="nav-link">
                MyPost
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-auto pe-4">
          {auth.isAuthenticated() ? (
            <Link to="/signout">Signout</Link>
          ) : (
            <ul className="nav nav-pills">
              <li className="nav-link">
                <Link className="btn btn-secondary" to="/signin">
                  Signin
                </Link>
              </li>
              <li className="nav-link">
                <Link className="btn btn-secondary" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      {userId !== "" ? (
        <p>
          Logged in by {userId} : {}
        </p>
      ) : (
        <p>Not loggined</p>
      )}
      <Outlet />
    </div>
  );
}
