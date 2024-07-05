import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import { useContext } from "react";
import logo from "./logo.png";

const LoginForm = () => {
  const url = import.meta.env.VITE_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the login API request
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;

        // Update the user context
        updateUser(loggedInUser);

        // Navigate to the home page after successful login
        navigate("/");
      } else {
        // Handle the login failure case
        alert("Login failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Login failed: " + error);
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white h-[25rem] w-[20rem]">
      <div className="px-3 py-4 flex flex-col justify-center items-center">
        <h2 className="block text-blue-950 font-bold mb-2">Login</h2>
        <img className="h-[5rem] w-[6rem] mb-2" src={logo} />
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
          <div className="flex items-center justify-between mt-[1rem]">
            <p className="block text-gray-800 text-sm font-bold ">
              New to the app?{" "}
              <Link to="/SignUp" className="text-blue-950 hover:text-blue-700">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
