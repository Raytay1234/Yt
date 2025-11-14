import React, { useState } from "react";
import {
    FaUpload,
    FaBell,
    FaUserCircle,
    FaSun,
    FaMoon,
    FaBars,
    FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function Header({
    darkMode,
    setDarkMode,
    sidebarOpen,
    setSidebarOpen,
    collapsed,
    setCollapsed,
    searchQuery,
    setSearchQuery,
    user,
    setUser,
}) {
    const navigate = useNavigate();
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleHamburger = () => {
        if (window.innerWidth < 768) setSidebarOpen(!sidebarOpen);
        else setCollapsed(!collapsed);
    };

    const handleProfileClick = () => {
        if (!user) navigate("/login");
        else setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setProfileDropdownOpen(false);
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex items-center justify-between px-2 sm:px-4 py-2 gap-2 sm:gap-3">

                {/* Left: Hamburger & Logo */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button
                        onClick={handleHamburger}
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Toggle Sidebar"
                    >
                        <FaBars size={20} />
                    </button>

                    {/* Logo Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="w-20 sm:w-24 cursor-pointer select-none p-0"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                            alt="Logo"
                            className="w-full h-full"
                        />
                    </button>
                </div>

                {/* Center: Search */}
                <div className="flex-1 flex items-center justify-center relative">
                    <div
                        className={clsx(
                            "flex w-full max-w-md sm:max-w-lg transition-all duration-300",
                            mobileSearchOpen && "absolute left-2 right-2 z-40"
                        )}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className={clsx(
                                "flex-1 p-2 rounded-l border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
                                mobileSearchOpen ? "" : "hidden sm:flex"
                            )}
                        />
                        <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-r hover:bg-gray-300 dark:hover:bg-gray-600 hidden sm:flex">
                            <FaSearch />
                        </button>
                    </div>

                    {!mobileSearchOpen && (
                        <button
                            onClick={() => setMobileSearchOpen(true)}
                            className="sm:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <FaSearch />
                        </button>
                    )}

                    {mobileSearchOpen && (
                        <button
                            className="sm:hidden absolute right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 z-50"
                            onClick={() => setMobileSearchOpen(false)}
                        >
                            ✖
                        </button>
                    )}
                </div>

                {/* Right: Upload, Notifications, Profile, DarkMode */}
                <div className="flex items-center gap-1 sm:gap-3 shrink-0 relative">
                    <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <FaUpload size={20} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <FaBell size={20} />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={handleProfileClick}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors overflow-hidden w-9 h-9"
                        >
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="User Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <FaUserCircle size={28} className="text-gray-600 dark:text-gray-300" />
                            )}
                        </button>

                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 flex flex-col">
                                <button
                                    onClick={() => {
                                        navigate("/user-profile");
                                        setProfileDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    Profile
                                </button>

                                <button
                                    onClick={() => {
                                        navigate("/settings");
                                        setProfileDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    Settings
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>
                </div>
            </div>
        </header>
    );
}
