import React, { useState } from "react";
import {
  FaHome,
  FaFire,
  FaVideo,
  FaRegBookmark,
  FaHistory,
  FaClock,
  FaThumbsUp,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import clsx from "clsx";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  favorites,
  watchLater,
  activePage,
  setActivePage,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const mainMenu = [
    { name: "Home", icon: <FaHome /> },
    { name: "Trending", icon: <FaFire /> },
    { name: "Shorts", icon: <FaVideo /> },
    { name: "Subscriptions", icon: <FaVideo /> },
  ];

  const libraryMenu = [
    { name: "Library", icon: <FaRegBookmark /> },
    { name: "History", icon: <FaHistory /> },
    {
      name: `Watch Later${watchLater.length ? ` (${watchLater.length})` : ""}`,
      icon: <FaClock />,
    },
    {
      name: `Liked Videos${favorites.length ? ` (${favorites.length})` : ""}`,
      icon: <FaThumbsUp />,
    },
  ];

  const renderMenu = (menu) => (
    <ul className="flex flex-col gap-1">
      {menu.map((item) => {
        const menuName = item.name.replace(/\s\(\d+\)/, "");
        return (
          <li
            key={item.name}
            onClick={() => setActivePage(menuName)}
            className={clsx(
              "relative flex items-center gap-3 p-2 rounded-r-full cursor-pointer transition-all whitespace-nowrap overflow-hidden group",
              activePage === menuName
                ? "bg-red-100 dark:bg-red-900 font-semibold border-l-4 border-red-600"
                : "hover:bg-gray-200 dark:hover:bg-gray-700",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            {/* Icon */}
            <span className="text-lg shrink-0">{item.icon}</span>

            {/* Label */}
            <span
              className={clsx(
                "flex-1 truncate transition-all duration-300",
                collapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
              )}
            >
              {item.name}
            </span>

            {/* Tooltip for collapsed */}
            {collapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {item.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-full bg-white dark:bg-gray-900 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* Overlay for mobile */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 z-50 md:z-20 transform transition-all duration-300 flex flex-col justify-between overflow-y-auto shadow-lg md:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Collapse toggle (desktop only) */}
        <div className="hidden md:flex justify-end p-2">
          <button
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className={clsx("transition-all", collapsed ? "w-10" : "w-20 sm:w-24")}
          />
        </div>

        {/* Menu */}
        <div className="flex-1 px-2 mt-4">
          <div className="mb-4">{renderMenu(mainMenu)}</div>
          <hr className="my-3 border-gray-300 dark:border-gray-700" />
          <div className="mb-4">{renderMenu(libraryMenu)}</div>
        </div>
      </aside>
    </>
  );
}
