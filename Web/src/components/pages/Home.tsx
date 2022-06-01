import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/">Home</Link> |{" "}
      <Link to="/app">App</Link> |{" "}
      <Link to="/signin">Signin</Link> |
      <Outlet/>
    </div>
  );
}
