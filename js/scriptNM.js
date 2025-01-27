document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const validateButton = document.getElementById("validate-button");
    const resetButton = document.getElementById("reset-button");

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
        img.src = `img/${animal.img}`;
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
        const rows = 3;
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
            }
        });
    };

    // Reiniciar juego
    const resetGame = () => {
        const cells = document.querySelectorAll("td");
        cells.forEach((cell) => {
            cell.classList.remove("selected", "correct", "incorrect");
        });
    };

    // Eventos de botones
    validateButton.addEventListener("click", validateSelection);
    resetButton.addEventListener("click", () => {
        resetGame();
        populateBoard(); // Reinicia el tablero
    });

    // Inicializar tablero al cargar la página
    populateBoard();
});
