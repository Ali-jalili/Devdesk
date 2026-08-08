/** @format */

import { AuthProvider } from "./app/context/AuthContext";
import Router from "./app/router/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
