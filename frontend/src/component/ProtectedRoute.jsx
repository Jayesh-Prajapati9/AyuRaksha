import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateState, logoutUserSuccess } from "../redux/user/userSlice";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsAuthenticated(data.success);
        if (data.success && data.user) {
          dispatch(authenticateState(data.user));
        } else {
          dispatch(logoutUserSuccess());
          setIsAuthenticated(false);
        }
      } catch (error) {
        dispatch(logoutUserSuccess());
        setIsAuthenticated(false);
        console.log("Unauthorized");
      }
    };

    verifyUser();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        {/* <LoaderCircle className="disabled" /> */}
        <p>Loading..</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
