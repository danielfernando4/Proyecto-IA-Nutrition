import joblib
import numpy as np
import warnings


def kmeans_generator_diet(calories, protein, carbs, fat):
    predicted_cluster = None
        # Ignorar las advertencias específicas
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore", message="X does not have valid feature names")
        
        # Load the trained KMeans model
        km = joblib.load('Proyecto-IA-Nutrition/models/kmeans_model2.pkl')

        # Example usage with a new data point

        new_data = np.array([[200, 11, 2, 5]])
        # Predict the cluster for the new data point
        predicted_cluster = km.predict(new_data)
    return predicted_cluster[0]


def knn_generator_diet(calories, protein, carbs, fat):
    prediccion = None
        # Ignorar las advertencias específicas
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore", message="X does not have valid feature names")
        
        # Cargar el modelo guardado
        modelo = joblib.load('Proyecto-IA-Nutrition/models/nearest_neighbors_model.pkl')

        # Datos de entrada
        datos_entrada = np.array([[calories, protein, carbs, fat]])

        # Obtener los vecinos más cercanos
        prediccion = modelo.kneighbors(datos_entrada)    
    return prediccion[1][0]