document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const validateButton = document.getElementById("validate-button");
    const resetButton = document.getElementById("reset-button");
    const feedbackElement = document.getElementById("feedback");
    const progressBar = document.getElementById("progress-bar");
    const vidasRemainingElement = document.getElementById("vidas-remaining");
    const scoreElement = document.getElementById("score");
    const temporizadorElemento = document.getElementById('temporizador');

    let score = 0;
    let vidas = 3;
    let tiempoRestante = 300; // 5 minutos
    let timer = null;
    let juegoIniciado = false;

    // Lista de animales con sus tipos
    const animals = [
        { name: "Jellyfish", type: "invertebrate", img: "../img/recursos-nivelMedio/jellyfish.jpg" },
        { name: "Dog", type: "vertebrate", img: "../img/recursos-nivelMedio/dog.jpg" },
        { name: "Starfish", type: "invertebrate", img: "../img/recursos-nivelMedio/starfish.jpg" },
        { name: "Cat", type: "vertebrate", img: "../img/recursos-nivelMedio/cat.jpg" },
        { name: "Bird", type: "vertebrate", img: "../img/recursos-nivelMedio/bird.jpg" },
        { name: "Fish", type: "vertebrate", img: "../img/recursos-nivelMedio/fish.webp" },
        { name: "Crab", type: "invertebrate", img: "../img/recursos-nivelMedio/crab.jpg" },
        { name: "Horse", type: "vertebrate", img: "../img/recursos-nivelMedio/horse.jpg" },
        { name: "Lizard", type: "vertebrate", img: "../img/recursos-nivelMedio/lizard.avif" },
        { name: "Octopus", type: "invertebrate", img: "../img/recursos-nivelMedio/octopus.avif" },
        { name: "Rabbit", type: "vertebrate", img: "../img/recursos-nivelMedio/rabbit.jpg" },
        { name: "Shark", type: "vertebrate", img: "../img/recursos-nivelMedio/shark.jpg" },
        { name: "Snail", type: "invertebrate", img: "../img/recursos-nivelMedio/snail.jpg" },
        { name: "Spider", type: "invertebrate", img: "../img/recursos-nivelMedio/spider.jpg" },
        { name: "Turtle", type: "vertebrate", img: "../img/recursos-nivelMedio/turtle.jpg" },
        { name: "Whale", type: "vertebrate", img: "../img/recursos-nivelMedio/whale.jpg" },
        { name: "Zebra", type: "vertebrate", img: "../img/recursos-nivelMedio/zebra.webp" },
        { name: "Ant", type: "invertebrate", img: "../img/recursos-nivelMedio/ant.webp" },
        { name: "Lombriz", type: "invertebrate", img: "../img/recursos-nivelMedio/lombriz.jpg" },
        { name: "Butterfly", type: "invertebrate", img: "../img/recursos-nivelMedio/butterfly.jpg" },
        { name: "Elephant", type: "vertebrate", img: "../img/recursos-nivelMedio/elephant.jpg" }
    ];

    // Función para mezclar el arreglo
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Crear las celdas de la tabla
    const createCell = (animal) => {
        const cell = document.createElement("td");
        const img = document.createElement("img");
        img.src = animal.img;
        img.alt = animal.name;

        cell.appendChild(img);
        cell.dataset.type = animal.type;

        // Alternar selección
        cell.addEventListener("click", () => {
            cell.classList.toggle("selected");
        });

        return cell;
    };

    // Poblar el tablero
    const populateBoard = () => {
        gameBoard.innerHTML = ""; // Limpiar tablero existente
        shuffleArray(animals);
        const rows = 2;
        const cols = 7;
        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < cols; j++) {
                const animal = animals[i * cols + j];
                row.appendChild(createCell(animal));
            }
            gameBoard.appendChild(row);
        }
    };

    // Validar selección
    const validateSelection = () => {
        const cells = document.querySelectorAll("td");
        cells.forEach((cell) => {
            if (cell.classList.contains("selected")) {
                const isCorrect = cell.dataset.type === "invertebrate";
                cell.classList.remove("selected");
                cell.classList.add(isCorrect ? "correct" : "incorrect");

                if (isCorrect) {
                    score += 10;
                    feedbackElement.textContent = "¡Bien hecho!";
                } else {
                    vidas--;
                    feedbackElement.textContent = "Incorrecto. Pierdes una vida.";
                    if (vidas <= 0) {
                        gameOver();
                    }
                }

                // Actualizar puntaje y vidas
                scoreElement.textContent = `Puntaje: ${score}`;
                vidasRemainingElement.textContent = `Vidas ❤️: ${vidas}`;
                updateProgressBar();
            }
        });
    };

    // Actualizar barra de progreso
    const updateProgressBar = () => {
        const totalInvertebrates = animals.filter(animal => animal.type === "invertebrate").length;
        const progress = (score / (totalInvertebrates * 10)) * 100; // Cada respuesta correcta suma 10 puntos
        progressBar.style.width = `${progress}%`;
    };

    // Función de Game Over
    const gameOver = () => {
        clearInterval(timer);
        document.getElementById('game-over-overlay').style.display = "flex";
        document.getElementById('score-result').textContent = "Puntaje: " + score;
        document.getElementById('vidas-result').textContent = "Vidas Restantes: " + vidas;
    };

    // Reiniciar juego
    const resetGame = () => {
        const cells = document.querySelectorAll("td");
        cells.forEach((cell) => {
            cell.classList.remove("selected", "correct", "incorrect");
        });
        score = 0;
        vidas = 3;
        feedbackElement.textContent = "";
        scoreElement.textContent = "Puntaje: 0";
        vidasRemainingElement.textContent = "Vidas ❤️: 3";
        populateBoard();
        updateProgressBar();
    };

    // Función para iniciar el temporizador
    const iniciarTemporizador = () => {
        if (timer !== null) return;

        temporizadorElemento.innerText = formatoTiempo(tiempoRestante);
        timer = setInterval(() => {
            if (tiempoRestante > 0) {
                tiempoRestante--;
                temporizadorElemento.innerText = formatoTiempo(tiempoRestante);
            } else {
                clearInterval(timer);
                timer = null;
                gameOver();
            }
        }, 1000);
    };

    const formatoTiempo = (segundos) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    };

    // Eventos de botones
    validateButton.addEventListener("click", validateSelection);
    resetButton.addEventListener("click", () => {
        resetGame();
        populateBoard(); // Reinicia el tablero
    });

    // Cerrar tutorial y empezar el juego
    document.getElementById('close-instructions').addEventListener('click', () => {
        document.getElementById('tutorial-overlay').style.display = 'none';
        if (!juegoIniciado) {
            juegoIniciado = true;
            iniciarTemporizador();
        }
    });

    document.getElementById('close-icon').addEventListener('click', () => {
        document.getElementById('tutorial-overlay').style.display = 'none';
        if (!juegoIniciado) {
            juegoIniciado = true;
            iniciarTemporizador();
        }
    });

    // Inicializar tablero al cargar la página
    populateBoard();
});

document.addEventListener('DOMContentLoaded', () => {
    const playerName = localStorage.getItem('playerName');
    const selectedLevel = localStorage.getItem('selectedLevel');

    if (playerName && selectedLevel) {
        // Mostrar el nombre y nivel
        document.getElementById('welcome-text').textContent = `Bienvenido, ${playerName}!`;
        document.getElementById('level-text').textContent = `Nivel: ${selectedLevel}`;
    } else {
        // Si no se encuentran los datos, redirigir al inicio
        alert("Datos no válidos. Por favor, comienza de nuevo.");
        window.location.href = 'index.html';
    }
});
