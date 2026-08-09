/** @format */

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Router from "./router/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}
