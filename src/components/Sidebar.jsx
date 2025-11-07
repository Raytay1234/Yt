import React, { useState } from "react";
import {
    FaHome,
    FaFire,
    FaVideo,
    FaRegBookmark,
    FaHistory,
    FaTimes,
} from "react-icons/fa";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const [activeMenu, setActiveMenu] = useState("Home");

    const mainMenu = [
        { name: "Home", icon: <FaHome /> },
        { name: "Trending", icon: <FaFire /> },
        { name: "Subscriptions", icon: <FaVideo /> },
    ];

    const libraryMenu = [
        { name: "Library", icon: <FaRegBookmark /> },
        { name: "History", icon: <FaHistory /> },
    ];

    const renderMenu = (menu) => (
        <ul className="flex flex-col gap-1">
            {menu.map((item) => (
                <li
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
                        ${
                            activeMenu === item.name
                                ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                >
                    <span className="text-lg">{item.icon}</span>
                    <span className="hidden sm:inline">{item.name}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* Dim background overlay when sidebar is open (mobile only) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar container */}
            <aside
                className={`
                    fixed md:static top-16 left-0
                    h-[calc(100vh-4rem)] w-64
                    bg-gray-100 dark:bg-gray-800
                    z-50 md:z-20
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    flex flex-col justify-between
                    overflow-y-auto
                    shadow-lg md:shadow-none
                `}
            >
                {/* Close button (mobile only) */}
                <div className="flex justify-end md:hidden mb-4 pr-1">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <FaTimes size={22} />
                    </button>
                </div>

                {/* Sidebar content */}
                <div className="flex-1">
                    <div className="mb-4">
                        <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2 hidden sm:block">
                            Main
                        </h2>
                        {renderMenu(mainMenu)}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2 hidden sm:block">
                            Library
                        </h2>
                        {renderMenu(libraryMenu)}
                    </div>
                </div>

                {/* Footer links */}
                <div className="mt-auto text-xs text-gray-500 dark:text-gray-400 pb-3 sm:block">
                    <p className="mb-1 cursor-pointer hover:underline">Settings</p>
                    <p className="mb-1 cursor-pointer hover:underline">Help</p>
                    <p className="cursor-pointer hover:underline">Send feedback</p>
                </div>
            </aside>
        </>
    );
}
