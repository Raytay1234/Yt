import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import VideoCard from "./VideoCard";

export default function VideoGrid({ searchQuery = "", favorites, setFavorites, watchLater, setWatchLater, selectedFilter = "All" }) {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const channelData = useMemo(
    () => ({
      TechZone: {
        topic: "tech gadgets",
        category: "Technology",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2016/11/29/04/16/technology-1867054_1280.jpg"
      },
      UrbanVibes: {
        topic: "city life",
        category: "Lifestyle",
        url: "https://www.w3schools.com/html/movie.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2016/11/29/05/11/buildings-1868197_1280.jpg"
      },
      GoWild: {
        topic: "wildlife",
        category: "Nature",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
      },
      DevNest: {
        topic: "programming",
        category: "Technology",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2014/05/02/21/50/laptop-336704_1280.jpg"
      },
      CreativeHub: {
        topic: "art",
        category: "Art",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2017/08/01/00/28/brushes-2564780_1280.jpg"
      },
      NomadLife: {
        topic: "travel",
        category: "Travel",
        url: "https://www.w3schools.com/html/movie.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2015/03/26/09/54/road-690127_1280.jpg"
      },
      PlayGround: {
        topic: "gaming",
        category: "Gaming",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2015/04/19/08/33/video-games-729335_1280.jpg"
      },
      SkyVision: {
        topic: "drone",
        category: "Technology",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2016/03/09/15/12/drone-1245819_1280.jpg"
      },
      Artify: {
        topic: "painting",
        category: "Art",
        url: "https://www.w3schools.com/html/movie.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2016/11/19/14/00/paint-1836475_1280.jpg"
      },
      NextGenMedia: {
        topic: "film studio",
        category: "Entertainment",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnail: "https://cdn.pixabay.com/photo/2015/09/05/21/51/film-925300_1280.jpg"
      }
    }),
    []
  );



  const channels = useMemo(() => Object.keys(channelData), [channelData]);

  const generateVideos = useCallback(() => {
    return channels.map((channel) => {
      const { topic, category, url } = channelData[channel];
      const randomThumb = Math.floor(Math.random() * 1000);
      return {
        id: `${channel}-${page}-${randomThumb}`,
        title: `${channel}: ${topic} #${page}`,
        channel,
        thumbnail: `https://picsum.photos/320/180?random=${randomThumb}`,
        category,
        url,
      };
    });
  }, [page, channelData, channels]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setVideos((prev) => [...prev, ...generateVideos()]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [page, generateVideos]);

  const handleObserver = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !loading) setPage(prev => prev + 1);
    },
    [loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { root: null, rootMargin: "200px", threshold: 0 });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const filteredVideos = videos.filter(
    (v) =>
      (selectedFilter === "All" || v.category === selectedFilter) &&
      (v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.channel.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredVideos.map(video => video && (
          <VideoCard key={video.id} video={video} favorites={favorites} setFavorites={setFavorites} watchLater={watchLater} setWatchLater={setWatchLater} />
        ))}
        <div ref={loader} className="col-span-full flex justify-center py-10">
          {loading && <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-gray-500"></div>}
        </div>
      </div>
    </div>
  );
}
