import HomePage from "./components/homePage/HomePage.jsx"
import ForYouPage from "./components/forYouPage/ForYouPage.jsx"
import NearbyPage from "./components/nearbyPage/NearbyPage.jsx"
import AttendingPage from "./components/attendingPage/AttendingPage.jsx"
import FavoritesPage from "./components/favoritesPage/FavoritesPage.jsx"
import InitialPage from "./components/initialPage/InitialPage.jsx"
import SignupPage from "./components/signUpPage/SignUpPage.jsx"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (

      
    <Router>

      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/SignUp" element={<SignupPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/ForYou" element={<ForYouPage />} />
        <Route path="/Nearby" element={<NearbyPage />} />
        <Route path="/Attending" element={<AttendingPage />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
      </Routes>
      
    </Router>

  )
}

export default App