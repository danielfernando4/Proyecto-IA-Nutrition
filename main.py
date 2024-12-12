#app main

from flask import Flask, render_template

app = Flask(__name__, template_folder="templates")

@app.route("/")
def index():
    var = 5
    return render_template("index.html", variable = var)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5111, debug=True)