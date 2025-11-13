import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activePage, setActivePage] = useState("Home");

    // Auto adjust sidebar by screen width
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
        <div className={darkMode ? "dark" : ""}>
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

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                favorites={[]}
                watchLater={[]}
                activePage={activePage}
                setActivePage={setActivePage}
                collapsed={collapsed}
            />

            <main
                className={`transition-all duration-300 dark:bg-gray-950 bg-gray-50 min-h-screen p-4 ${collapsed ? "md:ml-20" : "md:ml-64"
                    }`}
            >
                <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
                    {activePage}
                </h1>
            </main>
        </div>
    );
}
