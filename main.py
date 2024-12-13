#app main

from flask import Flask, render_template

app = Flask(__name__, template_folder="templates")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/base.html")
def base():
    return render_template("base.html")


@app.route("/login.html")
def login():
    return render_template("login.html")

@app.route("/config.html")
def config():
    return render_template("config.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5111, debug=True)