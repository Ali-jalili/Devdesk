/** @format */

import Home from "@/page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "@/page/Signup";
import Login from "@/page/Login";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";
import DashboardStats from "@/features/dashboard/DashboardStats";
import Workspaces from "@/features/workspaces/Workspaces";
import WorkspaceLayout from "@/features/workspaces/WorkspaceLayout";
import WorkspaceOverview from "@/features/workspaces/WorkspaceOverview";
import CreateWorkspace from "@/features/workspaces/CreateWorkspace ";
import Collections from "@/features/collection/Collections";
import CollectionDetail from "@/features/collection/CollectionDetail";
import CreateRequest from "@/features/requests/CreateRequest";
import RequestDetail from "@/features/requests/RequestDetail";
import Environments from "@/features/environments/Environments";
import EnvironmentDetail from "@/features/environments/EnvironmentDetail";

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
            element: <DashboardStats />,
          },

          {
            path: "workspaces",
            element: <Workspaces />,
          },

          {
            path: "workspaces/new",
            element: <CreateWorkspace />,
          },

          {
            path: "workspaces/:workspaceId",
            element: <WorkspaceLayout />,
            children: [
              {
                index: true,
                element: <WorkspaceOverview />,
              },
              {
                path: "collections",
                element: <Collections />,
              },

              {
                path: "collections/:collectionId",
                element: <CollectionDetail />,
              },
              {
                path: "collections/:collectionId/requests/new",
                element: <CreateRequest />,
              },

              {
                path: "collections/:collectionId/requests/:requestId",
                element: <RequestDetail />,
              },

              {
                path: "environments",
                element: <Environments />,
              },
              {
                path: "environments/:environmentId",
                element: <EnvironmentDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
