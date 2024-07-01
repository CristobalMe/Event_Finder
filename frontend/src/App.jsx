import HomePage from "./components/homePage/HomePage.jsx"
import ForYouPage from "./components/forYouPage/ForYouPage.jsx"
import NearbyPage from "./components/nearbyPage/NearbyPage.jsx"
import EventsAttendingPage from "./components/eventAttendingPage/EventsAttendingPage.jsx"
import FavoriteEventsPage from "./components/favoriteEventsPage/FavoriteEventsPage.jsx"
import InitialPage from "./components/initialPage/InitialPage.jsx"
import SignupPage from "./components/signUpPage/SignUpPage.jsx"
import { Router, Route, Routes } from 'react-router-dom';

{/* testing for user auth */}
import LoginForm from "./components/LoginForm/LoginForm.jsx"
import SignupForm from "./components/SignupForm/SignupForm.jsx"
import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { BrowserRouter } from 'react-router-dom';

// TODO: 
// Login/signup routing logic (Needs to complete user auth)
// Redundant code with the creation of InitialHeader (Needs to complete user auth)
// Change parameters of EventsCarousel (Needs to complete data models and user auth first)
// Put urls in and .env file 
// Some kind of email format validation, so that entries like foo@bar can't be used as email
// Enforce pattern matching for password, e.g must have a symbol

function App() {

  const [user, setUser] = useState(localStorage.getItem('user') ?? null);

  const updateUser = (newUser) => {
    setUser(newUser);
    //console.log(user)
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
    //console.log(user)
  }, [user]);


  return (
    <div>
      <UserContext.Provider value={{ user, updateUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/SignUp" element={<SignupPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/ForYou" element={<ForYouPage />} />
            <Route path="/Nearby" element={<NearbyPage />} />
            <Route path="/Attending" element={<EventsAttendingPage />} />
            <Route path="/Favorites" element={<FavoriteEventsPage />} />

            {/* testing for user auth */}
            <Route path="/1" element={<LoginForm />} />
            <Route path="/2" element={<SignupForm />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App