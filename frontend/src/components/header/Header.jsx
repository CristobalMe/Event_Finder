import './Header.css'
import SearchBar from '../searchBar/SearchBar';
import React, { useState } from "react";
import {Menu, X} from "lucide-react"
import { Link } from "react-router-dom"

const NavLinksNotLogged = () => {
  return(
    <>
      <Link to="/SignUp">Sign Up</Link>
      <Link to="/Login">Login</Link>
    </>
  );
};

const NavLinksLogged = () => {
  return(
    <>
      <Link to="/Favorites" className='pr-8'>Favorites</Link>
      <Link to="/Attending" className='pr-8'>Attending</Link>
      <Link to="/Nearby" className='pr-8'>Nearby</Link>
      <Link to="/ForYou" className='pr-8'>For you</Link>
    </>
  );
};



const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
    
    return (
      <div>
        <header className='sticky top-0 z-[1] mx-auto flex w-full max-w-2xl:max-w-7xl flex-wrap items-center justify-between bg-background p-[2em] font-sans font-bold backdrop-blur-[100px] bg-slate-900 text-white'>
                <div className='mr-10 ml-10'>
                  <h2 className='font-bebas text-3xl'>Event finder</h2>
                </div>

                <div className='mr-1'>
                  <SearchBar />
                </div>

                <div className='flex flex-[1] items-center justify-end flex-wrap items-center'>
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
  