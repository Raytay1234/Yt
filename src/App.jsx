import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";
import WatchLater from "./Pages/WatchLater";
import Favorites from "./Pages/Favorites";
import Footer from "./components/Footer";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [activePage, setActivePage] = useState("Home");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Dark mode effect
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 w-full transition-colors duration-300 flex flex-col">
      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* FilterBar */}
      <FilterBar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

      <div className="flex flex-1 w-full pt-16 sm:pt-0">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          favorites={favorites}
          watchLater={watchLater}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* Main Content */}
        <main className="flex-1 p-2 sm:p-4 w-full overflow-auto">
          {activePage === "Watch Later" ? (
            <WatchLater
              watchLater={watchLater}
              favorites={favorites}
              setFavorites={setFavorites}
              setWatchLater={setWatchLater}
            />
          ) : activePage === "Liked Videos" ? (
            <Favorites
              favorites={favorites}
              watchLater={watchLater}
              setFavorites={setFavorites}
              setWatchLater={setWatchLater}
            />
          ) : (
            <VideoGrid
              searchQuery={searchQuery}
              favorites={favorites}
              setFavorites={setFavorites}
              watchLater={watchLater}
              setWatchLater={setWatchLater}
              selectedFilter={selectedFilter} // pass filter to grid if needed
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
