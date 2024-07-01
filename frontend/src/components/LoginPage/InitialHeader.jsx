import { Link } from "react-router-dom"

const NavLinks = () => {
    return(
      <>
        <Link to="/SignUp">Sign Up</Link>
      </>
    );
  };



const InitialHeader = () => {
    return (
      <div >
        <header className='fixed z-[1] top-0 w-full flex flex-wrap items-center justify-between bg-background p-[2em] font-sans font-bold backdrop-blur-[100px] bg-slate-900 text-white'>
                <div className='m-3 items-center'>
                  <h2 className='font-bebas text-xl text-3xl'>Event finder</h2>
                </div>

                <div className='content-center pl-[2rem]'>
                  <div className="hidden justify-end lg:flex" id='component'>
                      <NavLinks />
                  </div>

                </div>
        </header>
      </div>
    );
  };
  
  export default InitialHeader;
  