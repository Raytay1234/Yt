import React, { useState } from "react";

export default function Settings({ user, setUser }) {
    const [email, setEmail] = useState(user?.email || "");
    const [username, setUsername] = useState(user?.username || "");
    const [password, setPassword] = useState("");
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
    });
    const [profileVisibility, setProfileVisibility] = useState("public");
    const [twoFA, setTwoFA] = useState(false);

    const handleSave = () => {
        const updatedUser = {
            ...user,
            email,
            username,
            notifications,
            profileVisibility,
            twoFA,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Settings saved!");
    };

    const handleDeleteAccount = () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This action is irreversible."
            )
        ) {
            localStorage.removeItem("user");
            setUser(null);
            alert("Account deleted!");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Settings
            </h1>

            {/* Account Section */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-6 transition hover:shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Account
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-600 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-600 dark:text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="font-medium text-gray-600 dark:text-gray-300">
                            Change Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-4 transition hover:shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Notifications
                </h2>
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={() =>
                                setNotifications({ ...notifications, email: !notifications.email })
                            }
                            className="w-5 h-5 accent-red-500"
                        />
                        Email Notifications
                    </label>

                    <label className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={notifications.push}
                            onChange={() =>
                                setNotifications({ ...notifications, push: !notifications.push })
                            }
                            className="w-5 h-5 accent-red-500"
                        />
                        Push Notifications
                    </label>
                </div>
            </section>

            {/* Privacy & Security */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-4 transition hover:shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Privacy & Security
                </h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-600 dark:text-gray-300">
                            Profile Visibility
                        </label>
                        <select
                            value={profileVisibility}
                            onChange={(e) => setProfileVisibility(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="friends">Friends Only</option>
                        </select>
                    </div>

                    <label className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={twoFA}
                            onChange={() => setTwoFA(!twoFA)}
                            className="w-5 h-5 accent-red-500"
                        />
                        Enable Two-Factor Authentication
                    </label>
                </div>
            </section>

            {/* Save & Danger Zone */}
            <div className="flex flex-col gap-6">
                <button
                    onClick={handleSave}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition w-fit shadow-md"
                >
                    Save Changes
                </button>

                <section className="bg-red-50 dark:bg-red-900 p-6 rounded-xl shadow-md flex flex-col gap-3 transition hover:shadow-lg">
                    <h2 className="text-xl font-semibold text-red-700 dark:text-red-300">
                        Danger Zone
                    </h2>
                    <p className="text-red-600 dark:text-red-400">
                        Delete your account permanently. This action cannot be undone.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition w-fit shadow-md"
                    >
                        Delete Account
                    </button>
                </section>
            </div>
        </div>
    );
}
