import HomePage from "./components/homePage/HomePage.jsx";
import ForYouPage from "./components/forYouPage/ForYouPage.jsx";
import NearbyPage from "./components/nearbyPage/NearbyPage.jsx";
import EventsAttendingPage from "./components/eventAttendingPage/EventsAttendingPage.jsx";
import FavoriteEventsPage from "./components/favoriteEventsPage/FavoriteEventsPage.jsx";
import EventPage from "./components/eventPage/EventPage.jsx";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import SignupPage from "./components/signUpPage/SignUpPage.jsx";
import UserPage from "./components/userPage/UserPage.jsx" 
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter } from "react-router-dom";
import { Router, Route, Routes } from "react-router-dom";

// TODO:
// Change parameters of EventsCarousel (Needs to complete data models and user auth first)
// Put urls in and .env file
// Some kind of email format validation, so that entries like foo@bar can't be used as email
// Enforce pattern matching for password, e.g must have a symbol
// GET LOCATION OF EVENT (LAT & LONG)
// Update event Model (Ask for date of the event)

// DONE
// Login/signup routing logic
// Redundant code with the creation of InitialHeader

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null,
  );

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem("user", JSON.stringify(user));
    console.log(localStorage.getItem("user"));
    // console.log(typeof localStorage.getItem('user'));
    // console.log(String === typeof localStorage.getItem('user') instanceof String);
  }, [user]);

  return (
    <div>
      <UserContext.Provider value={{ user, updateUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignUp" element={<SignupPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/ForYou" element={<ForYouPage />} />
            <Route path="/Nearby" element={<NearbyPage />} />
            <Route path="/Attending" element={<EventsAttendingPage />} />
            <Route path="/Favorites" element={<FavoriteEventsPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Event/:id" element={<EventPage />} />
            <Route path="/User/:id" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
