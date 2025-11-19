import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function ProfilePage() {
  const { user, updateUser, logoutUser } = useContext(AuthContext);
  
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || "/default-avatar.png"
  );

  // Sync avatarPreview with user.avatar changes
  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user.avatar);
      console.log("✅ Avatar loaded from user:", user.avatar);
    }
  }, [user]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("📤 Uploading file:", file.name);

    // Preview locally (temporary)
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axios.put(
        `http://localhost:5000/api/user/avatar/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Avatar uploaded successfully:", res.data.avatar);
      
      // Update context and localStorage with full URL
      updateUser({ avatar: res.data.avatar });
      setAvatarPreview(res.data.avatar);
      
    } catch (err) {
      console.error("❌ Failed to upload avatar:", err);
      alert("Failed to upload avatar. Please try again.");
      // Reset to previous avatar
      setAvatarPreview(user.avatar || "/default-avatar.png");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 p-6 flex justify-center items-center">
        <div className="text-gray-700 dark:text-gray-300 text-lg">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 p-6 flex justify-center items-start">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition-colors relative">

        {/* Profile Picture */}
        <div className="relative">
          <img
            src={avatarPreview}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-600 dark:border-purple-500"
            onError={(e) => {
              console.log("❌ Image failed to load, using fallback");
              e.target.src = "/default-avatar.png";
            }}
          />

          <label htmlFor="avatarInput" className="absolute bottom-1 right-1 bg-purple-600 dark:bg-purple-500 p-2 rounded-full shadow-md hover:bg-purple-700 dark:hover:bg-purple-600 cursor-pointer transition-colors">
            <PencilSquareIcon className="w-5 h-5 text-white" />
          </label>

          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Greeting */}
        <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100">
          Hi, {user.name}
        </h2>

        {/* User Details */}
        <div className="mt-4 w-full">
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Email:</span>
            <span className="text-gray-900 dark:text-gray-100">{user.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Phone:</span>
            <span className="text-gray-900 dark:text-gray-100">{user.phone}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Member since:</span>
            <span className="text-gray-900 dark:text-gray-100">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="mt-6 w-full px-6 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}