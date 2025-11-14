import React from "react";
import { Clock, Heart, History, ListVideo } from "lucide-react";
import VideoCard from "../components/VideoCard";

export default function Library({
  favorites,
  watchLater,
  history,
  setFavorites,
  setWatchLater,
}) {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Library</h1>

      {/* History */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <History size={22} />
          <h2 className="text-xl font-semibold">History</h2>
        </div>

        {history?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {history.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                favorites={favorites}
                setFavorites={setFavorites}
                watchLater={watchLater}
                setWatchLater={setWatchLater}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No history yet.</p>
        )}
      </section>

      {/* Watch Later */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Clock size={22} />
          <h2 className="text-xl font-semibold">Watch Later</h2>
        </div>

        {watchLater.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {watchLater.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                favorites={favorites}
                setFavorites={setFavorites}
                watchLater={watchLater}
                setWatchLater={setWatchLater}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No saved videos.</p>
        )}
      </section>

      {/* Favorites */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Heart size={22} />
          <h2 className="text-xl font-semibold">Liked Videos</h2>
        </div>

        {favorites.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                favorites={favorites}
                setFavorites={setFavorites}
                watchLater={watchLater}
                setWatchLater={setWatchLater}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No liked videos.</p>
        )}
      </section>

      {/* Playlists */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <ListVideo size={22} />
          <h2 className="text-xl font-semibold">Playlists</h2>
        </div>

        <p className="text-gray-500">No playlists created yet.</p>
      </section>
    </div>
  );
}
