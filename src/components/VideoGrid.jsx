import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import VideoCard from "./VideoCard";

export default function VideoGrid({
  searchQuery = "",
  favorites,
  setFavorites,
  watchLater,
  setWatchLater,
  selectedFilter = "All",
}) {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  // Channel & category mapping
  const channelData = useMemo(
    () => ({
      TechZone: { topic: "technology gadgets", category: "Technology" },
      UrbanVibes: { topic: "city lifestyle", category: "Lifestyle" },
      GoWild: { topic: "wildlife nature", category: "Nature" },
      DevNest: { topic: "programming coding", category: "Technology" },
      CreativeHub: { topic: "art design creativity", category: "Art" },
      NomadLife: { topic: "travel adventure", category: "Travel" },
      PlayGround: { topic: "gaming esports", category: "Gaming" },
      SkyVision: { topic: "drone aerial", category: "Technology" },
      Artify: { topic: "painting sculpture", category: "Art" },
      NextGenMedia: { topic: "film production studio", category: "Entertainment" },
    }),
    []
  );

  const channels = useMemo(() => Object.keys(channelData), [channelData]);

  // Generate mock videos
  const generateVideos = useCallback(() => {
    return channels.map((channel) => {
      const { topic, category } = channelData[channel];
      const randomThumb = Math.floor(Math.random() * 1000);
      return {
        id: `${channel}-${page}-${randomThumb}`,
        title: `${channel} Presents: ${topic.split(" ")[0]} Highlights #${page}`,
        channel,
        thumbnail: `https://picsum.photos/320/180?random=${randomThumb}`,
        category,
      };
    });
  }, [page, channelData, channels]);

  // Load videos
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setVideos((prev) => [...prev, ...generateVideos()]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [page, generateVideos]);

  // Infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    [loading]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "200px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Filter videos by search query AND selected filter
  const filteredVideos = videos.filter(
    (v) =>
      (selectedFilter === "All" || v.category === selectedFilter) &&
      (v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channel.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              favorites={favorites}
              setFavorites={setFavorites}
              watchLater={watchLater}
              setWatchLater={setWatchLater}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No videos found
          </p>
        )}

        {/* Loader */}
        <div ref={loader} className="col-span-full flex justify-center py-10">
          {loading && (
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-gray-500"></div>
          )}
        </div>
      </div>
    </div>
  );
}
