import logo from "./logo.png"
import { Link } from "react-router-dom"

const SignInForm = ({}) => {
    return(
        <div className="rounded overflow-hidden shadow-lg bg-white h-[25rem] w-[20rem]">
            
            <div className="px-3 py-4 flex flex-col justify-center items-center">
                    <img className="h-[5rem] w-[6rem] mb-2" src={logo} />
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="username" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="password" placeholder="********" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Link to="/Home"><button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">Sign In</button></Link>
                            <Link to="/SignUp"><button className="text-blue-950 hover:text-blue-700 font-bold py-2 px-4 rounded " type="button">Sign Up</button></Link>
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default SignInForm;


