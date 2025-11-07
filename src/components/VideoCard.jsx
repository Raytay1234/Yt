import React from "react";
import { FaPlay } from "react-icons/fa";

export default function VideoCard({ video }) {
    // Randomized mock data for demo purposes
    const randomChannelThumbnail = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
    const randomViews = Math.floor(Math.random() * 1000) + "K views";
    const randomUploaded = Math.floor(Math.random() * 10) + " days ago";

    const randomTitles = [
        "Exploring the Mountains: A Journey Through Nature",
        "Top 10 Coding Tips for Beginners",
        "The Ultimate Guide to Cooking Pasta",
        "Travel Vlog: Discovering Hidden Gems in Europe",
        "How to Build a Gaming PC from Scratch",
        "Yoga for Beginners: A Complete Guide",
        "The History of Ancient Civilizations",
        "DIY Home Decor Ideas on a Budget",
        "Learning Guitar: First Steps for New Players",
        "The Science Behind Climate Change Explained",
    ];

    const randomChannels = [
        "Nature Explorer",
        "Code Academy",
        "Culinary Delights",
        "Wanderlust Vlogs",
        "Tech Builders",
        "Yoga with Me",
        "History Buffs",
        "DIY Creators",
        "Guitar Heroes",
        "Science Simplified",
    ];

    const randomizedVideo = {
        ...video,
        title: randomTitles[Math.floor(Math.random() * randomTitles.length)],
        channel: randomChannels[Math.floor(Math.random() * randomChannels.length)],
        channelThumbnail: randomChannelThumbnail,
        views: randomViews,
        uploaded: randomUploaded,
    };

    return (
        <div className="cursor-pointer group relative transform transition duration-300 hover:scale-105">
            {/* Thumbnail with hover overlay */}
            <div className="relative overflow-hidden rounded-lg aspect-video">
                <img
                    src={randomizedVideo.thumbnail}
                    alt={randomizedVideo.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition duration-300 flex items-center justify-center rounded-lg">
                    <FaPlay className="text-white text-3xl opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
            </div>

            {/* Video info section */}
            <div className="mt-3 flex gap-3 items-start">
                <img
                    src={randomizedVideo.channelThumbnail}
                    alt={randomizedVideo.channel}
                    className="w-10 h-10 rounded-full shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h3
                        className="font-semibold text-sm sm:text-base leading-tight line-clamp-2"
                        title={randomizedVideo.title}
                    >
                        {randomizedVideo.title}
                    </h3>
                    <p
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate"
                        title={randomizedVideo.channel}
                    >
                        {randomizedVideo.channel}
                    </p>
                    <p
                        className="text-xs text-gray-500 dark:text-gray-500 truncate"
                        title={`${randomizedVideo.views} • ${randomizedVideo.uploaded}`}
                    >
                        {randomizedVideo.views} • {randomizedVideo.uploaded}
                    </p>
                </div>
            </div>
        </div>
    );
}
