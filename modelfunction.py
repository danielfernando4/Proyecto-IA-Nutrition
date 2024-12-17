import joblib
import numpy as np
import warnings


def kmeans_generator_diet(calories, protein, carbs, fat):
    predicted_cluster = None
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore", message="X does not have valid feature names")
        
<<<<<<< HEAD
        km = joblib.load('Proyecto-IA-Nutrition/models/kmeans_model.pkl')
=======
        km = joblib.load('models/kmeans_model2.pkl')
>>>>>>> 2c040e3ab53554e064c2f2dbf012a09f54178192

        new_data = np.array([[calories, protein, carbs, fat]])
        predicted_cluster = km.predict(new_data)
    return predicted_cluster[0]


def knn_generator_diet(calories, protein, carbs, fat):
    prediccion = None
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore", message="X does not have valid feature names")
        
        modelo = joblib.load('models/nearest_neighbors_model.pkl')

        datos_entrada = np.array([[calories, protein, carbs, fat]])

        prediccion = modelo.kneighbors(datos_entrada)    
    return prediccion[1][0]