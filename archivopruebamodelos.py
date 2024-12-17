from modelfunction import knn_generator_diet
from modelfunction import kmeans_generator_diet
from foodseparator import separatebreakfast


c, p, car, grasas = separatebreakfast(155,35,29,1,2)
print(c)
print(p)
print(car)
print(grasas)
print(knn_generator_diet(c, p, car, grasas))

print()

c, p, car, grasas = separatebreakfast(195,94,21,0,2)
print(c)
print(p)
print(car)
print(grasas)
print(knn_generator_diet(c, p, car, grasas))

print()


c, p, car, grasas = separatebreakfast(195,94,21,0,2)
print(c)
print(p)
print(car)
print(grasas)
print(kmeans_generator_diet(c, p, car, grasas))


c, p, car, grasas = separatebreakfast(165,50,21,0,2)
print(c)
print(p)
print(car)
print(grasas)
print(kmeans_generator_diet(c, p, car, grasas))



print()

c, p, car, grasas = separatebreakfast(155,45,50,1,1)
print(c)
print(p)
print(car)
print(grasas)
print(kmeans_generator_diet(c, p, car, grasas))