"use client";

import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { toast } from "react-toastify";
import { useState } from "react";
import ytdl from "ytdl-core";

import Heading from "../components/Heading";
import { LoadingSearchButton } from "../components/LoadingSearchButton";
import { VideoInfo } from "../components/VideoInfo";
import { ValidUrl } from "../components/ValidUrl";

export interface videoInfoType {
    videoId: string,
    title: string,
    thumbnail: string,
}

const Dashboard = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [videoInfo, setVideoInfo] = useState<videoInfoType | null>(null);

    const handleDownload = async () => {
        try {
            if(url){
                const videoId = ytdl.getURLVideoID(url);
                const isValid = ytdl.validateID(videoId);
                setIsUrlValid(isValid);
                toast.success("URL verified");

                if(isValid){
                    setSearching(true);
                    const response = await fetch(`/api?url=${ encodeURIComponent(url) }`).then(res => res.json());
                    // console.log(response);
                    const tempVideoInfo = {
                        videoId: videoId,
                        title: response.title,
                        thumbnail: response.thumbnail
                    };
                    setSearching(false);
                    setVideoInfo(tempVideoInfo);
                }
                else {
                    setSearching(false);
                    toast.error("URL is invalid");
                }
            }
            else {
                toast.error("Please enter a url");
            }
        }
        catch(error) {
            console.log(error);
            toast.error("URL is not valid");
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
                {
                    searching ? (
                        <LoadingSearchButton />
                    ):(
                        <button
                            className="text-[#1a3353] bg-[#e6f1ff] hover:bg-[#1a3353] hover:text-[#e6f1ff] text-xl p-2 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
                            onClick={ handleDownload }
                        >
                            <div className="flex flex-row items-center space-x-1">
                                <p>Find Video</p>
                                <FaSearch />
                            </div>
                        </button>
                    )
                }
                <Link
                    href="/"
                    className="text-[#1a3353] bg-[#e6f1ff] hover:bg-[#1a3353] hover:text-[#e6f1ff] text-xl p-2 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
                >
                    <div className="flex flex-row items-center space-x-1">
                        <p>Go back to Home</p>
                        <IoHome />
                    </div>
                </Link>
            </div>
            {
                isUrlValid &&
                <ValidUrl />
            }
            {
                videoInfo &&
                <VideoInfo videoInfo={ videoInfo } />
            }
        </div>
    )
};

export default Dashboard;