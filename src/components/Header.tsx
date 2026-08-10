/** @format */

import useAuth from "@/app/context/useAuth";

import { NavLink } from "react-router-dom";

export default function Header() {
  const { user, handleSignOut } = useAuth();

  return (
    <header>
      <h2>DevDesk</h2>

      {user ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      )}
    </header>
  );
}
