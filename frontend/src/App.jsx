import React, { useState, useEffect } from "react";
import { Home } from "./component/Home";
import AIChatAndScan from "./component/AIScan";
import { Navbar } from "./component/Navbar";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Doctors from "./component/Doctors";
import Profile from "./component/Profile";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Chat from "./component/Chat";
import Call from "./component/Call";
import ProtectedRoute from "./component/ProtectedRoute";
import { connectSocket, disconnectSocket } from "./util/socket";
import ContactUs from "./component/ContactUs";
import Blog from "./component/Blog";

const queryClient = new QueryClient();

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.isAuthenticated) {
      dispatch(connectSocket(user?.currentUser?._id));
    }

    return () => {
      disconnectSocket();
    };
  }, [user?.isAuthenticated, dispatch]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-50">
        <Navbar isOpen={isNavOpen} toggleNav={toggleNav} />
        <main
          className={`flex-1 transition-all duration-300 ${
            isNavOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />

            {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/aiscan" element={<AIChatAndScan />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/call" element={<Call />} />
            {/* </Route> */}

            {!user?.isAuthenticated && (
              <Route path="/signup" element={<Signup />} />
            )}
            {!user?.isAuthenticated && (
              <Route path="/login" element={<Login />} />
            )}

            <Route
              path="*"
              element={<Navigate to={user?.isAuthenticated ? "/" : "/login"} />}
            />
          </Routes>
          <Toaster />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;