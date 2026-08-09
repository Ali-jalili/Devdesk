/** @format */

import Spinner from "@/ui/Spinner";
import useAuth from "./context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
