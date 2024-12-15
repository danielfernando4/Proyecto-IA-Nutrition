def separatebreakfast(altura, peso, edad, genero, nivel_actividad):
    """
    altura = 194
    peso = 96
    edad = 21
    genero = 0
    """
    valorCalorico = 0

    if genero == 0:
        valorCalorico = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad)
    elif genero == 1:
        valorCalorico = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad)

    #nivelActividadFisica = 1

    match nivel_actividad:
        case 0:
            valorCalorico *= 1.2
        case 1:
            valorCalorico *= 1.375
        case 2:
            valorCalorico *= 1.55
        case 3:
            valorCalorico *= 1.7
        case 4:
            valorCalorico *= 1.9

    caloriasDesignadasAlDesayuno = valorCalorico * 0.3
    caloriasDesignadasAlAlmuerzo = valorCalorico * 0.5
    caloriasDesignadasAlCena = valorCalorico * 0.2
    # Distribución de macronutrientes para el desayuno
    porcentajeProteinas = 0.30 * 0.3  # 20% para proteínas
    porcentajeCarbohidratos = 0.05 * 0.3 # 55% para carbohidratos
    porcentajeGrasas = 0.19 * 0.3 # 25% para grasas
    # Calorías asignadas a cada macronutriente
    caloriasProteinas = caloriasDesignadasAlDesayuno * porcentajeProteinas
    caloriasCarbohidratos = caloriasDesignadasAlDesayuno * porcentajeCarbohidratos
    caloriasGrasas = caloriasDesignadasAlDesayuno * porcentajeGrasas
    # Conversión de calorías a gramos
    calories = caloriasDesignadasAlDesayuno
    protein = caloriasProteinas / 4  
    carbs = caloriasCarbohidratos / 4  
    fat = caloriasGrasas / 9  

    return calories, protein, carbs, fat 