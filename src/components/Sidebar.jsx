import React from "react";
import { FaHome, FaFire, FaVideo, FaRegBookmark, FaHistory, FaClock, FaThumbsUp, FaTimes } from "react-icons/fa";
import clsx from "clsx";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  favorites,
  watchLater,
  activePage,
  setActivePage,
}) {
  const mainMenu = [
    { name: "Home", icon: <FaHome /> },
    { name: "Trending", icon: <FaFire /> },
    { name: "Shorts", icon: <FaVideo /> },
    { name: "Subscriptions", icon: <FaVideo /> },
  ];

  const libraryMenu = [
    { name: "Library", icon: <FaRegBookmark /> },
    { name: "History", icon: <FaHistory /> },
    { name: `Watch Later${watchLater.length ? ` (${watchLater.length})` : ""}`, icon: <FaClock /> },
    { name: `Liked Videos${favorites.length ? ` (${favorites.length})` : ""}`, icon: <FaThumbsUp /> },
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
              "flex items-center gap-3 p-2 rounded-r-full cursor-pointer transition-colors whitespace-nowrap",
              activePage === menuName
                ? "bg-red-100 dark:bg-red-900 font-semibold border-l-4 border-red-600"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            <span className="flex-1 truncate">{item.name}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 z-50 md:z-20 transform transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto shadow-lg md:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end md:hidden mb-4 pr-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="w-20 sm:w-24"
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
