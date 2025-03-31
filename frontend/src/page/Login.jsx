// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { LoaderCircle } from "lucide-react";
// import Oauth from "../component/Oauth";

// export default function Login() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const API_URL = import.meta.env.VITE_API_URL;

//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!formData.email || !formData.email.trim()) {
//       toast.error("Email is required");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       toast.error("Invalid email format");
//       return false;
//     }
//     if (!formData.password || !formData.password.trim()) {
//       toast.error("Password is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validate = validateForm();

//     if (!validate) {
//       return;
//     }

//     if (!formData.email || !formData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       setError(null);
//       setLoading(true);
//       const res = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!data.success) {
//         throw new Error(data.message || "Log in failed");
//       }
//       toast.success("Logged in successfull");
//       if (data.success) {
//         navigate("/");
//       }
//     } catch (error) {
//       setError(error.message);
//       console.log(error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };

//   return (
//     <div className="h-screen w-full flex justify-center items-center">
//       <div className="flex p-3 w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-slate-200 rounded-lg h-fit">
//         <div className="flex flex-col h-full w-full">
//           <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
//             <div>
//               <label value="Your email" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 id="email"
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label value="Your password" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 id="password"
//                 onChange={handleChange}
//               />
//             </div>
//             <button gradientDuoTone="greenToBlue" type="submit">
//               {loading ? (
//                 <>
//                   <LoaderCircle size="sm" />
//                   <span>Loading...</span>
//                 </>
//               ) : (
//                 "Log In"
//               )}
//             </button>
//             <Oauth />
//           </form>
//           <div className="flex gap-2 text-sm mt-5">
//             <span>Don't have an account?</span>
//             <Link to="/signup" className="text-blue-500">
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, Mail, Lock } from "lucide-react";
import Oauth from "../component/Oauth";
import { useDispatch } from "react-redux";
import { setUserRole } from "../redux/user/userSlice";
import { UserModal } from "../component/UserModal";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [role, setRole] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    if (!formData.email || !formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password || !formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validateForm();

    if (!validate) {
      return;
    }

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const updatedData = { ...formData, role };
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
      console.log(res)
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Log in failed");
      }
      toast.success("Logged in successfully");
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSelectRole = (role) => {
    setRole(role)
    if (!role || (role !== "user" && role !== "doctor")) {
      console.error("Invalid role selected");
      return;
    }
    dispatch(setUserRole(role));
    setShowModal(false);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 p-4">
      {<>{showModal && <UserModal onSelectRole={handleSelectRole} />}</>}
      {!showModal && <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500">
              Enter your credentials to sign in to your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Oauth />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>}
    </div>
  );
}
