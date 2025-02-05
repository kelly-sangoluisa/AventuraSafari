let score = 0;
let matches = 0;
let vidas = 3;
let incorrectos = 0;
let currentSelection = null;
const totalMatches = 5;
let timer = null;
let tiempoRestante = 300;
let juegoIniciado = false;
let currentFocusedColumn = 'left';
let currentFocusedIndex = 0;

const progressBar = document.getElementById("progress-bar");

function resetSelection() {
    const selectedItems = document.querySelectorAll(".selected");
    selectedItems.forEach(item => item.classList.remove("selected"));
    currentSelection = null;
}

function handleSelection(element) {
    if (!element || element.classList.contains('matched')) return;

    if (currentSelection && currentSelection !== element) {
        element.classList.add("selected");
        const imageIndex = currentSelection.getAttribute("data-index");
        const characteristicIndex = element.getAttribute("data-index");

        if (imageIndex === characteristicIndex) {
            score++;
            matches++;
            document.getElementById("feedback").textContent = "¡Correcto!";
            currentSelection.classList.add("matched");
            element.classList.add("matched");
            updateProgressBar();
        } else {
            vidas--;
            incorrectos++;
            document.getElementById("feedback").textContent = "Incorrecto, intenta nuevamente.";
            document.getElementById("vidas-remaining").textContent = Vidas ❤: ${vidas};

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
        element.classList.add("selected");
        currentSelection = element;
    }
}

function updateScore() {
    document.getElementById("score").textContent = Puntaje: ${score};
}

function updateProgressBar() {
    const progress = (matches / totalMatches) * 100;
    progressBar.style.width = ${progress}%;
}

function gameOver() {
    const gameOverOverlay = document.getElementById('game-over-overlay');
    gameOverOverlay.style.display = "flex";
    gameOverOverlay.setAttribute('aria-hidden', 'false');
    
    document.getElementById('score-result').textContent = "Puntaje: " + score;
    document.getElementById('vidas-result').textContent = "Vidas Restantes: " + vidas;
    document.getElementById('incorrectos-result').textContent = "Respuestas Incorrectas: " + incorrectos;
    
    document.getElementById('game-over').focus();
    
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function comprobarFinJuego() {
    if (matches === totalMatches || vidas <= 0 || tiempoRestante <= 0) {
        gameOver();
    }
}

function iniciarTemporizador() {
    if (timer !== null) return;

    const temporizadorElemento = document.getElementById('temporizador');
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
}

function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return ${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')};
}

function cerrarTutorial() {
    const instructionsOverlay = document.getElementById('tutorial-overlay');
    instructionsOverlay.style.display = 'none';
    
    if (!juegoIniciado) {
        juegoIniciado = true;
        iniciarTemporizador();
    }
}

function handleKeyboardNavigation(event) {
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    
    if (gameOverOverlay.style.display === "flex") {
        if (event.key === "Enter") {
            window.location.href = 'nivelDificil.html';
        }
        return;
    }

    if (tutorialOverlay.style.display !== 'none') {
        if (event.key === "Enter") {
            cerrarTutorial();
            return;
        }
    }

    const leftColumn = Array.from(document.querySelectorAll("#grupoanimal-list .item:not(.matched)"));
    const rightColumn = Array.from(document.querySelectorAll("#characteristics-list .item:not(.matched)"));
    
    let currentColumn = currentFocusedColumn === 'left' ? leftColumn : rightColumn;
    
    switch(event.key) {
        case "ArrowUp":
            event.preventDefault();
            if (currentFocusedIndex > 0) {
                currentFocusedIndex--;
                currentColumn[currentFocusedIndex]?.focus();
            }
            break;
        case "ArrowDown":
            event.preventDefault();
            if (currentFocusedIndex < currentColumn.length - 1) {
                currentFocusedIndex++;
                currentColumn[currentFocusedIndex]?.focus();
            }
            break;
        case "ArrowLeft":
            event.preventDefault();
            if (currentFocusedColumn === 'right') {
                currentFocusedColumn = 'left';
                currentFocusedIndex = Math.min(currentFocusedIndex, leftColumn.length - 1);
                leftColumn[currentFocusedIndex]?.focus();
            }
            break;
        case "ArrowRight":
            event.preventDefault();
            if (currentFocusedColumn === 'left') {
                currentFocusedColumn = 'right';
                currentFocusedIndex = Math.min(currentFocusedIndex, rightColumn.length - 1);
                rightColumn[currentFocusedIndex]?.focus();
            }
            break;
        case "Enter":
            event.preventDefault();
            if (currentColumn[currentFocusedIndex]) {
                handleSelection(currentColumn[currentFocusedIndex]);
            }
            break;
        case "Tab":
            event.preventDefault();
            currentFocusedColumn = currentFocusedColumn === 'left' ? 'right' : 'left';
            const newColumn = currentFocusedColumn === 'left' ? leftColumn : rightColumn;
            currentFocusedIndex = Math.min(currentFocusedIndex, newColumn.length - 1);
            newColumn[currentFocusedIndex]?.focus();
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const temporizadorElemento = document.getElementById('temporizador');
    temporizadorElemento.innerText = formatoTiempo(tiempoRestante);
    
    const playerName = localStorage.getItem('playerName');
    const selectedLevel = localStorage.getItem('selectedLevel');

    if (playerName && selectedLevel) {
        document.getElementById('welcome-text').textContent = Bienvenido, ${playerName}!;
        document.getElementById('level-text').textContent = Nivel: ${selectedLevel};
    } else {
        alert("Datos no válidos. Por favor, comienza de nuevo.");
        window.location.href = 'nivelDificil.html';
    }

    const items = document.querySelectorAll(".item");
    items.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.addEventListener("click", () => handleSelection(item));
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleSelection(item);
            }
        });
    });

    document.addEventListener("keydown", handleKeyboardNavigation);
    document.getElementById('close-instructions').addEventListener('click', cerrarTutorial);
    document.getElementById('close-icon').addEventListener('click', cerrarTutorial);

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