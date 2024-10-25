import pytube
from pytube import YouTube
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hi from flask backend"

@app.route("/", methods = ["POST"])
def getUrl():
    if request.method == "POST":
        url_data = request.get_json()
        url = url_data["url"]
        print(url)

        yt = YouTube(url)
        is_url_valid = False
        is_url_valid = yt.check_availability()
        print("IS URL VALID", is_url_valid)
    
    return jsonify({ "isUrlValid": is_url_valid })

if __name__ == '__main__':
    app.run(debug=True, port=3000, host="0.0.0.0")
    print("Works")
    print(pytube.__version__)