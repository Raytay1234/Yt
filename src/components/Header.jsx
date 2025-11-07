import React from "react";
import {
    FaMicrophone,
    FaUpload,
    FaBell,
    FaUserCircle,
    FaSun,
    FaMoon,
    FaBars
} from "react-icons/fa";

export default function Header({
    darkMode,
    setDarkMode,
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery
}) {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">

            <div className="flex items-center gap-3">
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    title="Menu"
                >
                    <FaBars size={24} />
                </button>

                <div className="text-xl font-bold text-red-600 select-none cursor-pointer">
                    YouTube
                </div>
            </div>

            <div className="flex-1 flex justify-center px-2">
                <div className="w-full max-w-xl flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="flex-1 p-2 rounded-l border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors"
                    />
                    <button
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-r hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        title="Search"
                    >
                        Search
                    </button>

                    <button
                        className="ml-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        title="Search by voice"
                    >
                        <FaMicrophone />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button title="Upload" className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <FaUpload size={20} />
                </button>
                <button title="Notifications" className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <FaBell size={20} />
                </button>
                <button title="Profile" className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
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
        </header>
    );
}
