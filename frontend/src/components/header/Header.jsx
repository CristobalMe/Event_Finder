import SearchBar from '../searchBar/SearchBar'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext.js'
import { useContext } from 'react'

const NavLinksLogged = () => {
    const { updateUser } = useContext(UserContext)

    const handleLogOut = async () => {
        updateUser(null)
    }
    return (
        <>
            <Link
                to="/"
                className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogOut}
            >
                Log out
            </Link>
            <Link to="/Attending" className="py-2 px-4">
                Attending
            </Link>
            <Link to="/Nearby" className="py-2 px-4">
                Nearby
            </Link>
            <Link to="/ForYou" className="py-2 px-4">
                For you
            </Link>
            <Link to="/" className="py-2 px-4">
                Home
            </Link>
        </>
    )
}

const NavLinksNotLogged = () => {
    return (
        <>
            <Link to="/SignUp" className="py-2 px-4">
                Sign Up
            </Link>
            <Link to="/Login" className="py-2 px-4">
                Log In
            </Link>
            <Link to="/" className="py-2 px-4">
                Home
            </Link>
        </>
    )
}

const Header = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false)
    let Logged = false
    let userId = null

    if (user != null && user != 'null') {
        Logged = true
        userId = user.id
    }

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <header className="fixed z-[1] top-0 w-full flex flex-wrap items-center justify-between bg-background p-[2em] font-sans font-bold backdrop-blur-[100px] bg-slate-900 text-white">
                <div className="m-3 items-center">
                    <h2 className="font-bebas text-xl text-3xl">
                        Event finder
                    </h2>
                </div>

                {Logged && (
                    <Link to={`/user/${userId}`}>
                        <img
                            className="w-10 h-10 rounded-full"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        />
                    </Link>
                )}

                {Logged && (
                    <div className="hidden mr-1 content-center text-black lg:flex">
                        <SearchBar />
                    </div>
                )}

                <div className="content-center">
                    {Logged && (
                        <div
                            className="hidden justify-end lg:flex"
                            id="component"
                        >
                            <NavLinksLogged />
                        </div>
                    )}

                    {!Logged && (
                        <div
                            className="hidden justify-end lg:flex"
                            id="component"
                        >
                            <NavLinksNotLogged />
                        </div>
                    )}

                    <div className="flex w-[75px] justify-end lg:hidden">
                        <button onClick={toggleNavbar}>
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>

                    {isOpen && Logged && (
                        <div className="flex flex-col items-center items-center basis-full">
                            <NavLinksLogged />
                        </div>
                    )}

                    {isOpen && !Logged && (
                        <div className="flex flex-col items-center items-center basis-full">
                            <NavLinksNotLogged />
                        </div>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header
