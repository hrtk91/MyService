import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/app">App</Link> |{" "}
      <Link to="/signin">Signin</Link> | <Link to="/signup">Signup</Link> |{" "}
      <Link to="/test">Test</Link> | <Link to="/mypost">MyPost</Link>
      <Outlet />
    </div>
  );
}
