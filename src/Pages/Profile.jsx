import React from "react";

export default function Profile() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Favorites: 10 videos</p>
        <p>Watch Later: 5 videos</p>
      </div>
    </div>
  );
}
