from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(50))
    correo = db.Column(db.String(50), unique=True, nullable=False)  # Correo único y no nulo
    peso = db.Column(db.Float)
    edad = db.Column(db.Integer)
    estatura = db.Column(db.Integer)
    sexo = db.Column(db.String(1))
    password_usuario = db.Column(db.String(200), nullable=False)  # Contraseña no nula
    nivel_actividad = db.Column(db.String(20))
    grupo = db.Column(db.Integer)

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
    descripcion = db.Column(db.Text)  

    planes_nutricionales = db.relationship('PlanNutricional', backref='comida', lazy=True)

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


class PlanNutricional(db.Model):
    __tablename__ = 'plan_nutricional'  

    id_plan = db.Column(db.BigInteger, primary_key=True)
    calificacion = db.Column(db.Integer)
    dia_comida = db.Column(db.String(10))
    id_usuario = db.Column(db.BigInteger, db.ForeignKey('usuario.id_usuario'), nullable=False)
    id_comida = db.Column(db.BigInteger, db.ForeignKey('comida.id_comida'), nullable=False)

    def __repr__(self):
        return f'<PlanNutricional {self.dia_comida} - {self.calificacion}>'
