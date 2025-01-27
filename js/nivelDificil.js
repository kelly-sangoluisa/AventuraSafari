let score = 0;
let matches = 0;
let vidas = 3;
let incorrectos = 0;
let currentSelection = null;
const totalMatches = 5;
let timer = null;
let tiempoRestante = 300;
let juegoIniciado = false;

const progressBar = document.getElementById("progress-bar");

function resetSelection() {
    const selectedItems = document.querySelectorAll(".selected");
    selectedItems.forEach(item => item.classList.remove("selected"));
    currentSelection = null;
}

function handleSelection(event) {
    const selectedElement = event.target;

    if (currentSelection && currentSelection !== selectedElement) {
        selectedElement.classList.add("selected");
        const imageIndex = currentSelection.getAttribute("data-index");
        const characteristicIndex = selectedElement.getAttribute("data-index");

        if (imageIndex === characteristicIndex) {
            score++;
            matches++;
            document.getElementById("feedback").textContent = "¡Correcto!";
            currentSelection.classList.add("matched");
            selectedElement.classList.add("matched");
            updateProgressBar();
        } else {
            vidas--;
            incorrectos++;
            document.getElementById("feedback").textContent = "Incorrecto, intenta nuevamente.";
            document.getElementById("vidas-remaining").textContent = `Vidas ❤️: ${vidas}`;

            if (vidas <= 0) {
                gameOver();
                return;
            }
        }

        setTimeout(() => {
            resetSelection();
            updateScore();
            comprobarFinJuego();
        }, 1000);
    } else if (!currentSelection) {
        selectedElement.classList.add("selected");
        currentSelection = selectedElement;
    }
}
//Actualizar  Puntaje 

function updateScore() {
    document.getElementById("score").textContent = `Puntaje: ${score}`;
}

//barra de pogreso 
function updateProgressBar() {
    const progress = (matches / totalMatches) * 100;
    progressBar.style.width = `${progress}%`;
}

function gameOver() {
    document.getElementById('game-over-overlay').style.display = "flex";
    document.getElementById('score-result').textContent = "Puntaje: " + score;
    document.getElementById('vidas-result').textContent = "Vidas Restantes: " + vidas;
    document.getElementById('incorrectos-result').textContent = "Respuestas Incorrectas: " + incorrectos;
    
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function comprobarFinJuego() {
    if (vidas <= 0) {
        gameOver();
    }
}

function iniciarTemporizador() {
    if (timer !== null) {
        return;
    }

    const temporizadorElemento = document.getElementById('temporizador');
    temporizadorElemento.innerText = formatoTiempo(tiempoRestante);

    timer = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            temporizadorElemento.innerText = formatoTiempo(tiempoRestante);
        } else {
            clearInterval(timer);
            timer = null;
            alert('¡Se acabó el tiempo!');
            gameOver();
        }
    }, 1000);
}

function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}

function cerrarTutorial() {
    const instructionsOverlay = document.getElementById('tutorial-overlay');
    instructionsOverlay.style.display = 'none';
    
    if (!juegoIniciado) {
        juegoIniciado = true;
        iniciarTemporizador();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const temporizadorElemento = document.getElementById('temporizador');
    temporizadorElemento.innerText = formatoTiempo(tiempoRestante);
    
    const playerName = localStorage.getItem('playerName');
    const selectedLevel = localStorage.getItem('selectedLevel');

    if (playerName && selectedLevel) {
        document.getElementById('welcome-text').textContent = `Bienvenido, ${playerName}!`;
        document.getElementById('level-text').textContent = `Nivel: ${selectedLevel}`;
    } else {
        alert("Datos no válidos. Por favor, comienza de nuevo.");
        window.location.href = 'nivelDificil.html';
    }

    // Event listeners para los items del juego
    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("click", handleSelection);
    });

    // Event listeners para cerrar el tutorial
    document.getElementById('close-instructions').addEventListener('click', cerrarTutorial);
    document.getElementById('close-icon').addEventListener('click', cerrarTutorial);

    // Mini tutorial de juego
    const pointer = document.getElementById('pointer');
    const animal = document.getElementById('animal');
    const species = document.getElementById('species');

    function animateSelection() {
        setTimeout(() => {
            pointer.style.transform = 'translate(-50%, -20%) translateX(-120px)';
            animal.style.backgroundColor = '#d1e7dd';
            setTimeout(() => {
                pointer.style.transform = 'translate(-50%, -20%) translateX(100px)';
                setTimeout(() => {
                    species.style.backgroundColor = '#d1e7dd';
                    setTimeout(() => {
                        animal.style.transform = 'scale(1.1)';
                        species.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            animal.style.transform = 'scale(1)';
                            species.style.transform = 'scale(1)';
                            animal.style.backgroundColor = '#198754';
                            species.style.backgroundColor = '#198754';
                            animateSelection();
                        }, 500);
                    }, 400);
                }, 600);
            }, 600);
        }, 500);
    }

    animateSelection();
});

// Manejo de teclas
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        const items = document.querySelectorAll(".item");
        let index = Array.from(items).indexOf(document.querySelector(".selected"));
        if (event.key === "ArrowDown" && index < items.length - 1) {
            items[index + 1].classList.add("selected");
            items[index].classList.remove("selected");
        } else if (event.key === "ArrowUp" && index > 0) {
            items[index - 1].classList.add("selected");
            items[index].classList.remove("selected");
        }
    } else if (event.key === "Enter" && currentSelection) {
        const selectedElement = currentSelection;
        selectedElement.click();
    }
});