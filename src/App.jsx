import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";
import WatchLater from "./Pages/WatchLater";
import Favorites from "./Pages/Favorites";
import Profile from "./Pages/Profile";
import Footer from "./components/Footer";
import FilterBar from "./components/FilterBar";
import Library from "./Pages/Library";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Settings from "./Pages/Settings";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [activePage, setActivePage] = useState("Home");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 w-full transition-colors duration-300 flex flex-col">
        {/* Header always visible */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          user={user}
        />

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={user ? <Navigate to="/profile" /> : <Signup setUser={setUser} />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              user ? (
                <Profile
                  user={user}
                  setUser={setUser}   // <-- important
                  favorites={favorites}
                  watchLater={watchLater}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/user-profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
          <Route
            path="/library"
            element={
              user ? (
                <Library
                  favorites={favorites}
                  watchLater={watchLater}
                  history={[]}   // optional for now
                  setFavorites={setFavorites}
                  setWatchLater={setWatchLater}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/"
            element={
              user ? (
                <>
                  <FilterBar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                  <div className="flex flex-1 w-full pt-16 sm:pt-0">
                    <Sidebar
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      favorites={favorites}
                      watchLater={watchLater}
                      activePage={activePage}
                      setActivePage={setActivePage}
                      collapsed={collapsed}
                    />

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
                      ) : activePage === "Profile" && (
                        <Profile
                          user={user}
                          setUser={setUser}     // <-- pass it here too
                          favorites={favorites}
                          watchLater={watchLater}
                        />
                      )}
                      <VideoGrid
                        searchQuery={searchQuery}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        watchLater={watchLater}
                        setWatchLater={setWatchLater}
                        selectedFilter={selectedFilter}
                      />
                    </main>
                  </div>
                  <Footer />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
