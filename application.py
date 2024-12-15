#app main


from flask import Flask, render_template, redirect, url_for, request, session, flash
from configdb import Configdb
from basemodels import Comida, PlanNutricional, Usuario, db

from datetime import timedelta
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__, template_folder="templates")

app.config.from_object(Configdb)
db.init_app(app)

app.secret_key = "Nutritionkey12345session"
app.permanent_session_lifetime = timedelta(minutes=1)

@app.route("/")
def index():    
    return render_template("index.html")

@app.route("/loginRegister", methods=["GET", "POST"])
def loginRegister():
    if request.method == "POST":
        form_type = request.form.get("form_type")
        if form_type == "registro":
            usuario = Usuario()
            usuario.nombre = request.form.get("nombre")
            usuario.correo = request.form.get("correo")
            usuario.password_usuario = generate_password_hash(request.form.get("password"))
            db.session.add(usuario)  
            db.session.commit()      
            flash("Usuario registrado correctamente", "success")
            return redirect(url_for("loginRegister"))  
        elif form_type == "login":
            correo = request.form.get("correo")
            password = request.form.get("password")
            usuario = Usuario.query.filter(Usuario.correo == correo).first()  
            if usuario and check_password_hash(usuario.password_usuario, password):  
                session["correo"] = usuario.correo
                session["id_usuario"] = usuario.id_usuario     
                flash("Login exitoso", "success")
                return redirect(url_for("index"))  
            else:
                flash("Credenciales incorrectas", "danger")
                return render_template("loginRegister.html")
    return render_template("loginRegister.html")



@app.route("/generation.html") #& Decorador para mi puerto
def generation():
    if "correo" in session and "id_usuario" in session:
        return render_template("generation.html")
    else:
        return redirect(url_for("homepage"))




@app.route("/config")
def config():
    if "correo" in session and "id_usuario" in session:
        return render_template("config.html")
    else:
        return redirect(url_for("homepage"))


@app.route("/descubre")
def descubre():
    if "correo" in session and "id_usuario" in session:
        return render_template("descubre.html")
    else:
        return redirect(url_for("homepage"))


@app.route("/homepage")
def homepage():
    if "correo" in session and "id_usuario" in session:
        return redirect(url_for("index"))
    else:
        return render_template("homepage.html")


@app.route("/base.html")
def base():
    return render_template("base.html")





@app.route("/datos")
def datos():
    comidas = Comida.query.all()
    return '<br>'.join([f'ID: {comida.id_comida}, Nombre: {comida.nombre_comida}' for comida in comidas])

@app.route("/usuarios")
def usuarios():
    comidas = Usuario.query.all()
    return '<br>'.join([f'ID: {comida.nombre}, Nombre: {comida.password_usuario}' for comida in comidas])



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5111, debug=True)