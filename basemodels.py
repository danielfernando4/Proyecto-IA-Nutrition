from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Tabla Usuario
class Usuario(db.Model):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(50))
    correo = db.Column(db.String(50), unique=True, nullable=False)
    peso = db.Column(db.Float)
    edad = db.Column(db.Integer)
    estatura = db.Column(db.Integer)
    sexo = db.Column(db.String(1))
    password_usuario = db.Column(db.String(200), nullable=False)
    nivel_actividad = db.Column(db.String(20))
    grupo = db.Column(db.Integer)
    id_plan = db.Column(db.BigInteger, db.ForeignKey('plan_nutricional_user.id_plan'), nullable=False)

    # Relaciones con otras tablas
    calificaciones = db.relationship('Calificaciones', backref='usuario', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Usuario {self.nombre}>'

    def to_dict(self):
        return {
            "id_usuario": self.id_usuario,
            "nombre": self.nombre,
            "correo": self.correo,
            "peso": self.peso,
            "edad": self.edad,
            "estatura": self.estatura,
            "sexo": self.sexo,
            "password_usuario": self.password_usuario,
            "nivel_actividad": self.nivel_actividad,
            "grupo": self.grupo,
            "id_plan": self.id_plan
        }




# Tabla Plan Nutricional
class PlanNutricional(db.Model):
    __tablename__ = 'plan_nutricional_user'

    id_plan = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    comida_lunes = db.Column(db.BigInteger)
    comida_martes = db.Column(db.BigInteger)
    comida_miercoles = db.Column(db.BigInteger)
    comida_jueves = db.Column(db.BigInteger)
    comida_viernes = db.Column(db.BigInteger)
    comida_sabado = db.Column(db.BigInteger)
    comida_domingo = db.Column(db.BigInteger)

    # Relación con Usuario
    usuarios = db.relationship('Usuario', backref='plan_nutricional', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<PlanNutricional id_plan={self.id_plan}>'

    def to_dict(self):
        return {
            "id_plan": self.id_plan,
            "comida_lunes": self.comida_lunes,
            "comida_martes": self.comida_martes,
            "comida_miercoles": self.comida_miercoles,
            "comida_jueves": self.comida_jueves,
            "comida_viernes": self.comida_viernes,
            "comida_sabado": self.comida_sabado,
            "comida_domingo": self.comida_domingo
        }


# Tabla Comida
class Comida(db.Model):
    __tablename__ = 'comida'

    id_comida = db.Column(db.BigInteger, primary_key=True)
    nombre_comida = db.Column(db.String(100), unique=True, nullable=False)
    calorias = db.Column(db.Float, nullable=False)
    proteinas = db.Column(db.Float, nullable=False)
    carbohidratos = db.Column(db.Float, nullable=False)
    grasas = db.Column(db.Float, nullable=False)
    ingredientes = db.Column(db.String(500))
    tipo_comida = db.Column(db.String(30))
    grupo = db.Column(db.Integer)
    url_imagen = db.Column(db.String(255))
    descripcion = db.Column(db.Text)

    # Relaciones con otras tablas
    calificaciones = db.relationship('Calificaciones', backref='comida', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Comida {self.nombre_comida}>'

    def to_dict(self):
        return {
            "id_comida": self.id_comida,
            "nombre_comida": self.nombre_comida,
            "calorias": self.calorias,
            "proteinas": self.proteinas,
            "carbohidratos": self.carbohidratos,
            "grasas": self.grasas,
            "ingredientes": self.ingredientes,
            "tipo_comida": self.tipo_comida,
            "grupo": self.grupo,
            "url_imagen": self.url_imagen,
            "descripcion": self.descripcion
        }

# Tabla Calificaciones
class Calificaciones(db.Model):
    __tablename__ = 'calificaciones'

    id_calificacion = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    id_usuario = db.Column(db.BigInteger, db.ForeignKey('usuario.id_usuario'), nullable=False)
    id_comida = db.Column(db.BigInteger, db.ForeignKey('comida.id_comida'), nullable=False)
    calificacion = db.Column(db.Integer)

    def __repr__(self):
        return (f'<Calificaciones id_calificacion={self.id_calificacion}, '
                f'id_usuario={self.id_usuario}, id_comida={self.id_comida}, calificacion={self.calificacion}>')

    def to_dict(self):
        return {
            "id_calificacion": self.id_calificacion,
            "id_usuario": self.id_usuario,
            "id_comida": self.id_comida,
            "calificacion": self.calificacion
        }
