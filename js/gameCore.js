// game.js
let score = 0;
let matches = 0;
let vidas = 3;
let incorrectos = 0;
let currentSelection = null;
let timer = null;
let tiempoRestante = 300;
let juegoIniciado = false;

const totalMatches = 5;
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

function updateScore() {
    document.getElementById("score").textContent = `Puntaje: ${score}`;
}

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

// Exportar funciones para que puedan ser utilizadas en otros archivos
export {
    handleSelection,
    updateScore,
    updateProgressBar,
    gameOver,
    iniciarTemporizador,
    cerrarTutorial,
    resetSelection,
    comprobarFinJuego,
    score,
    matches,
    vidas,
    incorrectos,
    tiempoRestante
};