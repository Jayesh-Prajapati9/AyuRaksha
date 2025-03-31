import React, { useEffect, useRef, useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../util/fetchUser";
import ProfileSkeleton from "../component/skeleton/ProfileSkeleton";
import { MdOutlineCameraAlt } from "react-icons/md";
import uploadImage from "../util/uploadImage";
import toast from "react-hot-toast";
import { updateSuccess, updateUserSuccess } from "../redux/user/userSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData1, setFormData1] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [coverImage, setIsCoverImageUploading] = useState(false);
  const [change, setChange] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const user = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(
    user?.currentUser?.profileImage
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress] = useState('');

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userErrorMessage,
  } = useQuery({
    queryKey: ["dashUser", user?.currentUser?._id],
    queryFn: fetchUser,
    enabled: user?.isAuthenticated,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setProfileImage(userData?.data?.profilePicture);
  }, [userData]);

  const handleImageClick = () => {
    if (!isUploading) {
      fileInputRef?.current?.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  useEffect(() => {
    if (imageFile) {
      const updateImage = async () => {
        let imageUrl = await uploadImage({
          imageFile,
          setIsUploading,
          setFormData1,
          setImageFile,
          formData1,
          setIsCoverImageUploading,
        });
        if (imageUrl) {
          updateProfile(imageUrl);
        }
      };
      updateImage();
    }
  }, [imageFile]);

  const handleUpdateClick = async () => {
    try {
      const res = await fetch(
        `${API_URL}/user/update/profile/${user?.currentUser?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email,
            address,
            number: tel,
            profilePicture: profileImage,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update profile");
      }
      console.log(data?.data);
      dispatch(updateSuccess(data?.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
    }
  };

  const updateProfile = async (imageUrl) => {
    try {
      const res = await fetch(
        `${API_URL}/user/update/${user?.currentUser?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePicture: imageUrl }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error(res.statusText);
        return;
      }

      const data = await res?.json();

      if (!data?.success) {
        toast(data?.message);
        return { success: false, data: [] };
      } else {
        setProfileImage(imageUrl);
        dispatch(updateUserSuccess(imageUrl));
        toast.success("Image updated successfully");
      }
    } catch (error) {
      console.log("error", error.message);
      toast.error(error.message);
    } finally {
      setImageFile(null);
    }
  };

  if (userLoading) {
    return (
      <>
        <ProfileSkeleton />
      </>
    );
  }

  if (userError) {
    return <div>Error: {userErrorMessage.message}</div>;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response?.ok) {
        toast.error(response?.statusText);
        return;
      }

      if (!data?.success) {
        toast(data?.message);
        return;
      } else {
        dispatch(logoutUserSuccess());
        persistor.purge();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Appointments data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "March 30, 2025",
      time: "10:30 AM",
      type: "Video Consultation",
    },
    {
      id: 2,
      doctor: "Dr. Emily Rodriguez",
      date: "April 5, 2025",
      time: "2:00 PM",
      type: "In-person Visit",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Michael Chen",
      date: "March 15, 2025",
      time: "9:15 AM",
      type: "Video Consultation",
      status: "Completed",
    },
    {
      id: 4,
      doctor: "Dr. Robert Kim",
      date: "March 10, 2025",
      time: "11:45 AM",
      type: "In-person Visit",
      status: "Completed",
    },
  ];

  // Medical records data
  const medicalRecords = [
    {
      id: 1,
      title: "Annual Physical Examination",
      date: "March 15, 2025",
      doctor: "Dr. Michael Chen",
      type: "Examination",
    },
    {
      id: 2,
      title: "Blood Test Results",
      date: "March 15, 2025",
      doctor: "Dr. Michael Chen",
      type: "Laboratory",
    },
    {
      id: 3,
      title: "Brain MRI Scan",
      date: "February 28, 2025",
      doctor: "Dr. Michael Chen",
      type: "Imaging",
    },
    {
      id: 4,
      title: "Cardiology Consultation",
      date: "January 20, 2025",
      doctor: "Dr. Sarah Johnson",
      type: "Consultation",
    },
  ];

  // Render header with user info
  const renderHeader = () => (
    <div className="bg-gradient-to-r from-primary-dark to-primary text-white p-4 flex items-center">
      <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-gray-400">
        <img
          src={profileImage}
          alt=""
          className={`w-32 h-32 rounded-full object-cover ${
            isUploading ? "opacity-60" : ""
          }`}
        />
      </div>
      <div className="ml-4">
        <h1 className="text-xl font-bold">abcd</h1>
        <p className="text-sm">abcd@gmail.com</p>
        <p className="text-sm">9874563215</p>
      </div>
    </div>
  );

  // Navigation tabs
  const renderNavigation = () => (
    <div className="flex border-b">
      <button
        onClick={() => setActiveTab("appointments")}
        className={`p-4 flex items-center ${
          activeTab === "appointments"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-700"
        }`}
      >
        <Calendar size={18} className="mr-2" />
        Appointments
      </button>
      <button
        onClick={() => setActiveTab("records")}
        className={`p-4 flex items-center ${
          activeTab === "records"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-700"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Medical Records
      </button>
      <button
        onClick={() => setActiveTab("settings")}
        className={`p-4 flex items-center ${
          activeTab === "settings"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-700"
        }`}
      >
        <Users size={18} className="mr-2" />
        Profile Settings
      </button>
    </div>
  );

  // Appointments tab content
  const renderAppointmentsTab = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-blue-800 font-semibold">
          Your Appointments
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Book New Appointment
        </button>
      </div>

      <h3 className="font-semibold text-lg mb-4 text-blue-800">
        Upcoming Appointments
      </h3>
      <div className="space-y-4 mb-8">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border rounded-lg p-4 flex items-center"
          >
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-2xl text-gray-400">·</span>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-blue-800">
                {appointment.doctor}
              </h4>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar size={14} className="mr-1" />
                <span>{appointment.date}</span>
                <Clock size={14} className="ml-3 mr-1" />
                <span>{appointment.time}</span>
                <span className="ml-3">{appointment.type}</span>
              </div>
            </div>
            <div className="ml-auto flex">
              <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded mr-2">
                Reschedule
              </button>
              <button className="border border-red-500 text-red-500 px-3 py-1 rounded">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-lg mb-4 text-blue-800">
        Past Appointments
      </h3>
      <div className="space-y-4">
        {pastAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border rounded-lg p-4 flex items-center"
          >
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-2xl text-gray-400">·</span>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-blue-800">
                {appointment.doctor}
              </h4>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar size={14} className="mr-1" />
                <span>{appointment.date}</span>
                <Clock size={14} className="ml-3 mr-1" />
                <span>{appointment.time}</span>
                <span className="ml-3">{appointment.type}</span>
              </div>
            </div>
            <div className="ml-auto">
              <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Medical Records tab content
  const renderMedicalRecordsTab = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-blue-800 font-semibold">Medical Records</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search records..."
            className="border rounded-lg p-2 pl-4 pr-10 w-full"
          />
          <svg
            className="absolute right-3 top-3 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 uppercase text-sm">
            <th className="pb-2">Title</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Doctor</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="py-4 text-blue-800">{record.title}</td>
              <td className="py-4 text-gray-600">{record.date}</td>
              <td className="py-4 text-gray-600">{record.doctor}</td>
              <td className="py-4">
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    record.type === "Examination"
                      ? "bg-blue-100 text-blue-700"
                      : record.type === "Laboratory"
                      ? "bg-blue-100 text-blue-700"
                      : record.type === "Imaging"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {record.type}
                </span>
              </td>
              <td className="py-4">
                <button className="text-blue-600">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Profile Settings tab content
  const renderProfileSettingsTab = () => (
    <div className="p-6">
      <h2 className="text-xl text-blue-800 font-semibold mb-6">
        Profile Settings
      </h2>

      <div className="flex space-x-6">
        <div className="w-1/2 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg text-blue-800 font-semibold mb-4">
            Personal Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setChange(true);
                }}
                className="border rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setChange(true);
                }}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setChange(true);
                }}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                onChange={(e) => {
                  setTel(e.target.value);
                  setChange(true);
                }}
                value={tel}
                className="border rounded w-full p-2"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg text-blue-800 font-semibold mb-4">
            Account Settings
          </h3>

          <div className="flex justify-center mb-1 relative">
            <div
              className="relative group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={profileImage}
                alt=""
                className={`w-32 h-32 rounded-full object-cover ${
                  isUploading ? "opacity-60" : ""
                }`}
              />
              <div className="absolute bottom-0 right-0 bg-slate-700 rounded-full p-1.5 border-2 border-white">
                <MdOutlineCameraAlt className="w-4 h-4 text-white" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <p className="text-center text-sm text-gray-500 mb-8">
            {isUploading
              ? "Uploading.."
              : "Click the camera icon to update your photo"}
          </p>
        </div>
      </div>

      {change && (
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={() => setChange(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdateClick}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="font-sans max-w-6xl mt-8 mx-auto shadow-lg rounded-lg overflow-hidden">
      {renderHeader()}
      {renderNavigation()}

      {activeTab === "appointments" && renderAppointmentsTab()}
      {activeTab === "records" && renderMedicalRecordsTab()}
      {activeTab === "settings" && renderProfileSettingsTab()}
    </div>
  );
};

export default Profile;
