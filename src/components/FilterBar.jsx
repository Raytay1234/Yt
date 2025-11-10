import React from "react";
import clsx from "clsx";

export default function FilterBar({ selectedFilter, setSelectedFilter }) {
    const filters = [
        "All", "Technology", "Gaming", "Music", "Art",
        "Travel", "Lifestyle", "Nature", "Entertainment",
        "Education", "Sports", "News",
    ];

    return (
        <div className="w-full overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-16 z-40">
            <div className="flex gap-3 px-4 py-2 whitespace-nowrap">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={clsx(
                            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                            selectedFilter === filter
                                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                                : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
}
