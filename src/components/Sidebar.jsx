import React from "react";
import {
  FaHome,
  FaFire,
  FaVideo,
  FaRegBookmark,
  FaHistory,
  FaClock,
  FaThumbsUp,
  FaBars,
  FaUser,
} from "react-icons/fa";
import clsx from "clsx";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  favorites = [],
  watchLater = [],
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
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
    {
      name: `Watch Later${watchLater.length ? ` (${watchLater.length})` : ""}`,
      icon: <FaClock />,
    },
    {
      name: `Liked Videos${favorites.length ? ` (${favorites.length})` : ""}`,
      icon: <FaThumbsUp />,
    },
    { name: "Profile", icon: <FaUser /> }, // Added Profile link
  ];

  const renderMenu = (menu) => (
    <ul className="flex flex-col gap-1">
      {menu.map((item) => {
        const menuName = item.name.replace(/\s\(\d+\)/, "");
        return (
          <li
            key={item.name}
            onClick={() => {
              setActivePage(menuName);
              setSidebarOpen(false); // closes sidebar on mobile
            }}
            className={clsx(
              "relative flex items-center gap-3 p-2 rounded-r-full cursor-pointer transition-all whitespace-nowrap overflow-hidden group",
              activePage === menuName
                ? "bg-red-100 dark:bg-red-900 font-semibold border-l-4 border-red-600"
                : "hover:bg-gray-200 dark:hover:bg-gray-700",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            <span
              className={clsx(
                "flex-1 truncate transition-all duration-300",
                collapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
              )}
            >
              {item.name}
            </span>

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
      {/* Mobile Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:sticky top-0 md:top-16 left-0 h-full md:h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 z-50 md:z-20 transform transition-all duration-300 flex flex-col justify-between overflow-y-auto shadow-lg md:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Collapse toggle (desktop/tablet) */}
        <div className="hidden md:flex justify-end p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FaBars />
          </button>
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
