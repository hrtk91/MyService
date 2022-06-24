import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth, useAuthService } from "../../context";

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
      <h1>Home</h1>
      <div className="row">
        <div className="col">
          <Link to="/">Home</Link> | <Link to="/app">App</Link> |{" "}
          <Link to="/test">Test</Link> | <Link to="/mypost">MyPost</Link>
        </div>
        <div className="col-auto pe-4">
          {auth.isAuthenticated() ? (
            <Link to="/signout">Signout</Link>
          ) : (
            <>
              <Link to="/signin">Signin</Link> |{" "}
              <Link to="/signup">Signup</Link>
            </>
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
