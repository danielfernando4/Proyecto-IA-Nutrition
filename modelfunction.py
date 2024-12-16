import joblib
import numpy as np
import warnings


def kmeans_generator_diet(calories, protein, carbs, fat):
    predicted_cluster = None
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore", message="X does not have valid feature names")
        
        km = joblib.load('models/kmeans_model2.pkl')

        new_data = np.array([[200, 11, 2, 5]])
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