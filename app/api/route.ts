import ytdl from "ytdl-core";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url || !ytdl.validateURL(url)) {
        return new Response(JSON.stringify({ error: "Invalid URL" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    try {
        const info = await ytdl.getInfo(url);
        const videoDetails = {
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails[0].url,
            formats: info.formats,
        };

        return new Response(JSON.stringify(videoDetails), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to fetch video info" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}