import HomePage from "./components/homePage/HomePage.jsx"
import ForYouPage from "./components/forYouPage/ForYouPage.jsx"
import NearbyPage from "./components/nearbyPage/NearbyPage.jsx"
import AttendingPage from "./components/attendingPage/AttendingPage.jsx"
import FavoritesPage from "./components/favoritesPage/FavoritesPage.jsx"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (

      
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ForYou" element={<ForYouPage />} />
        <Route path="/Nearby" element={<NearbyPage />} />
        <Route path="/Attending" element={<AttendingPage />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
      </Routes>
      
    </Router>

  )
}

export default App