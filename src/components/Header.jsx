import React from "react";
import { FaMicrophone, FaUpload, FaBell, FaUserCircle, FaSun, FaMoon, FaBars } from "react-icons/fa";

export default function Header({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, searchQuery, setSearchQuery }) {
    return (
        <header className="sticky top-0 z-50 shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-2 sm:gap-0">
                {/* Left: Menu & Logo */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        title="Menu"
                    >
                        <FaBars size={24} />
                    </button>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                        alt="YouTube Logo"
                        className="w-20 sm:w-24 cursor-pointer select-none"
                    />
                </div>

                {/* Center: Search */}
                <div className="flex-1 w-full sm:max-w-xl">
                    <div className="flex w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="flex-1 p-2 rounded-l border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors"
                        />
                        <button
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-r hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hidden sm:block"
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

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                    <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Upload">
                        <FaUpload size={20} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Notifications">
                        <FaBell size={20} />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Profile">
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
