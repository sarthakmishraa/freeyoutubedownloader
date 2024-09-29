import Image from "next/image";
import { videoInfoType } from "../dashboard/page";

interface Props {
    videoInfo: videoInfoType
}

export const VideoInfo = (props: Props) => {
    const { videoInfo } = props;
    const imageSrc = videoInfo?.thumbnail;
    
    return(
        <div className="flex flex-col items-center space-y-2">
            <Image
                loader={ () => imageSrc || "" }
                unoptimized={ true }
                key={ videoInfo.videoId }
                alt={ videoInfo.title }
                src={ imageSrc || "" }
                width={ 480 }
                height={ 360 }
                className="rounded-md"
            />
            <p className="text-xl text-center">Video Title: { videoInfo.title }</p>
        </div>
    )
}