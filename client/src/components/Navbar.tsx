import { Link } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";

const Navbar = () => {
    return(
        <nav className="text-xl flex justify-around p-2 font-semibold bg-[#b1bac9]">
            <Link className="flex flex-row items-center space-x-1" to="/">
                <IoHome />
                <p className="cursor-pointer hover:underline">Home</p>
            </Link>
            <Link className="flex flex-row items-center space-x-1" to="/dashboard">
                <FaDownload />
                <p className="cursor-pointer hover:underline">Get Started</p>
            </Link>
        </nav>
    )
};

export default Navbar;