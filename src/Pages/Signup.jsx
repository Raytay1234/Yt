import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }
        const user = { email };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // go to home
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSignup}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    required
                    onChange={(e) => setConfirm(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                >
                    Sign Up
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Already have an account? <Link to="/login" className="text-red-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
}
