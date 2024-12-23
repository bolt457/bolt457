import * as THREE from 'three';

// Initialisation de la scène, caméra, et rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Variables pour les jeux
let car, player1, player2, ball, racket, objective;
let obstacles = [];  // Tableau pour stocker les obstacles

// Créer un circuit de course avec obstacles
function createTrack() {
    const track = new THREE.Object3D();
    const geometry = new THREE.PlaneGeometry(10, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    track.add(plane);
    
    for (let i = -5; i <= 5; i++) {
        const wallGeometry = new THREE.BoxGeometry(1, 5, 100);
        const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(i * 3, 2, 0);
        track.add(wall);
    }
    return track;
}

// Créer des obstacles mobiles pour la course
function createObstacle() {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const obstacle = new THREE.Mesh(geometry, material);
    obstacle.position.set(Math.random() * 10 - 5, 0.5, Math.random() * 10 - 50);
    obstacles.push(obstacle);
    scene.add(obstacle);
}

// Créer la voiture
function createCar() {
    const geometry = new THREE.BoxGeometry(1, 0.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const car = new THREE.Mesh(geometry, material);
    car.position.set(0, 0.25, 0);
    return car;
}

// Créer un terrain de football
function createField() {
    const geometry = new THREE.PlaneGeometry(20, 40);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const field = new THREE.Mesh(geometry, material);
    field.rotation.x = -Math.PI / 2;
    return field;
}

// Créer un joueur
function createPlayer(color) {
    const geometry = new THREE.SphereGeometry(0.5, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const player = new THREE.Mesh(geometry, material);
    return player;
}

// Créer une balle de football
function createBall() {
    const geometry = new THREE.SphereGeometry(0.2, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ball = new THREE.Mesh(geometry, material);
    ball.position.set(0, 0.2, 0);
    return ball;
}

// Créer un terrain de tennis
function createTennisCourt() {
    const geometry = new THREE.PlaneGeometry(20, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const court = new THREE.Mesh(geometry, material);
    court.rotation.x = -Math.PI / 2;
    return court;
}

// Créer une raquette de tennis
function createRacket() {
    const geometry = new THREE.BoxGeometry(1, 0.1, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const racket = new THREE.Mesh(geometry, material);
    return racket;
}

// Créer la balle de tennis
function createTennisBall() {
    const geometry = new THREE.SphereGeometry(0.5, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const ball = new THREE.Mesh(geometry, material);
    return ball;
}

// Créer un objectif de mission avec obstacles
function createMissionObjective() {
    const geometry = new THREE.SphereGeometry(0.5, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const objective = new THREE.Mesh(geometry, material);
    objective.position.set(Math.random() * 10 - 5, 0.5, Math.random() * 10 - 5);
    return objective;
}

// Fonction pour animer la scène
function animate() {
    requestAnimationFrame(animate);

    // Animation des obstacles (déplacement sur l'axe Z)
    obstacles.forEach(obstacle => {
        obstacle.position.z += 0.1;
        if (obstacle.position.z > 50) {
            obstacle.position.z = -50;
        }
    });

    // Vérification de collision (voiture et obstacles)
    if (checkCollision(car, obstacles)) {
        alert("Collision détectée ! Vous avez perdu.");
        car.position.set(0, 0.25, 0); // Réinitialiser la position de la voiture
    }

    renderer.render(scene, camera);
}

// Fonction de détection de collision entre la voiture et les obstacles
function checkCollision(car, obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
        const distance = car.position.distanceTo(obstacles[i].position);
        if (distance < 1) {
            return true; // Collision détectée
        }
    }
    return false;
}

// Créer la scène pour les différents jeux
function init() {
    // Course
    const track = createTrack();
    car = createCar();
    scene.add(track);
    scene.add(car);

    // Football
    const field = createField();
    player1 = createPlayer(0x0000ff);
    player2 = createPlayer(0xff0000);
    ball = createBall();
    scene.add(field);
    scene.add(player1);
    scene.add(player2);
    scene.add(ball);

    // Tennis
    const court = createTennisCourt();
    racket = createRacket();
    const tennisBall = createTennisBall();
    scene.add(court);
    scene.add(racket);
    scene.add(tennisBall);

    // Mission
    objective = createMissionObjective();
    scene.add(objective);

    // Créer des obstacles pour la course
    for (let i = 0; i < 5; i++) {
        createObstacle(); // Créer 5 obstacles
    }

    camera.position.z = 15;

    animate();
}

// Déplacement des éléments
function moveCar() {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') car.position.z -= 0.1;
        if (event.key === 'ArrowDown') car.position.z += 0.1;
        if (event.key === 'ArrowLeft') car.rotation.y += 0.05;
        if (event.key === 'ArrowRight') car.rotation.y -= 0.05;
    });
}

function movePlayer(player, direction) {
    if (direction === 'left') player.position.x -= 0.5;
    if (direction === 'right') player.position.x += 0.5;
    if (direction === 'up') player.position.z -= 0.5;
    if (direction === 'down') player.position.z += 0.5;
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'w') movePlayer(player1, 'up');
    if (event.key === 's') movePlayer(player1, 'down');
    if (event.key === 'a') movePlayer(player1, 'left');
    if (event.key === 'd') movePlayer(player1, 'right');
    if (event.key === 'ArrowLeft') racket.position.x -= 0.5;
    if (event.key === 'ArrowRight') racket.position.x += 0.5;
});

init();
