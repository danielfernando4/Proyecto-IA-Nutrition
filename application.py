#app main
from flask import Flask, render_template, redirect, url_for, request, session, flash, jsonify
from configdb import Configdb
from basemodels import Calificaciones, Comida, PlanNutricional, Usuario, db
from datetime import timedelta
from werkzeug.security import check_password_hash, generate_password_hash

from foodseparator import separatebreakfast
from modelfunction import kmeans_generator_diet, knn_generator_diet

from sqlalchemy.sql.expression import func

app = Flask(__name__, template_folder="templates")

app.config.from_object(Configdb)
db.init_app(app)

app.secret_key = "Nutritionkey12345session"
app.permanent_session_lifetime = timedelta(minutes=120)

@app.route("/")
def index():
    if "correo" in session and "id_usuario" in session:
        return render_template("index.html", nombre=session["nombre"], correo=session["correo"], edad=session["edad"], 
                               estatura=session["estatura"], peso=session["peso"], 
                               nivel_actividad=session["nivel_actividad"])
    else:
        return redirect(url_for("homepage"))


@app.route("/fistlogin", methods=["POST"])
def fistlogin():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST":
            datos = request.get_json()
            edad = datos.get("edad")
            estatura = datos.get("estatura")
            peso = datos.get("peso")
            nivel_actividad = datos.get("nivel_actividad")

            usuario = Usuario.query.get(session["id_usuario"])
            usuario.edad = edad
            usuario.estatura = estatura
            usuario.peso = peso
            usuario.nivel_actividad = nivel_actividad
            session["edad"] = usuario.edad
            session["estatura"] = usuario.estatura
            session["peso"] = usuario.peso
            session["nivel_actividad"] = usuario.nivel_actividad
            db.session.commit()

            return render_template("fistlogin.html", nombre=session["nombre"], correo=session["correo"])

        return render_template("fistlogin.html", nombre=session["nombre"], correo=session["correo"])
    else:
        return redirect(url_for("homepage"))




@app.route("/loginRegister", methods=["GET", "POST"])
def loginRegister():
    if request.method == "POST":
        form_type = request.form.get("form_type")
        if form_type == "registro":
            plan_nutricional = PlanNutricional()
            db.session.add(plan_nutricional)  
            db.session.commit()      
            usuario = Usuario()
            usuario.nombre = request.form.get("nombre")
            usuario.correo = request.form.get("correo")
            usuario.password_usuario = generate_password_hash(request.form.get("password"))
            usuario.id_plan = plan_nutricional.id_plan
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
                session["grupo"] = usuario.grupo
                session["id_plan"] = usuario.id_plan
                session["nivel_actividad"] = usuario.nivel_actividad
                flash("Login exitoso", "success")
                return redirect(url_for("index"))  
            else:
                flash("Credenciales incorrectas", "danger")
                return render_template("loginRegister.html")
    return render_template("loginRegister.html")


@app.route("/generation", methods=["GET", "POST"])
def generation():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST":
            # Obtener datos en formato JSON
            data = request.json
            edad = int(data.get("edad"))
            altura = int(data.get("altura"))
            sexo = data.get("sexo")
            peso = float(data.get("peso"))  
            print(request.json)

            # Procesar los datos
            sexo_num = 0 if sexo == "masculino" else 1

            actividad_fisica = session["nivel_actividad"]
            nivel_actividad = 0
            if actividad_fisica == "Sedentario":
                nivel_actividad = 0
            elif actividad_fisica == "Ligera actividad":
                nivel_actividad = 1
            elif actividad_fisica == "Moderadamente activo":
                nivel_actividad = 2
            elif actividad_fisica == "Activo":
                nivel_actividad = 3
            elif actividad_fisica == "Muy activo":
                nivel_actividad = 4

            cal, prot, carb, grasas = separatebreakfast(altura, peso, edad, sexo_num, nivel_actividad)
            # Convertir a enteros estándar y sumar 1 a cada valor
            diets_ids = [int(id) + 1 for id in knn_generator_diet(cal, prot, carb, grasas)]
            print(diets_ids)

            # Consultar la base de datos para obtener las comidas
            comidas = Comida.query.filter(Comida.grupo.in_(diets_ids)).order_by(func.random()).limit(7).all()

            # Convertir las comidas a JSON
            comidas_json = [comida.to_dict() for comida in comidas]
            print(comidas_json)

            # Devolver el JSON al cliente
            return jsonify(comidas_json)

        # Manejar solicitudes GET
        return render_template("generation.html", nombre=session["nombre"], correo=session["correo"], 
                               edad=session["edad"], estatura=session["estatura"], 
                               peso=session["peso"], nivel_actividad=session["nivel_actividad"])

    else:
        # Redirigir si el usuario no está autenticado
        return redirect(url_for("homepage"))



@app.route("/guardar_tarjetas", methods=["POST"])
def guardar_tarjetas():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST": 
            print("LLEGANDO")
            data = request.get_json()
            print(data)

         
            lunes = data["Lunes"],
            martes = data["Martes"],
            miercoles = data["Miércoles"],
            jueves = data["Jueves"],
            viernes = data["Viernes"],
            sabado = data["Sábado"],
            domingo = data["Domingo"]

            plan_nutricional = PlanNutricional.query.filter(PlanNutricional.id_plan == session["id_plan"]).first()

            plan_nutricional.comida_lunes = lunes
            plan_nutricional.comida_martes = martes
            plan_nutricional.comida_miercoles = miercoles
            plan_nutricional.comida_jueves = jueves
            plan_nutricional.comida_viernes = viernes
            plan_nutricional.comida_sabado = sabado 
            plan_nutricional.comida_domingo = domingo
            
            db.session.commit()
            print(data)
            return jsonify({"status": "ok"})

        pass
    return redirect(url_for("/homepage"))



@app.route("/config", methods=["GET", "POST"])
def config():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST":
            tipo_conf = request.form.get("type_config")

            if tipo_conf == "perfil":
                usuario = Usuario.query.get(session["id_usuario"])  
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
                usuario.nivel_actividad = request.form.get("actividad")  # Guardar nivel de actividad
                usuario.sexo = request.form.get("sexo") 

                if not usuario.edad or not usuario.estatura or not usuario.peso or not usuario.sexo:
                    return redirect(url_for("index"))
                session["edad"] = usuario.edad
                session["estatura"] = usuario.estatura
                session["peso"] = usuario.peso  
                session["nivel_actividad"] = usuario.nivel_actividad  # Actualizar sesión
                session["sexo"] = usuario.sexo 
                auxpeso = float(usuario.peso)
                auxestatura = float(usuario.estatura)
                auxedad = float(usuario.edad)
                auxsexo = 0 if usuario.sexo == "M" else 1
                cal, prot, carb, grasas = separatebreakfast(auxestatura, auxpeso, auxedad, auxsexo, 3)
                diets = int(kmeans_generator_diet(cal, prot, carb, grasas))
                usuario.grupo = diets
                session["grupo"] = usuario.grupo
                db.session.commit()
        return render_template("config.html", edad=session["edad"], estatura=session["estatura"], peso=session["peso"], 
                               actividad=session["nivel_actividad"], nombre=session["nombre"], 
                               correo=session["correo"], nombre_config=session["nombre"], correo_config=session["correo"],
                               sexo=session.get("sexo"))  # Agregado: sexo en el contexto
    else:
        return redirect(url_for("homepage"))




@app.route('/rate', methods=['POST'])
def rate_comida():
    data = request.get_json()
    id_comida = data.get('id_comida')
    calificacion = data.get('calificacion')

    if not id_comida or calificacion is None:
        return jsonify({'message': 'Datos incompletos'}), 400

    id_usuario = session.get("id_usuario")
    if not id_usuario:
        return jsonify({'message': 'Usuario no autenticado'}), 403

    app.logger.info(f'Recibida calificación: Comida ID {id_comida}, Calificación: {calificacion}, Usuario ID {id_usuario}')

    calificacion_existente = Calificaciones.query.filter_by(id_comida=id_comida, id_usuario=id_usuario).first()

    if calificacion_existente:
        db.session.delete(calificacion_existente)

    nueva_calificacion = Calificaciones(
        id_comida=id_comida,
        calificacion=calificacion,
        id_usuario=id_usuario
    )
    db.session.add(nueva_calificacion)
    db.session.commit()

    return jsonify({'message': 'Calificación guardada correctamente'}), 200

@app.route('/get_rating/<int:id_comida>', methods=['GET'])
def get_rating(id_comida):
    id_usuario = session.get("id_usuario")
    if not id_usuario:
        return jsonify({'message': 'Usuario no autenticado'}), 403

    calificacion_existente = Calificaciones.query.filter_by(id_comida=id_comida, id_usuario=id_usuario).first()
    if calificacion_existente:
        return jsonify({'calificacion': calificacion_existente.calificacion}), 200
    else:
        return jsonify({'calificacion': None}), 200

import json
# --------- Obtener datos del Plan---------------------------------------------
@app.route("/get_recipes", methods=["GET"])
def get_recipes():
    if "correo" in session and "id_usuario" in session:
        id_plan = session.get("id_plan")
        if not id_plan:
            return jsonify({"error": "ID de plan no encontrado en la sesión"}), 400

        plan_nutricional = PlanNutricional.query.filter(PlanNutricional.id_plan == session["id_plan"]).first()

        # Obtener comidas para cada día de la semana
        comida_lunes = Comida.query.filter(Comida.id_comida == plan_nutricional.comida_lunes).first()
        comida_martes = Comida.query.filter(Comida.id_comida == plan_nutricional.comida_martes).first()
        comida_miercoles = Comida.query.filter(Comida.id_comida == plan_nutricional.comida_miercoles).first()
        comida_jueves = Comida.query.filter(Comida.id_comida == plan_nutricional.comida_jueves).first()
        comida_viernes = Comida.query.filter(Comida.id_comida == plan_nutricional.comida_viernes).first()
        comida_sabado = Comida.query.filter(Comida.id_comida == plan_nutricional.comida_sabado).first()
        comida_domingo = Comida.query.filter(Comida.id_comida == plan_nutricional.comida_domingo).first()

        # Obtener calificaciones para cada comida
        calif_lunes = Calificaciones.query.filter_by(id_usuario=session["id_usuario"], id_comida=plan_nutricional.comida_lunes).first()
        calif_martes = Calificaciones.query.filter_by(id_usuario=session["id_usuario"], id_comida=plan_nutricional.comida_martes).first()
        calif_miercoles = Calificaciones.query.filter_by(id_usuario=session["id_usuario"], id_comida=plan_nutricional.comida_miercoles).first()
        calif_jueves = Calificaciones.query.filter_by(id_usuario=session["id_usuario"], id_comida=plan_nutricional.comida_jueves).first()
        calif_viernes = Calificaciones.query.filter_by(id_usuario=session["id_usuario"], id_comida=plan_nutricional.comida_viernes).first()
        calif_sabado = Calificaciones.query.filter_by(id_usuario=session["id_usuario"], id_comida=plan_nutricional.comida_sabado).first()
        calif_domingo = Calificaciones.query.filter_by(id_usuario=session["id_usuario"], id_comida=plan_nutricional.comida_domingo).first()

        json_comidas = {
            "lunes": {
                "comida": comida_lunes.to_dict(),
                "calificacion": calif_lunes.calificacion if calif_lunes else None
            },
            "martes": {
                "comida": comida_martes.to_dict(),
                "calificacion": calif_martes.calificacion if calif_martes else None
            },
            "miercoles": {
                "comida": comida_miercoles.to_dict(),
                "calificacion": calif_miercoles.calificacion if calif_miercoles else None
            },
            "jueves": {
                "comida": comida_jueves.to_dict(),
                "calificacion": calif_jueves.calificacion if calif_jueves else None
            },
            "viernes": {
                "comida": comida_viernes.to_dict(),
                "calificacion": calif_viernes.calificacion if calif_viernes else None
            },
            "sabado": {
                "comida": comida_sabado.to_dict(),
                "calificacion": calif_sabado.calificacion if calif_sabado else None
            },
            "domingo": {
                "comida": comida_domingo.to_dict(),
                "calificacion": calif_domingo.calificacion if calif_domingo else None
            }
        }

        return jsonify(json_comidas)

    else:
        return redirect(url_for("homepage"))

        

@app.route("/descubre", methods=["GET", "POST"])
def descubre():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST":
            filtro = request.get_json()
            nombre_busqueda = filtro.get("nombre", "").lower()  

            # Otros filtros
            prot = filtro.get("proteínas")
            cal = filtro.get("calorias")
            carb = filtro.get("carbohidratos")
            grasas = filtro.get("grasas")
            tipo = filtro.get("tipo")

            query = Comida.query

            # Búsqueda por nombre si hay un término
            if nombre_busqueda:
                query = query.filter(Comida.nombre_comida.ilike(f"%{nombre_busqueda}%"))

            # Aplicar otros filtros (calorías, proteínas, etc.)
            if cal == 1:
                query = query.order_by(Comida.calorias.asc())
            elif cal == 2:
                query = query.order_by(Comida.calorias.desc())
            if prot == 1:
                query = query.order_by(Comida.proteinas.asc())
            elif prot == 2:
                query = query.order_by(Comida.proteinas.desc())
            if carb == 1:
                query = query.order_by(Comida.carbohidratos.asc())
            elif carb == 2:
                query = query.order_by(Comida.carbohidratos.desc())
            if grasas == 2:
                query = query.order_by(Comida.grasas.asc())
            elif grasas == 1:
                query = query.order_by(Comida.grasas.desc())
            if tipo == 1:
                query = query.filter_by(tipo_comida="Gluten Free")
            elif tipo == 2:
                query = query.filter_by(tipo_comida="Vegetarian")

            comidas = query.all()
            comidas_json = [comida.to_dict() for comida in comidas]

            return jsonify(comidas_json)

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
    session.pop("id_plan", None)
    session.pop("nivel_actividad", None)
    session.pop("grupo", None)

    flash("Has cerrado sesión exitosamente", "success")
    return redirect(url_for("homepage"))



@app.route("/kmeans", methods=["POST", "GET"])
def kmeans():
    if "correo" in session and "id_usuario" in session:
        if request.method == "POST":
            datos = request.get_json()
            grupo = datos.get("label")  
            comidas = Comida.query.filter(Comida.grupo == grupo)

            comidas_json = [comida.to_dict() for comida in comidas]

            return jsonify(comidas_json)
        
        return render_template("kmeans.html", nombre=session["nombre"], correo=session["correo"], grupo=session["grupo"])
    else:
        return redirect(url_for("homepage"))


@app.route("/cambio_receta", methods=["POST"])
def cambio_receta():
    if "correo" in session and "id_usuario" in session:
        respuesta = request.get_json()
        id_comida = respuesta.get("id_comida")
        dia = respuesta.get("dia")
        print(id_comida)
        print(dia)
        
        plan_nutricional = PlanNutricional.query.filter(PlanNutricional.id_plan == session["id_plan"]).first()
        
        if dia == "comida_lunes":
            plan_nutricional.comida_lunes = id_comida
        elif dia == "comida_martes":
            plan_nutricional.comida_martes = id_comida
        elif dia == "comida_miercoles":
            plan_nutricional.comida_miercoles = id_comida
        elif dia == "comida_jueves":
            plan_nutricional.comida_jueves = id_comida
        elif dia == "comida_viernes":
            plan_nutricional.comida_viernes = id_comida
        elif dia == "comida_sabado":
            plan_nutricional.comida_sabado = id_comida
        elif dia == "comida_domingo":
            plan_nutricional.comida_domingo = id_comida

        db.session.commit()
        return jsonify({"status": "ok"})
    else:
        return redirect(url_for("homepage"))
    
    


@app.route("/para_ti")
def para_ti():
    if "correo" in session and "id_usuario" in session:
        return render_template("para_ti.html", nombre=session["nombre"], correo=session["correo"])
    else:
        return redirect(url_for("homepage"))




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5111, debug=True)
