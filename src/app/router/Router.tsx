/** @format */

import Home from "@/page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    element: <div>Signup</div>,
  },

  {
    path: "/dashboard",
    element: <div>Dashboard</div>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
