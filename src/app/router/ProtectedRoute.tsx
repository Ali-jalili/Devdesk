/** @format */

import Spinner from "@/ui/Spinner";

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
