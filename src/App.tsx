/** @format */

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/context/AuthContext";
import Router from "./app/router/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}
