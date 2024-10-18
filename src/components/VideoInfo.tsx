import { videoInfoType } from "../pages/Dashboard";

interface Props {
    videoInfo: videoInfoType
}

export const VideoInfo = (props: Props) => {
    const { videoInfo } = props;
    const imageSrc = videoInfo?.thumbnail;
    
    return(
        <div className="flex flex-col items-center space-y-2">
            <img
                className="rounded-md"
                src={ imageSrc }
                width={ 480 }
                height={ 360 }
                key={ videoInfo.videoId }
                alt={ videoInfo.title }
            />
            <p className="text-xl text-center">Video Title: { videoInfo.title }</p>
        </div>
    )
}