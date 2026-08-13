/** @format */

import { Toaster } from "react-hot-toast";

import Router from "./router/Router";

export default function App() {
  return (
    <>
      {" "}
      <Router />
      <Toaster position="top-center" />
    </>
  );
}
