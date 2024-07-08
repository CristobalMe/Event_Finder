import HomePage from './components/homePage/HomePage.jsx'
import ForYouPage from './components/forYouPage/ForYouPage.jsx'
import NearbyPage from './components/nearbyPage/NearbyPage.jsx'
import EventsAttendingPage from './components/eventsAttendingPage/EventsAttendingPage.jsx'
import FavoriteEventsPage from './components/favoriteEventsPage/FavoriteEventsPage.jsx'
import InitialPage from './components/initialPage/InitialPage.jsx'

import SignupPage from './components/SignupPage/SignUpPage.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// TODO:
// login/signup routing logic
// Consolidate Headers in to one
// Fix sign in and sign up the same forms (User flow)
// Fix Carousel data flow
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage />} />
                <Route path="/SignUp" element={<SignupPage />} />
                <Route path="/Home" element={<HomePage />} />
                <Route path="/ForYou" element={<ForYouPage />} />
                <Route path="/Nearby" element={<NearbyPage />} />
                <Route path="/Attending" element={<EventsAttendingPage />} />
                <Route path="/Favorites" element={<FavoriteEventsPage />} />
            </Routes>
        </Router>
    )
}

export default App
