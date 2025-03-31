import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OtpInput from "../component/OtpInput";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Loader2, User, Mail, Lock } from "lucide-react";
import Oauth from "../component/Oauth";
import { UserModal } from "../component/UserModal";
import { useDispatch } from "react-redux";
import { setUserRole } from "../redux/user/userSlice";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const API_URL = import.meta.env.VITE_API_URL;

  const validateForm = () => {
    if (!formData.username || formData.username.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return false;
    }
    if (formData.username?.length < 4 || formData.username?.length > 20) {
      toast.error("Username must be between 4 and 20 characters");
    }

    if (formData.username?.includes(" ")) {
      toast.error("Username cannot contain spaces");
    }

    if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      toast.error("Username can only contain letters and numbers");
      return false;
    }
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
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const createNewUser = async () => {
    setEmail(null);
    setLoading(true);
    const updatedData = { ...formData, role };
    console.log(updatedData)
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Signup failed");
      toast.success("Signup successful");
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEmail(null);
    }
  };

  const handleSubmit = async (e) => {
    setEmail(null);
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
      setLoading(true);
      const response = await fetch(`${API_URL}/otp/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Signup failed");
      toast.success(data?.message || "OTP sent successfully");
      setEmail("done");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (otp) => {
    try {
      setLoading(true);
      const form = {
        email: formData.email,
        otp: otp,
      };
      const res = await fetch(`${API_URL}/otp/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data?.message || "OTP verification failed");
        return;
      }
      toast.success(data?.message || "OTP verified successfully");
      setEmail(null);
      createNewUser();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleBackbutton = () => {
    setEmail(null);
  };

  const handleSelectRole = (role) => {
    setRole(role)
    dispatch(setUserRole(role));
    setShowModal(false);
  };

  return (
    <>
      {
        <>
          {showModal && <UserModal onSelectRole={handleSelectRole} />}
        </>
      }
      {!showModal && (email === "done" ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
            <button
              type="button"
              onClick={handleBackbutton}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HiOutlineArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <OtpInput
              onSubmit={handleOTPSubmit}
              loading={loading}
              sendOtp={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  Create an account
                </h1>
                <p className="text-gray-500">
                  Enter your details to get started
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

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
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
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
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Password must be at least 8 characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    "Sign Up"
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
