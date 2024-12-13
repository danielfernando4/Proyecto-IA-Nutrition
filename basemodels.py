from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.BigInteger, primary_key=True)
    nombre = db.Column(db.String(50))
    correo = db.Column(db.String(50))
    peso = db.Column(db.Float)
    edad = db.Column(db.Integer)
    estatura = db.Column(db.Integer)
    sexo = db.Column(db.String(1))
    password_usuario = db.Column(db.String(60))
    nivel_actividad = db.Column(db.String(20))

    planes_nutricionales = db.relationship('PlanNutricional', backref='usuario', lazy=True)

    def __repr__(self):
        return f'<Usuario {self.nombre}>'

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

    planes_nutricionales = db.relationship('PlanNutricional', backref='comida', lazy=True)

    def __repr__(self):
        return f'<Comida {self.nombre_comida}>'


class PlanNutricional(db.Model):
    __tablename__ = 'plan_nutricional'  

    id_plan = db.Column(db.BigInteger, primary_key=True)
    calificacion = db.Column(db.Integer)
    dia_comida = db.Column(db.String(10))
    id_usuario = db.Column(db.BigInteger, db.ForeignKey('usuario.id_usuario'), nullable=False)
    id_comida = db.Column(db.BigInteger, db.ForeignKey('comida.id_comida'), nullable=False)

    def __repr__(self):
        return f'<PlanNutricional {self.dia_comida} - {self.calificacion}>'
