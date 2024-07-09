import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import logo from "./logo.png";

const SignupForm = () => {
  const url = import.meta.env.VITE_URL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the signup API request
      const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;

        // Reset form fields
        setUsername("");
        setEmail("");
        setPassword("");

        // Update the user context
        updateUser(loggedInUser);

        // Navigate to the home page after successful login
        navigate("/");
      } else {
        // Handle signup failure case
        alert("Signup failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Signup failed: " + error);
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white h-[35rem] w-[20rem]">
      <div className="px-3 py-4 flex flex-col justify-center items-center">
        <h2 className="block text-blue-950 font-bold mb-2">Sign Up</h2>
        <img className="h-[5rem] w-[6rem] mb-2" src={logo} />
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <p className="block text-gray-800 text-xs">
              (Must contain: 1 Symbol, 1 Uppercase)
            </p>
            <input
              type="password"
              placeholder="********"
              id="password"
              value={password}
              className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
          >
            Sign Up
          </button>
          <div className="flex items-center justify-between mt-[1rem]">
            <p className="block text-gray-800 text-sm font-bold ">
              Already have an account?{" "}
              <Link to="/Login" className="text-blue-950 hover:text-blue-700">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
