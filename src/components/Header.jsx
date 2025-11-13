import React, { useState } from "react";
import {
    FaMicrophone,
    FaUpload,
    FaBell,
    FaUserCircle,
    FaSun,
    FaMoon,
    FaBars,
    FaSearch,
} from "react-icons/fa";

export default function Header({
    darkMode,
    setDarkMode,
    sidebarOpen,
    setSidebarOpen,
    collapsed,
    setCollapsed,
    searchQuery,
    setSearchQuery,
    setActivePage, // <-- add this
}) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const handleHamburger = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(!sidebarOpen); // Mobile: overlay
        } else {
            setCollapsed(!collapsed); // Desktop: collapse
        }
    };

    return (
        <header className="sticky top-0 z-50 shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex items-center justify-between px-2 sm:px-4 py-2 gap-2 sm:gap-3">

                {/* Left: Hamburger & Logo */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={handleHamburger}
                        title="Toggle Sidebar"
                    >
                        <FaBars size={20} />
                    </button>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                        alt="YouTube Logo"
                        className="w-20 sm:w-24 cursor-pointer select-none"
                        onClick={() => setActivePage("Home")} // <-- Go to main page
                    />
                </div>

                {/* Center: Search */}
                <div className="flex-1 flex items-center justify-center relative">
                    {/* Desktop / Tablet Search */}
                    <div
                        className={`flex w-full max-w-md sm:max-w-lg transition-all duration-300 ${mobileSearchOpen ? "absolute left-2 right-2 z-40" : ""
                            }`}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className={`flex-1 p-2 rounded-l border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors text-sm sm:text-base ${mobileSearchOpen ? "rounded-l" : "hidden sm:flex"
                                }`}
                        />
                        <button
                            className={`p-2 bg-gray-200 dark:bg-gray-700 rounded-r hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hidden sm:flex`}
                        >
                            <FaSearch />
                        </button>
                    </div>

                    {/* Mobile Search Icon */}
                    {!mobileSearchOpen && (
                        <button
                            className="sm:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setMobileSearchOpen(true)}
                        >
                            <FaSearch />
                        </button>
                    )}

                    {/* Mobile close button */}
                    {mobileSearchOpen && (
                        <button
                            className="sm:hidden absolute right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-50"
                            onClick={() => setMobileSearchOpen(false)}
                        >
                            ✖
                        </button>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                    <button
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Upload"
                    >
                        <FaUpload size={20} />
                    </button>
                    <button
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Notifications"
                    >
                        <FaBell size={20} />
                    </button>
                    <button
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Profile"
                    >
                        <FaUserCircle size={28} />
                    </button>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        title={darkMode ? "Light Mode" : "Dark Mode"}
                        className="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>
                </div>
            </div>
        </header>
    );
}
