import HomePage from './components/homePage/HomePage.jsx'
import ForYouPage from './components/forYouPage/ForYouPage.jsx'
import NearbyPage from './components/nearbyPage/NearbyPage.jsx'
import EventsAttendingPage from './components/eventAttendingPage/EventsAttendingPage.jsx'
import EventPage from './components/eventPage/EventPage.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import SignupPage from './components/signUpPage/SignUpPage.jsx'
import UserPage from './components/userPage/UserPage.jsx'
import RideshareEventForm from './components/rideshareEventForm/RideshareEventForm.jsx'
import RidesharePage from './components/ridesharePage/RidesharePage.jsx'
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
                        <Route path="/" element={<HomePage user={user} />} />
                        <Route
                            path="/SignUp"
                            element={<SignupPage user={user} />}
                        />
                        <Route
                            path="/Home"
                            element={<HomePage user={user} />}
                        />
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
                            element={<EventsAttendingPage user={user} />}
                        />
                        <Route
                            path="/Login"
                            element={<LoginPage user={user} />}
                        />
                        <Route
                            path="/Event/:id"
                            element={<EventPage user={user} />}
                        />
                        <Route
                            path="/user/:id"
                            element={<UserPage user={user} />}
                        />
                        <Route
                            path="/ridesharing/form/:eventId"
                            element={<RideshareEventForm user={user} />}
                        />
                        <Route
                            path="/ridesharing/manage/:rideshareId"
                            element={<RidesharePage user={user} />}
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}

export default App
