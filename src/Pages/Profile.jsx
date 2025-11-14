import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";

export default function Profile({ user, setUser, favorites = [], watchLater = [], history = [] }) {
  const [activeTab, setActiveTab] = useState("Liked");
  const navigate = useNavigate();

  // Local states for profile details
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [notifications, setNotifications] = useState(user?.notifications || { email: true, push: true });
  const [profileVisibility, setProfileVisibility] = useState(user?.profileVisibility || "public");
  const [twoFA, setTwoFA] = useState(user?.twoFA || false);
  const [avatar, setAvatar] = useState(user?.avatar || "");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
      setNotifications(user.notifications || { email: true, push: true });
      setProfileVisibility(user.profileVisibility || "public");
      setTwoFA(user.twoFA || false);
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderVideos = (videos) => {
    if (!videos || videos.length === 0) {
      const messages = {
        Liked: "You haven't liked any videos yet.",
        "Watch Later": "You haven't added any videos to watch later.",
        History: "You haven't watched any videos yet.",
      };
      return <p className="text-gray-500 dark:text-gray-400">{messages[activeTab]}</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, idx) => (
          <VideoCard key={video.id || idx} video={video} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 w-full flex flex-col gap-6">

      {/* User Info */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatar || `https://ui-avatars.com/api/?name=${username || email || "User"}&background=ff0000&color=fff&size=128`}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-red-600"
            />
            <label className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-1 cursor-pointer hover:bg-red-700 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              ✎
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{username || "Anonymous"}</h1>
            <p className="text-gray-600 dark:text-gray-300">{email}</p>
            <p className="text-gray-600 dark:text-gray-300">
              Visibility: {profileVisibility.charAt(0).toUpperCase() + profileVisibility.slice(1)} •
              {twoFA ? " 2FA Enabled" : " 2FA Disabled"}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Notifications: {notifications.email ? "Email " : ""}{notifications.push ? "Push" : ""}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-300 dark:border-gray-700">
        {[{ name: "Liked", count: favorites.length }, { name: "Watch Later", count: watchLater.length }, { name: "History", count: history.length }].map((tab) => (
          <button
            key={tab.name}
            className={`pb-2 font-semibold transition-colors ${activeTab === tab.name
              ? "border-b-2 border-red-600 text-red-600 dark:text-red-400"
              : "text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
              }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name} {tab.count > 0 && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div>
        {activeTab === "Liked" && renderVideos(favorites)}
        {activeTab === "Watch Later" && renderVideos(watchLater)}
        {activeTab === "History" && renderVideos(history)}
      </div>
    </div>
  );
}
