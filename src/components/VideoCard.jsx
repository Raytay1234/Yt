import React, { useRef, useState, useMemo } from "react";
import { Heart, Clock, Share2, Play } from "lucide-react";
import { motion as Motion } from "framer-motion";

export default function VideoCard({
  video,
  favorites,
  setFavorites,
  watchLater,
  setWatchLater,
}) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Generate a random view count for demo purposes
  const viewCount = useMemo(() => {
    const views = Math.floor(Math.random() * 900000) + 10000; // 10K - 910K
    if (views >= 1000000) return (views / 1000000).toFixed(1) + "M views";
    if (views >= 1000) return (views / 1000).toFixed(1) + "K views";
    return views + " views";
  }, []);

  if (!video) return null;

  const isFavorite = favorites?.some((fav) => fav.id === video.id);
  const isWatchLater = watchLater?.some((vid) => vid.id === video.id);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === video.id)
        ? prev.filter((fav) => fav.id !== video.id)
        : [...prev, video]
    );
  };

  const toggleWatchLater = () => {
    setWatchLater((prev) =>
      prev.some((vid) => vid.id === video.id)
        ? prev.filter((vid) => vid.id !== video.id)
        : [...prev, video]
    );
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) playPromise.catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
      {/* Video preview */}
      <div
        className="relative w-full h-48 overflow-hidden group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          className="w-full h-full object-cover"
          muted
          preload="metadata"
          loop
          playsInline
        />

        {/* Hover overlay with play icon */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40"
        >
          <Play size={40} className="text-white drop-shadow-lg" />
        </Motion.div>
      </div>

      {/* Video info */}
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
              {video.channel} • {viewCount}
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
