import React from "react";
import { Heart, Clock, Share2 } from "lucide-react";

export default function VideoCard({
  video,
  favorites,
  setFavorites,
  watchLater,
  setWatchLater,
}) {
  // Check if this video is already in favorites/watch later
  const isFavorite = favorites.some((fav) => fav.id === video.id);
  const isWatchLater = watchLater.some((vid) => vid.id === video.id);

  // Toggle favorite video object
  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === video.id)
        ? prev.filter((fav) => fav.id !== video.id)
        : [...prev, video]
    );
  };

  // Toggle watch later video object
  const toggleWatchLater = () => {
    setWatchLater((prev) =>
      prev.some((vid) => vid.id === video.id)
        ? prev.filter((vid) => vid.id !== video.id)
        : [...prev, video]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="flex flex-col p-2 gap-1">
        <div className="flex items-start gap-2">
          <img
            src={`https://i.pravatar.cc/40?u=${video.channel}`}
            alt={video.channel}
            className="w-10 h-10 rounded-full shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {video.channel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 text-gray-500 dark:text-gray-400 text-sm">
          <button
            className={`flex items-center gap-1 hover:text-red-500 transition-colors ${isFavorite ? "text-red-500" : ""
              }`}
            onClick={toggleFavorite}
          >
            <Heart size={16} /> {isFavorite ? "Favorited" : "Favorite"}
          </button>

          <button
            className={`flex items-center gap-1 hover:text-blue-500 transition-colors ${isWatchLater ? "text-blue-500" : ""
              }`}
            onClick={toggleWatchLater}
          >
            <Clock size={16} /> {isWatchLater ? "Saved" : "Watch Later"}
          </button>

          <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
