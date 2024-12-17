def separatebreakfast(altura, peso, edad, genero, nivel_actividad):
    """
    Calcula las calorías, proteínas, carbohidratos y grasas necesarias
    solo para el desayuno de acuerdo a edad, altura, peso, nivel de actividad y género.

    Parámetros:
        altura (cm): Altura de la persona.
        peso (kg): Peso de la persona.
        edad (años): Edad de la persona.
        genero (0: Hombre, 1: Mujer)
        nivel_actividad (0-4): Nivel de actividad física.

    Retorna:
        calorías (float): Calorías para el desayuno.
        proteínas (float): Gramos de proteína.
        carbohidratos (float): Gramos de carbohidratos.
        grasas (float): Gramos de grasas.
    """
    # Cálculo del metabolismo basal
    if genero == 0:  # Hombre
        valorCalorico = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad)
    elif genero == 1:  # Mujer
        valorCalorico = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad)

    # Factor de actividad física
    factores_actividad = [1.2, 1.375, 1.55, 1.7, 1.9]
    valorCalorico *= factores_actividad[nivel_actividad]

    # Calorías asignadas al desayuno (30% del total)
    caloriasDesayuno = valorCalorico * 0.3

    # Distribución de macronutrientes
    porcentaje_proteinas = 0.20  # 20%
    porcentaje_carbohidratos = 0.55  # 55%
    porcentaje_grasas = 0.25  # 25%

    # Calorías de cada macronutriente
    calorias_proteinas = caloriasDesayuno * porcentaje_proteinas
    calorias_carbohidratos = caloriasDesayuno * porcentaje_carbohidratos
    calorias_grasas = caloriasDesayuno * porcentaje_grasas

    # Conversión de calorías a gramos
    proteinas = calorias_proteinas / 4  # 1g proteína = 4 calorías
    carbohidratos = calorias_carbohidratos / 4  # 1g carbohidrato = 4 calorías
    grasas = calorias_grasas / 9  # 1g grasa = 9 calorías

    return caloriasDesayuno, proteinas, carbohidratos, grasas