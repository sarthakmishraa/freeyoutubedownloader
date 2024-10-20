import pytube
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hi from flask backend"

if __name__ == '__main__':
    app.run()
    print("Works")
    print(pytube.__version__)