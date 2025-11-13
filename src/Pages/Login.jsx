import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple demo: save user locally
        const user = { email };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // go to home
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                >
                    Login
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Don't have an account? <Link to="/signup" className="text-red-600 hover:underline">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}
