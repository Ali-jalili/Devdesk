/** @format */

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
}
