import yt_dlp
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import tempfile

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hi from freeyoutubedownloader.vercel.app backend"

@app.route("/", methods = ["POST"])
def getUrl():
    try:
        if request.method == "POST":
            data = request.get_json()
            url = data["videoUrl"]
            isAudio = data["isAudio"]

            try:
                is_url_valid = True
            except:
                is_url_valid = False
                return jsonify({ "message": "URL Not Valid" })
        
        if is_url_valid:
            temp_dir = tempfile.mkdtemp()

            if isAudio:
                ytdl_opts = {
                    "format": "bestaudio/best",
                    'outtmpl': f'{temp_dir}/%(filename)s.%(ext)s'
                }
            else:
                ytdl_opts = {
                    'outtmpl': f'{temp_dir}/%(filename)s.%(ext)s'
                }

            with yt_dlp.YoutubeDL(ytdl_opts) as ydl:
                try:
                    info_dict = ydl.extract_info(url, download=True)
                    file_path = ydl.prepare_filename(info_dict)

                    # Send the audio file to the frontend
                    return send_file(file_path, as_attachment=False)
                except Exception as e:
                    return jsonify({ "message": str(e) })
    
    except TypeError:
        print(TypeError)

    except NameError:
        print(NameError)

    except Exception as e:
        print("Error Occured")

if __name__ == '__main__':
    app.run(debug=True, port=3000, host="0.0.0.0")