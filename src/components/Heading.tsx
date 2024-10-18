import { ImYoutube } from "react-icons/im";

const Heading = () => {
    return(
        <div className="flex flex-row items-center space-x-6">
            <ImYoutube size={64} />
            <p className="font-semibold tracking-tight text-center leading-tight text-5xl md:font-bold md:tracking-tighter md:text-7xl md:leading-snug">YouTube Downloader</p>
        </div>
    )
};

export default Heading;