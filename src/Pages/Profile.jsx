import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";

export default function Profile({ user, setUser, favorites = [], watchLater = [], history = [] }) {
  const [activeTab, setActiveTab] = useState("Liked"); // Liked, Watch Later, History
  const navigate = useNavigate();

  const tabs = [
    { name: "Liked", count: favorites.length },
    { name: "Watch Later", count: watchLater.length },
    { name: "History", count: history.length },
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const renderVideos = (videos) => {
    if (!videos || videos.length === 0) {
      return (
        <p className="text-gray-500 dark:text-gray-400">
          {activeTab === "Liked" && "You haven't liked any videos yet."}
          {activeTab === "Watch Later" && "You haven't added any videos to watch later."}
          {activeTab === "History" && "You haven't watched any videos yet."}
        </p>
      );
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
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.email || "User"}&background=ff0000&color=fff&size=128`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user?.email || "Anonymous User"}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {favorites.length + watchLater.length} Videos • 0 Subscribers
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
        {tabs.map((tab) => (
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

      {/* Videos */}
      <div>
        {activeTab === "Liked" && renderVideos(favorites)}
        {activeTab === "Watch Later" && renderVideos(watchLater)}
        {activeTab === "History" && renderVideos(history)}
      </div>
    </div>
  );
}
