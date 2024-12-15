#app main


from flask import Flask, render_template, redirect, url_for, request, session
from configdb import Configdb
from basemodels import Comida, PlanNutricional, Usuario, db

from datetime import timedelta
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__, template_folder="templates")



app.secret_key = "Nutritionkey12345session"
app.permanent_session_lifetime = timedelta(minutes=1)



@app.route("/login.html", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    elif request.method == "POST":
        username = request.form.get("")
        password = request.form.get("")
        user = Usuario.query.filter(Usuario.correo == username and Usuario.password_usuario == password)

        

        pass


app.config.from_object(Configdb)
db.init_app(app)

@app.route("/generation.html") #& Decorador para mi puerto
def generation():
    return render_template("generation.html")


@app.route("/base.html")
def base():
    return render_template("base.html")


@app.route("/config.html")
def config():
    return render_template("config.html")

@app.route("/")
def index():    
    return render_template("index.html")

@app.route("/descubre.html")
def descubre():
    return render_template("descubre.html")

@app.route("/homepage.html")
def homepage():
    return render_template("homepage.html")

@app.route("/loginRegister.html")
def loginRegister():
    return render_template("loginRegister.html")






@app.route("/datos")
def datos():
    comidas = Comida.query.all()
    return '<br>'.join([f'ID: {comida.id_comida}, Nombre: {comida.nombre_comida}' for comida in comidas])



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5111, debug=True)