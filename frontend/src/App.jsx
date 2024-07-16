import HomePage from './components/homePage/HomePage.jsx'
import ForYouPage from './components/forYouPage/ForYouPage.jsx'
import NearbyPage from './components/nearbyPage/NearbyPage.jsx'
import EventsAttendingPage from './components/eventAttendingPage/EventsAttendingPage.jsx'
import FavoriteEventsPage from './components/favoriteEventsPage/FavoriteEventsPage.jsx'
import EventPage from './components/eventPage/EventPage.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import SignupPage from './components/signUpPage/SignUpPage.jsx'
import UserPage from './components/userPage/UserPage.jsx'
import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

// TODO:
// Put urls in and .env file
// Some kind of email format validation, so that entries like foo@bar can't be used as email
// Enforce pattern matching for password, e.g must have a symbol
// GET LOCATION OF EVENT (LAT & LONG)

function App() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) ?? null
    )

    const updateUser = (newUser) => {
        setUser(newUser)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <div>
            <UserContext.Provider value={{ user, updateUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/SignUp" element={<SignupPage />} />
                        <Route path="/Home" element={<HomePage />} />
                        <Route
                            path="/ForYou"
                            element={<ForYouPage user={user} />}
                        />
                        <Route
                            path="/Nearby"
                            element={<NearbyPage user={user} />}
                        />
                        <Route
                            path="/Attending"
                            element={<EventsAttendingPage />}
                        />
                        <Route
                            path="/Favorites"
                            element={<FavoriteEventsPage />}
                        />
                        <Route path="/Login" element={<LoginPage />} />
                        <Route path="/Event/:id" element={<EventPage />} />
                        <Route path="/user/:id" element={<UserPage />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}

export default App
