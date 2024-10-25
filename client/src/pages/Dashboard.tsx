import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { useState } from "react";

import Heading from "../components/Heading";
import { LoadingSearchButton } from "../components/LoadingSearchButton";
import { VideoInfo } from "../components/VideoInfo";
import { ValidUrl } from "../components/ValidUrl";

export interface videoInfoType {
    videoId: string,
    title: string,
    thumbnail: string,
}

interface videoFormatType {
    itag: number,
    mimeType: string,
    hasAudio: boolean,
    hasVideo: boolean,
    qualityLabel: string,
    container: string
}

export const Dashboard = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [videoInfo, setVideoInfo] = useState<videoInfoType | null>(null);
    const [videoFormats, setVideoFormats] = useState<videoFormatType[]>([]);
    const [formatToDownload, setFormatToDownload] = useState<string>("videoandaudio");

    const backendURL = "http://localhost:3000/";

    const handleFindVideo = async () => {
        if(url && url.length>0) {
            setSearching(true);

            const response = await fetch(backendURL, {
                mode: "no-cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(url)
            }).then(res => res.json());
            
            // setIsUrlValid based on the response
            setIsUrlValid(response.message);

            console.log(response);
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
            {
                videoInfo &&
                <>
                    <VideoInfo videoInfo={ videoInfo } />
                    <div className="flex flex-col justify-center space-y-4">
                        <p className="text-xl">Select format to download</p>
                        <select className="text-lg text-[#1a3353] p-2 rounded-md" onChange={(e) => setFormatToDownload(e.target.value)}>
                            <option value={"videoandaudio"}>
                                Video
                            </option>
                            <option value={"audioonly"}>
                                Audio
                            </option>
                            <option value={"videoonly"}>
                                Video (No Audio)
                            </option>
                        </select>
                        <button
                            className="text-[#1a3353] bg-[#e6f1ff] hover:bg-[#1a3353] hover:text-[#e6f1ff] text-xl p-2 m-1 border-2 border-[#b1bac9] rounded-md transition-all"
                        >
                            <div className="flex flex-row justify-center items-center space-x-1">
                                <p>Download</p>
                                <FaDownload />
                            </div>
                        </button>
                    </div>
                </>
            }
        </div>
    )
};