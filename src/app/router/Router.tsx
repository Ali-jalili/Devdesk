/** @format */

import Home from "@/page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Signup from "@/page/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard</div>,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
