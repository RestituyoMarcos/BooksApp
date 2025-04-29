import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Index() {

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-8 py-5 w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  )
}