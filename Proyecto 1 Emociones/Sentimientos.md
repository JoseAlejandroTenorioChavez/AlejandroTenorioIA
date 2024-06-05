# REPORTE DE LAS EMOCIONES

En este proyecto, generamos un conjunto de datos que toma en cuenta los siguientes estados emocionales:

1. **Tristeza**
2. **Enojo**
3. **Sorpresa**

Para cada emoción, se crearon carpetas con ciertas cantidades de imágenes. Estas imágenes se utilizaron para entrenar un modelo de aprendizaje automático, como se detalla en el archivo `Rostros-Emociones.ipynb`.

## Importación de Librerías

Se importaron librerías esenciales para el procesamiento de datos, la manipulación de imágenes y la construcción de la Red Neuronal Convolucional (CNN).

## Carga del Conjunto de Imágenes

Las imágenes se cargaron desde un directorio especificado, considerando solo archivos con extensiones comunes de imágenes. Estas imágenes se utilizaron para crear el modelo de clasificación de emociones.

## Pruebas y Resultados

Una vez que se cargaron las imágenes y se entrenó el modelo, se probó el rendimiento del modelo utilizando los archivos `haarcascade_frontalface_alt.xml` y el archivo `.xml` generado a partir del entrenamiento. El modelo fue capaz de detectar y clasificar las emociones mencionadas anteriormente.

## Conclusión

Aunque el modelo no es 100% preciso, se considera que es bastante efectivo. Durante la captura de un rostro, si la persona hace ciertas expresiones faciales, el modelo las interpreta y clasifica la emoción correspondiente. Por lo tanto, es crucial alimentar al modelo con una variedad de expresiones faciales durante la fase de entrenamiento.
