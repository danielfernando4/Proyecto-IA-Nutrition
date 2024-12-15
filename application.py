#app main


from flask import Flask, render_template, redirect, url_for
from configdb import Configdb
from basemodels import Comida, PlanNutricional, Usuario, db


app = Flask(__name__, template_folder="templates")


app.config.from_object(Configdb)
db.init_app(app)

@app.route("/generation.html") #& Decorador para mi puerto
def generation():
    return render_template("generation.html")

@app.route("/base.html")
def base():
    return render_template("base.html")


@app.route("/login.html")
def login():
    return render_template("login.html")

@app.route("/config.html")
def config():
    return render_template("config.html")

@app.route("/")
def index():    return render_template("index.html")

@app.route("/datos")
def datos():
    comidas = Comida.query.all()
    return '<br>'.join([f'ID: {comida.id_comida}, Nombre: {comida.nombre_comida}' for comida in comidas])

@app.route("/descubre.html")
def descubre():
    return render_template("descubre.html")

@app.route("/homepage.html")
def homepage():
    return render_template("homepage.html")

@app.route("/loginRegister.html")
def loginRegister():
    return render_template("loginRegister.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5111, debug=True)