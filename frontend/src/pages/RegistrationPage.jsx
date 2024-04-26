// src/components/RegistrationPage.js
import React, { useState } from "react";
import axios from "axios"; // You'll need to install axios

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff"); // Default to staff role
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        password,
        role,
      });

      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage(error.response.data.message || "Registration Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="staff">Staff</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
          >
            Register
          </button>
          {statusMessage && (
            <p className="mt-2 text-green-500">{statusMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
