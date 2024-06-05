# Proyecto 4: Clasificación de Imágenes con CNN

En este proyecto, implementamos un sistema de clasificación de imágenes utilizando una Red Neuronal Convolucional (CNN). Aquí están los pasos clave del proyecto:

1. **Carga del modelo**: Cargamos un modelo previamente entrenado desde un archivo local.

2. **Definición de las categorías de riesgo y las categorías de las imágenes**: Definimos las categorías de riesgo y las categorías de las imágenes que vamos a clasificar.

3. **Carga y procesamiento de las imágenes**: Cargamos las imágenes desde un directorio local, las redimensionamos a un tamaño de 28x28, las añadimos a una lista y las convertimos a un array de NumPy.

4. **Preprocesamiento de las imágenes**: Convertimos las imágenes a float32 y las normalizamos dividiéndolas por 255.

5. **Predicción de las clases de las imágenes**: Utilizamos el modelo para predecir las clases de las imágenes.

6. **Visualización de los resultados**: Para cada imagen, imprimimos la ruta del archivo y la clase de riesgo predicha, y mostramos la imagen con el título que indica la categoría real y la predicción.

Este proyecto demuestra cómo se puede utilizar una CNN para la clasificación de imágenes.
