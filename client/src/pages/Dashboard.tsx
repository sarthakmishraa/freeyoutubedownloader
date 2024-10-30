import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";

import Heading from "../components/Heading";
import { LoadingSearchButton } from "../components/LoadingSearchButton";
import { ValidUrl } from "../components/ValidUrl";

export interface videoInfoType {
    videoId: string,
    title: string,
    thumbnail: string,
}

export const Dashboard = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [isAudio, setIsAudio] = useState<boolean>(false);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);

    const backendURL = import.meta.env.VITE_backendURL;

    const handleFindVideo = async () => {
        if(url && url.length>0) {
            setSearching(true);

            const urlData = {
                "videoUrl": url,
                "isAudio": isAudio
            };

            try {
                const response = await fetch(backendURL, {
                    mode: "cors",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(urlData)
                });

                const blob = await response.blob();
                const audioBlobUrl = URL.createObjectURL(blob);
                setMediaUrl(audioBlobUrl);
                setIsUrlValid(true);
            }
            catch(error) {
                console.log(error);
                toast.dark("Something went wrong");
            }
            setSearching(false);
        }
    }

    return(
        <div className="space-y-8 text-[#e6f1ff] py-10 px-40 flex flex-col items-center">
            <Heading />
            <input
                placeholder="Enter URL"
                className="p-2 mt-10 m-6 rounded-lg w-[50%] text-gray-800"
                onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex space-x-4 text-xl">
                <input
                    className="w-[22px]"
                    onChange={() => setIsAudio(!isAudio)}
                    type="checkbox"
                />
                <p>Check this to get only Audio</p>
            </div>
            <div className="flex space-x-4">
                {
                    searching ? (
                        <LoadingSearchButton />
                    ):(
                        <button
                            className="text-[#1a3353] bg-[#e6f1ff] hover:bg-[#1a3353] hover:text-[#e6f1ff] text-xl p-2 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
                            onClick={ handleFindVideo }
                        >
                            <div className="flex flex-row items-center space-x-1">
                                <p>Find Video</p>
                                <FaSearch />
                            </div>
                        </button>
                    )
                }
                <Link
                    to="/"
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
            <div>
                {
                    mediaUrl &&
                    (isAudio ? (
                        <audio controls src={ mediaUrl }></audio>
                    ):(
                        <video controls src={ mediaUrl }></video>
                    ))
                }
            </div>
        </div>
    )
};