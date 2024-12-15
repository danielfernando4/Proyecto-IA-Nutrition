#app main
from flask import Flask, render_template, redirect, url_for, request, session, flash
from configdb import Configdb
from basemodels import Comida, PlanNutricional, Usuario, db

from datetime import timedelta
from werkzeug.security import check_password_hash, generate_password_hash

from foodseparator import separatebreakfast
from modelfunction import kmeans_generator_diet

app = Flask(__name__, template_folder="templates")

app.config.from_object(Configdb)
db.init_app(app)

app.secret_key = "Nutritionkey12345session"
app.permanent_session_lifetime = timedelta(minutes=120)


@app.route("/")
def index():
    if "correo" in session and "id_usuario" in session:
        return render_template("index.html", nombre=session["nombre"], correo=session["correo"])
    else:
        return redirect(url_for("homepage"))



@app.route("/loginRegister", methods=["GET", "POST"])
def loginRegister():
    if request.method == "POST":
        form_type = request.form.get("form_type")
        if form_type == "registro":
            usuario = Usuario()
            usuario.nombre = request.form.get("nombre")
            usuario.correo = request.form.get("correo")
            usuario.password_usuario = generate_password_hash(request.form.get("password"))
            if not usuario.nombre or not usuario.correo or not usuario.password_usuario:
                return redirect(url_for("loginRegister"))
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
                session["nombre"] = usuario.nombre
                session["edad"] = usuario.edad
                session["estatura"] = usuario.estatura
                session["peso"] = usuario.peso
                session["nivel_actividad"] = usuario.nivel_actividad
                flash("Login exitoso", "success")
                return redirect(url_for("index"))  
            else:
                flash("Credenciales incorrectas", "danger")
                return render_template("loginRegister.html")
    return render_template("loginRegister.html")




@app.route("/generation", methods=["GET", "POST"]) #& Decorador para mi puerto
def generation():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST":
            edad = int(request.form.get("edad"))
            altura = int(request.form.get("altura"))
            sexo = request.form.get("sexo")
            peso = float(request.form.get("peso"))

            sexo_num = 0 if sexo == "masculino" else 1

            cal, prot, carb, grasas = separatebreakfast(altura, peso, edad, sexo_num, 3)

            diets = kmeans_generator_diet(cal, prot, carb, grasas)

            return str(diets) 



        return render_template("generation.html", nombre=session["nombre"], correo=session["correo"])
    else:
        return redirect(url_for("homepage"))




@app.route("/config", methods=["GET", "POST"])
def config():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST":
            tipo_conf = request.form.get("type_config")

            if tipo_conf == "perfil":
                usuario = Usuario.query.get(session["id_usuario"])  
                #if not usuario:
                 #   return redirect(url_for("loginRegister"))
                usuario.nombre = request.form.get("nombre")
                usuario.correo = request.form.get("correo")

                if not usuario.nombre or not usuario.correo or not request.form.get("password"):
                    return redirect(url_for("index"))

                password_nueva = request.form.get("password")
                if password_nueva:
                    usuario.password_usuario = generate_password_hash(password_nueva)
                session["nombre"] = usuario.nombre
                session["correo"] = usuario.correo
                db.session.commit()  

            elif tipo_conf == "datos":
                usuario = Usuario.query.get(session["id_usuario"])
                usuario.edad = request.form.get("edad")
                usuario.estatura = request.form.get("estatura")
                usuario.peso = request.form.get("peso")

                if not usuario.edad or not usuario.estatura or not usuario.peso:
                    return redirect(url_for("index"))
                session["edad"] = usuario.edad
                session["estatura"] = usuario.estatura
                session["peso"] = usuario.peso  
                db.session.commit()
            pass 
        return render_template("config.html", edad=session["edad"], estatura=session['estatura'],  peso=session['peso'], actividad=session['nivel_actividad'], nombre=session["nombre"], correo=session["correo"], nombre_config=session["nombre"], correo_config=session["correo"])
    else:
        return redirect(url_for("homepage"))





@app.route("/descubre")
def descubre():
    if "correo" in session and "id_usuario" in session:
        return render_template("descubre.html", nombre=session["nombre"], correo=session["correo"])
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



@app.route("/cerrarsesion")
def cerrarsesion():
    session.pop("correo", None)  
    session.pop("id_usuario", None)  
    session.pop("peso", None)
    session.pop("estatura", None)
    session.pop("edad", None)
    session.pop("nivel_actividad", None)

    flash("Has cerrado sesión exitosamente", "success")
    return redirect(url_for("homepage"))

@app.route("/kmeans.html")
def kmeans():
    return render_template("kmeans.html")



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