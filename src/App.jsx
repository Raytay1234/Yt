import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";
import WatchLater from "./Pages/WatchLater";
import Favorites from "./Pages/Favorites";
import Footer from "./components/Footer";
import FilterBar from "./components/FilterBar";

export default function App() {
  // 🌓 Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile overlay sidebar
  const [collapsed, setCollapsed] = useState(false); // tablet/desktop collapse
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [activePage, setActivePage] = useState("Home");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // 🌓 Apply dark mode
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 🧭 Auto adjust sidebar layout based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
        setSidebarOpen(false);
      } else if (window.innerWidth < 1024) {
        setCollapsed(true);
        setSidebarOpen(false);
      } else {
        setCollapsed(false);
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 w-full transition-colors duration-300 flex flex-col">
      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Filter bar (below header) */}
      <FilterBar
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="flex flex-1 w-full pt-16 sm:pt-0">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          favorites={favorites}
          watchLater={watchLater}
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={collapsed}
        />

        {/* Main Content */}
        <main
          className={`flex-1 p-2 sm:p-4 w-full overflow-auto transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"
            }`}
        >
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
              selectedFilter={selectedFilter}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
