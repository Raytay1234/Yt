import React from "react";
import VideoCard from "./VideoCard";

export default function VideoGrid() {
  const videos = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    thumbnail: `https://placehold.co/300x180?text=Video+${i + 1}`,
    title: `Video Title ${i + 1}`,
    channel: `Channel ${i + 1}`,
    views: `${Math.floor(Math.random() * 1000)}K views`,
    uploaded: `${Math.floor(Math.random() * 10)} days ago`,
  }));

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
