import React from "react";

const Profile = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Profile</h2>
    <div className="bg-white p-6 rounded-lg shadow space-y-2">
      <p>
        <strong>Name:</strong> John Doe
      </p>
      <p>
        <strong>Location:</strong> Bengaluru
      </p>
      <p>
        <strong>Skills:</strong> React, Node.js, TailwindCSS
      </p>
      <p>
        <strong>Rating:</strong> ⭐ 4.8
      </p>
      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Edit Profile
      </button>
    </div>
  </div>
);

export default Profile;