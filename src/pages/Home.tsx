import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";

import Heading from "../components/Heading";

export const Home = () => {
  return (
    <div className="text-[#e6f1ff] py-10 px-40 flex flex-col items-center">
      <Heading />
      <p className="text-xl leading-8 my-7 text-center mb-16">No complicated sign-ups or subscriptions needed. Our platform is designed with simplicity in mind. Simply paste the YouTube link, choose your preferences, and download. It&apos;s that easy!</p>
      <Link
        to="/dashboard"
        className="flex items-center space-x-1 text-[#1a3353] bg-[#e6f1ff] hover:bg-[#1a3353] hover:text-[#e6f1ff] text-xl p-2 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
      >
        <p>
          Get Started
        </p>
        <FaDownload/>
      </Link>
    </div>
  );
};