import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context";

export default function Home() {
  const auth = useAuth();

  useEffect(() => {
    console.log("Home update auth");
  }, [auth]);

  return (
    <div>
      <div className="row">
        <div className="col-auto">
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
        <div className="col-auto ms-auto pe-4">
          {auth.isAuthenticated() ? (
            <>
              <span>Logged in by {auth.token?.userId}</span>
              <Link to="/signout">Signout</Link>
            </>
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
      <hr className="m-1" />
      <Outlet />
    </div>
  );
}
