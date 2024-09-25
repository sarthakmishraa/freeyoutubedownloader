"use client";

import Link from "next/link";
import { FaDownload } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

import { useState } from "react";
import ytdl from "ytdl-core";

import Heading from "../components/Heading";

const Dashboard = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [isUrlValid, setIsUrlValid] = useState<boolean>(false);

    const handleDownload = async () => {
        if(url){
            const videoId = ytdl.getURLVideoID(url);
            const isValid = ytdl.validateID(videoId);
            setIsUrlValid(isValid);
        }
    };

    return(
        <div className="space-y-8 text-[#e6f1ff] py-10 px-40 flex flex-col items-center">
            <Heading />
            <input
                placeholder="Enter URL"
                className="p-2 mt-10 m-6 rounded-lg w-[50%] text-gray-800"
                onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex space-x-4">
                <button
                    className="text-[#1a3353] bg-[#e6f1ff] hover:bg-[#1a3353] hover:text-[#e6f1ff] text-xl p-1 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
                    onClick={ handleDownload }
                >
                    <div className="flex flex-row items-center space-x-1">
                        <p>Download</p>
                        <FaDownload />
                    </div>
                </button>
                <Link
                    href="/"
                    className="text-[#1a3353] bg-[#e6f1ff] hover:bg-[#1a3353] hover:text-[#e6f1ff] text-xl p-1 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
                >
                    <div className="flex flex-row items-center space-x-1">
                        <p>Go back to Home</p>
                        <IoHome />
                    </div>
                </Link>
            </div>
            {
                isUrlValid &&
                <div className="text-xl flex items-center space-x-1">
                    <FaCheckCircle size={28} color="lightgreen" />
                    <p>URL is valid</p>
                </div>
            }
        </div>
    )
};

export default Dashboard;