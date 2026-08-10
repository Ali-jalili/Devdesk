/** @format */

import Home from "@/page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "@/page/Signup";
import Login from "@/page/Login";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "@/page/Dashboard";
import PublicLayout from "../layouts/PublicLayout";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
