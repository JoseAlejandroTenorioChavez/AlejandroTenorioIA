# Proyecto 3: Juego de Detección de Objetos con Phaser

En este proyecto, implementamos un juego utilizando el framework Phaser. Aquí están los pasos clave del proyecto:

1. **Configuración del juego**: Definimos una serie de variables de configuración para el juego, incluyendo el tamaño del juego, los objetos del juego (como el jugador, las balas y las naves espaciales), los controles del juego, y la configuración de la red neuronal.

2. **Precarga de recursos del juego**: Cargamos los recursos del juego (como las imágenes para el fondo, el jugador, las naves espaciales, las balas y el menú) desde un directorio local.

3. **Creación de elementos del juego**: Iniciamos el sistema de físicas del juego, creamos los elementos del juego (como el fondo, las naves espaciales, las balas y el jugador), habilitamos las físicas para los elementos del juego, configuramos los controles del juego, y configuramos la red neuronal.

4. **Actualización del estado del juego**: Actualizamos el estado del juego en cada frame, incluyendo la detección de colisiones, la actualización de los estados del jugador, la actualización de los desplazamientos de las balas, el control del jugador, el control automático del jugador utilizando la red neuronal entrenada, el disparo de las balas, el reset de las variables si las balas llegan al final, y la recopilación de datos de entrenamiento.

5. **Funciones auxiliares**: Definimos una serie de funciones auxiliares para el juego, como el entrenamiento de la red neuronal, la toma de decisiones utilizando la red neuronal entrenada, la pausa y la reanudación del juego, el reset de las variables, el salto y el movimiento del jugador, el disparo de las balas, el manejo de las colisiones, y la generación de velocidades aleatorias para las balas.

Este proyecto demuestra cómo se puede utilizar la detección de objetos y las redes neuronales en un juego interactivo.
