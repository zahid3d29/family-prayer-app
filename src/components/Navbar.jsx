import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="border-b p-4 flex gap-4">
      <Link to="/">Dashboard</Link>

      <Link to="/register">
        Register
      </Link>

      <Link to="/profile">
        Profile
      </Link>
    </div>
  );
}