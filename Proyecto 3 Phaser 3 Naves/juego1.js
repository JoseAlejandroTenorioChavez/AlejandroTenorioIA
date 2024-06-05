// Variables de configuración del juego
const config = {
    width: 800,
    height: 400,
    game: new Phaser.Game(800, 400, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render:render}),
    player: null,
    background: null,
    bullet: null,
    bulletDirection: false,
    spaceship: null,
    bullet2: null,
    bullet2Direction: false,
    bullet3: null,
    bullet3Direction: false,
    spaceship2: null,
    spaceship3: null,
    jump: null,
    moveLeft: null,
    moveRight: null,
    menu: null,
    bulletSpeed: null,
    bulletDisplacement: null,
    bulletSpeed2: null,
    bulletDisplacement2: null,
    bulletSpeed3: null,
    bulletDisplacement3: null,
    bulletDisplacement4: null,
    bulletSpeed4: null,
    airStatus: null,
    groundStatus: null,
    groundStatus2: null,
    leftStatus: null,
    rightStatus: null,
    nnNetwork: null,
    nnNetwork2: null,
    nnNetwork3: null,
    nnTraining: null,
    nnTraining2: null,
    nnTraining3: null,
    nnOutput: null,
    nnOutput2: null,
    nnOutput3: null,
    trainingData: [],
    trainingData2: [],
    trainingData3: [],
    autoMode: false,
    complete: false
};

// Precarga de recursos del juego
function preload() {
    config.game.load.image('background', 'assets/game/fondo2.png');
    config.game.load.spritesheet('player', 'assets/sprites/axo.png',32 ,48);
    config.game.load.image('spaceship', 'assets/game/ufo.png');
    config.game.load.image('bullet', 'assets/sprites/purple_ball.png');
    config.game.load.image('menu', 'assets/game/menu.png');
}

// Creación de elementos del juego
function create() {
    // Inicio del sistema de físicas
    config.game.physics.startSystem(Phaser.Physics.ARCADE);
    config.game.physics.arcade.gravity.y = 800;
    config.game.time.desiredFps = 30;

    // Creación de los elementos del juego
    config.background = config.game.add.tileSprite(0, 0, config.width, config.height, 'background');
    config.spaceship = config.game.add.sprite(config.width-100, config.height-70, 'spaceship');
    config.bullet = config.game.add.sprite(config.width-100, config.height, 'bullet');
    config.spaceship2 = config.game.add.sprite(0, 0, 'spaceship');
    config.bullet2 = config.game.add.sprite(50, 50, 'bullet');
    config.spaceship3 = config.game.add.sprite(config.width - 100, 0, 'spaceship');
    config.bullet3 = config.game.add.sprite(config.width - 100, config.height - 350, 'bullet');
    config.player = config.game.add.sprite(50, config.height, 'player');

    // Configuración de las físicas de los elementos del juego
    config.game.physics.enable(config.player);
    config.player.body.collideWorldBounds = true;
    var run = config.player.animations.add('run',[8,9,10,11]);
    config.player.animations.play('run', 10, true);

    config.game.physics.enable(config.bullet);
    config.bullet.body.collideWorldBounds = true;
    config.game.physics.enable(config.bullet2);
    config.bullet2.body.collideWorldBounds = true;
    config.game.physics.enable(config.bullet3);
    config.bullet3.body.collideWorldBounds = true;

    // Configuración de los controles del juego
    config.pauseText = config.game.add.text(config.width - 400, 20, 'Pausa', { font: '20px Arial', fill: '#fff' });
    config.pauseText.inputEnabled = true;
    config.pauseText.events.onInputUp.add(pause, self);
    config.game.input.onDown.add(unpause, self);

    config.jump = config.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    config.moveLeft = config.game.input.keyboard.addKey(Phaser.Keyboard.A);
    config.moveRight = config.game.input.keyboard.addKey(Phaser.Keyboard.D);

    // Configuración de la red neuronal
    config.nnNetwork =  new synaptic.Architect.Perceptron(2, 6, 6, 2);
    config.nnTraining = new synaptic.Trainer(config.nnNetwork);
    config.nnNetwork2 =  new synaptic.Architect.Perceptron(2, 6, 6, 2);
    config.nnTraining2 = new synaptic.Trainer(config.nnNetwork2);
    config.nnNetwork3 =  new synaptic.Architect.Perceptron(2, 6, 6, 2);
    config.nnTraining3 = new synaptic.Trainer(config.nnNetwork3);
}

// Actualización del estado del juego
function update() {
    

    // Colisiones
    config.game.physics.arcade.collide(config.bullet, config.player, collisionHandler, null, this);
    config.game.physics.arcade.collide(config.bullet2, config.player, collisionHandler, null, this);
    config.game.physics.arcade.collide(config.bullet3, config.player, collisionHandler, null, this);

    // Actualización de los estados del jugador
    config.groundStatus = config.player.body.onFloor() ? 1 : 0;
    config.airStatus = config.player.body.onFloor() ? 0 : 1;
    config.groundStatus2 = config.player.position.x == 0 || config.player.position.x == 80 ? 0 : 1;
    config.leftStatus = config.player.position.x == 0 ? 1 : 0;
    config.rightStatus = config.player.position.x == 80 ? 1 : 0;

    // Actualización de los desplazamientos de las balas
    config.bulletDisplacement = Math.floor(config.player.position.x - config.bullet.position.x);
    config.bulletDisplacement2 = Math.floor(config.player.position.y - config.bullet2.position.y);
    config.bulletDisplacement3 = Math.floor(config.player.position.x - config.bullet3.position.x && config.player.position.y - config.bullet3.position.y);

    // Control del jugador
    if (!config.autoMode && config.jump.isDown && config.player.body.onFloor()) {
        jump();
    }
    if (!config.autoMode && config.moveLeft.isDown && config.player.body.onFloor()) {
        moveLeft();
    }
    if (!config.autoMode && config.moveRight.isDown && config.player.body.onFloor()) {
        moveRight();
    }

    // Control automático del jugador utilizando la red neuronal entrenada
    if (config.autoMode && config.bullet.position.x > 0 && config.player.body.onFloor()) {
        if (trainingData([config.bulletDisplacement, config.bulletSpeed])) {
            jump();
        }
    }
    if (config.autoMode && config.bullet2.position.y < 370 && config.player.body.onFloor()) {
        if (trainingData2([config.bulletDisplacement2, config.bulletSpeed2])) {
            moveLeft();
        }
    }
    if (config.autoMode && config.bullet2.position.y < 370 && config.player.body.onFloor()) {
        if (trainingData3([config.bulletDisplacement2, config.bulletSpeed2])) {
            moveRight();
        }
    }

    // Disparo de las balas
    if (!config.bulletDirection) {
        shoot();
    }
    if (!config.bullet2Direction) {
        shoot2();
    }
    if (!config.bullet3Direction) {
        shoot3();
    }

    // Reset de las variables si las balas llegan al final
    if (config.bullet.position.x <= 0 || config.bullet2.position.y >= 370) {
        resetVariables();
    }

    // Recopilación de datos de entrenamiento
    if (!config.autoMode && config.bullet.position.x > 0) {
        config.trainingData.push({
            'input': [config.bulletDisplacement, config.bulletSpeed],
            'output': [config.airStatus, config.groundStatus]
        });
    }
    if (!config.autoMode && config.bullet2.position.y < 370) {
        config.trainingData2.push({
            'input': [config.bulletDisplacement2, config.bulletSpeed2],
            'output': [config.leftStatus, config.groundStatus2]
        });
        config.trainingData3.push({
            'input': [config.bulletDisplacement2, config.bulletSpeed2],
            'output': [config.rightStatus, config.groundStatus2]
        });
    }
}

// Funciones auxiliares
function neuralNetworkTraining() {
    // Entrenamiento de las redes neuronales con los datos recopilados
    config.nnTraining.train(config.trainingData, {rate: 0.0003, iterations: 10000, shuffle: true});
    config.nnTraining2.train(config.trainingData2, {rate: 0.0003, iterations: 10000, shuffle: true});
    config.nnTraining3.train(config.trainingData3, {rate: 0.0003, iterations: 10000, shuffle: true});
}

function trainingData(input) {
    // Uso de la red neuronal entrenada para tomar decisiones
    config.nnOutput = config.nnNetwork.activate(input);
    return config.nnOutput[0] >= config.nnOutput[1];
}

function trainingData2(input) {
    // Uso de la red neuronal entrenada para tomar decisiones
    config.nnOutput2 = config.nnNetwork2.activate(input);
    return config.nnOutput2[0] >= config.nnOutput2[1];
}

function trainingData3(input) {
    // Uso de la red neuronal entrenada para tomar decisiones
    config.nnOutput3 = config.nnNetwork3.activate(input);
    return config.nnOutput3[0] >= config.nnOutput3[1];
}

function pause() {
    config.game.paused = true;
    config.menu = config.game.add.sprite(config.width / 2, config.height / 2, 'menu');
    config.menu.anchor.setTo(0.5, 0.5);
}

function unpause(event) {
    if (config.game.paused) {
        var menuBounds = {
            x1: config.width / 2 - 270 / 2,
            x2: config.width / 2 + 270 / 2,
            y1: config.height / 2 - 180 / 2,
            y2: config.height / 2 + 180 / 2
        };

        var mouseX = event.x;
        var mouseY = event.y;

        if (mouseX > menuBounds.x1 && mouseX < menuBounds.x2 && mouseY > menuBounds.y1 && mouseY < menuBounds.y2) {
            if (mouseY <= menuBounds.y1 + 90) {
                config.complete = false;
                config.trainingData = [];
                config.trainingData2 = [];
                config.trainingData3 = [];
                config.autoMode = false;
            } else {
                if (!config.complete) {
                    // Llamada a la función de entrenamiento de la red neuronal
                    neuralNetworkTraining();
                    config.complete = true;
                }
                config.autoMode = true;
            }

            config.menu.destroy();
            resetVariables();
            config.game.paused = false;
        }
    }
}

function resetVariables() {
    config.player.body.velocity.x = 0;
    config.player.body.velocity.y = 0;
    config.bullet.body.velocity.x = 0;
    config.bullet.position.x = config.width - 100;
    config.player.position.x = 50;
    config.player.position.y = 352;
    config.bullet2.body.velocity.x = 0;
    config.bullet2.position.y = 50;
    config.bullet2.position.x = 50;
    config.bullet3.position.y = config.height - 350;
    config.bullet3.position.x = config.width - 100;
    config.bullet3.body.velocity.x = 0;
    config.bullet3.body.velocity.y = 0;
    config.bulletDirection = false;
    config.bullet2Direction = false;
    config.bullet3Direction = false;
}

function jump() {
    config.player.body.velocity.y = -270;
}

function moveLeft() {
    config.player.body.position.x = 0;
}

function moveRight() {
    config.player.body.position.x = 80;
}

function shoot() {
    config.bulletSpeed = -1 * randomSpeed(300, 800);
    config.bullet.body.velocity.y = 0;
    config.bullet.body.velocity.x = config.bulletSpeed;
    config.bulletDirection = true;
}

function shoot2() {
    config.bulletSpeed2 = 0;
    config.bullet2.body.velocity.y = config.bulletSpeed2;
    config.bullet2.body.velocity.x = 0;
    config.bullet2Direction = true;
}

function shoot3() {
    config.bulletSpeed3 = -1 * randomSpeed(300, 700);
    config.bullet3.body.velocity.y = 0;
    config.bullet3.body.velocity.x = config.bulletSpeed3;
    config.bullet3Direction = true;
}

function collisionHandler() {
    pause();
}

function randomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render() {
}




