import SearchBar from '../searchBar/SearchBar';
import React, { useState } from "react";
import {Menu, X} from "lucide-react"
import { Link } from "react-router-dom"

const NavLinksLogged = () => {
  return(
    <>
      <Link to="/Favorites" className='pr-8'>Favorites</Link>
      <Link to="/Attending" className='pr-8'>Attending</Link>
      <Link to="/Nearby" className='pr-8'>Nearby</Link>
      <Link to="/ForYou" className='pr-8'>For you</Link>
      <Link to="/Home" className='pr-8'>Home</Link>
    </>
  );
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
    
    return (
      <div >
        <header className='fixed z-[1] top-0 w-full flex flex-wrap items-center justify-between bg-background p-[2em] font-sans font-bold backdrop-blur-[100px] bg-slate-900 text-white'>
                <div className='m-10 items-center sm:m-2 '>
                  <h2 className='font-bebas text-xl sm:text-3xl'>Event finder</h2>
                </div>

                <div className='mr-1 content-center text-black'>
                  <SearchBar />
                </div>

                <div className='content-center'>
                  <div className="hidden justify-end lg:flex" id='component'>
                      <NavLinksLogged />
                  </div>

                  <div className="flex w-[75px] justify-end lg:hidden">
                    <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
                  </div>

                  {isOpen && (
                    <div className='flex flex-col items-center items-center basis-full'>
                      <NavLinksLogged />
                    </div>
                  )}
                </div>
        </header>
      </div>
    );
};
  
export default Header;
  