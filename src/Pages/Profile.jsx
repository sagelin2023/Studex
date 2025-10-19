import React from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Profile</h1>
        {user ? (
          <p className="text-gray-700 text-lg">
            Logged in as <span className="font-semibold text-indigo-600">{user.email}</span>
          </p>
        ) : (
          <p className="text-gray-500">You are not logged in.</p>
        )}
      </div>
    </main>
  );
};

export default Profile;