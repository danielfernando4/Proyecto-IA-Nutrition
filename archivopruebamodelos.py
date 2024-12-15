from modelfunction import knn_generator_diet
from modelfunction import kmeans_generator_diet
from foodseparator import separatebreakfast


print(knn_generator_diet(634.88, 14.28, 2.38, 4.02))
print(kmeans_generator_diet(634.88, 14.28, 2.38, 4.02))
c, p, car, grasas = separatebreakfast(194,96,21,0,3)
print(c)
print(p)
print(car)
print(grasas)