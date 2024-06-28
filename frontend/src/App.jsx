import HomePage from "./components/homePage/HomePage.jsx"
import ForYouPage from "./components/forYouPage/ForYouPage.jsx"
import NearbyPage from "./components/nearbyPage/NearbyPage.jsx"
import EventAttendingPage from "./components/eventAttendingPage/EventAttendingPage.jsx"
import FavoriteEventsPage from "./components/favoriteEventsPage/FavoriteEventsPage.jsx"
import InitialPage from "./components/initialPage/InitialPage.jsx"
import SignupPage from "./components/signUpPage/SignUpPage.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

{/* testing for user auth */}
import LoginForm from "./components/LoginForm/LoginForm.jsx"
import SignupForm from "./components/SignupForm/SignupForm.jsx"
import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';


function App() {

  const [user, setUser] = useState(() => {
    // Retrieve the user data from storage or set it to null if not found
    const storedUser = localStorage.getItem('user');
    // return storedUser ? JSON.parse(storedUser) : null;
    return null
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  return (
    <div>
      <UserContext.Provider value={{ user, updateUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/SignUp" element={<SignupPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/ForYou" element={<ForYouPage />} />
            <Route path="/Nearby" element={<NearbyPage />} />
            <Route path="/Attending" element={<EventAttendingPage />} />
            <Route path="/Favorites" element={<FavoriteEventsPage />} />

            {/* testing for user auth */}
            <Route path="/1" element={<LoginForm />} />
            <Route path="/2" element={<SignupForm />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App