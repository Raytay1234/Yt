import React from "react";
import VideoCard from "../components/VideoCard.jsx";

export default function WatchLater({
  watchLater,
  favorites,
  setFavorites,
  setWatchLater,
}) {
  if (!watchLater || watchLater.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <h2 className="text-2xl font-semibold mb-2">Watch Later is empty</h2>
        <p>Add videos to your Watch Later list to see them here.</p>
      </div>
    );
  }

  // Function to remove all Watch Later videos
  const handleClearWatchLater = () => {
    if (window.confirm("Are you sure you want to remove all from Watch Later?")) {
      setWatchLater([]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Watch Later
        </h2>

        <button
          onClick={handleClearWatchLater}
          className="text-sm px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Remove All
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {watchLater.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            favorites={favorites}
            watchLater={watchLater}
            setFavorites={setFavorites}
            setWatchLater={setWatchLater}
          />
        ))}
      </div>
    </div>
  );
}
