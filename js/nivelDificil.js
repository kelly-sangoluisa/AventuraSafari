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

// Mantener registro de selecciones para ambos tipos de interacción
let selectedAnimal = null;
let selectedCharacteristic = null;

function resetSelection() {
    const selectedItems = document.querySelectorAll(".selected:not(.matched)");
    selectedItems.forEach(item => item.classList.remove("selected"));
    currentSelection = null;
    selectedAnimal = null;
    selectedCharacteristic = null;
}

// Manejo de selección con mouse
function handleMouseSelection(event) {
    const selectedElement = event.target;
    
    if (!selectedElement.classList.contains('item') || selectedElement.classList.contains('matched')) {
        return;
    }

    const isAnimal = selectedElement.closest('.grupoanimales');

    if (isAnimal) {
        // Si ya hay un animal seleccionado, deseleccionarlo
        if (selectedAnimal) {
            selectedAnimal.classList.remove('selected');
        }
        selectedAnimal = selectedElement;
        selectedElement.classList.add('selected');
    } else {
        // Si hay un animal seleccionado, intentar hacer match
        if (selectedAnimal) {
            selectedCharacteristic = selectedElement;
            selectedElement.classList.add('selected');
            
            const imageIndex = selectedAnimal.getAttribute('data-index');
            const characteristicIndex = selectedElement.getAttribute('data-index');

            if (imageIndex === characteristicIndex) {
                handleMatch(selectedAnimal, selectedElement);
            } else {
                handleMismatch(selectedAnimal, selectedElement);
            }

            // Resetear selecciones inmediatamente
            resetSelection();
            updateScore();
            comprobarFinJuego();
        } else {
            // Si no hay animal seleccionado, seleccionar la característica
            selectedCharacteristic = selectedElement;
            selectedElement.classList.add('selected');
        }
    }
}

// Manejo de selección con teclado
function handleKeyboardSelection(element) {
    if (!element.classList.contains('item') || element.classList.contains('matched')) {
        return;
    }

    const isAnimal = element.closest('.grupoanimales');
    
    if (isAnimal) {
        if (selectedAnimal) {
            selectedAnimal.classList.remove('selected');
        }
        selectedAnimal = element;
        element.classList.add('selected');
    } else {
        if (selectedAnimal) {
            selectedCharacteristic = element;
            element.classList.add('selected');
            
            const imageIndex = selectedAnimal.getAttribute('data-index');
            const characteristicIndex = element.getAttribute('data-index');

            if (imageIndex === characteristicIndex) {
                handleMatch(selectedAnimal, element);
            } else {
                handleMismatch(selectedAnimal, element);
            }

            // Resetear selecciones inmediatamente
            resetSelection();
            updateScore();
            comprobarFinJuego();
        } else {
            // Si no hay animal seleccionado, seleccionar la característica
            selectedCharacteristic = element;
            element.classList.add('selected');
        }
    }
}

function handleMatch(animalElement, characteristicElement) {
    score++;
    matches++;
    document.getElementById("feedback").textContent = "¡Correcto!";
    animalElement.classList.add("matched");
    characteristicElement.classList.add("matched");
    updateProgressBar();
}

function handleMismatch(animalElement, characteristicElement) {
    vidas--;
    incorrectos++;
    document.getElementById("feedback").textContent = "Incorrecto, intenta nuevamente.";
    document.getElementById("vidas-remaining").textContent = `Vidas ❤️: ${vidas}`;
    
    // Deseleccionar inmediatamente
    setTimeout(() => {
        resetSelection();
    }, 500); // Cambiado a 500 ms para deseleccionar más rápido

    if (vidas <= 0) {
        gameOver();
    }
}

function updateScore() {
    document.getElementById("score").textContent = `Puntaje: ${score}`;
}

function updateProgressBar() {
    const progress = (matches / totalMatches) * 100;
    progressBar.style.width = `${progress}%`;
}

function handleKeyboardNavigation(event) {
    const animalItems = Array.from(document.querySelectorAll('.grupoanimales .item:not(.matched)'));
    const characteristicItems = Array.from(document.querySelectorAll('.characteristics .item:not(.matched)'));
    
    const focusedElement = document.activeElement;
    
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            event.preventDefault();
            handleVerticalNavigation(event.key, animalItems, characteristicItems, focusedElement);
            break;
            
        case 'ArrowLeft':
        case 'ArrowRight':
            event.preventDefault();
            handleHorizontalNavigation(event.key, animalItems, characteristicItems, focusedElement);
            break;
            
        case 'Enter':
        case ' ': // Tecla espaciadora
            event.preventDefault();
            handleKeyboardSelection(focusedElement);
            break;

        case 'Escape':
            resetSelection();
            break;
    }
}

function handleVerticalNavigation(key, animalItems, characteristicItems, focusedElement) {
    let currentList;
    let currentIndex;
    
    if (animalItems.includes(focusedElement)) {
        currentList = animalItems;
    } else if (characteristicItems.includes(focusedElement)) {
        currentList = characteristicItems;
    } else {
        // Si no hay elemento enfocado, enfocar el primer animal
        if (animalItems.length > 0) {
            animalItems[0].focus();
        }
        return;
    }
    
    currentIndex = currentList.indexOf(focusedElement);
    
    if (key === 'ArrowUp' && currentIndex > 0) {
        currentList[currentIndex - 1].focus();
    } else if (key === 'ArrowDown' && currentIndex < currentList.length - 1) {
        currentList[currentIndex + 1].focus();
    }
}

function handleHorizontalNavigation(key, animalItems, characteristicItems, focusedElement) {
    if (animalItems.includes(focusedElement) && key === 'ArrowRight') {
        // Mover de animales a características
        const index = animalItems.indexOf(focusedElement);
        if (characteristicItems.length > 0) {
            characteristicItems[Math.min(index, characteristicItems.length - 1)].focus();
        }
    } else if (characteristicItems.includes(focusedElement) && key === 'ArrowLeft') {
        // Mover de características a animales
        const index = characteristicItems.indexOf(focusedElement);
        if (animalItems.length > 0) {
            animalItems[Math.min(index, animalItems.length - 1)].focus();
        }
    }
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
    if (matches === totalMatches || vidas <= 0) {
        gameOver();
    }
}

function cerrarTutorial() {
    const instructionsOverlay = document.getElementById('tutorial-overlay');
    instructionsOverlay.style.display = 'none';
    
    if (!juegoIniciado) {
        juegoIniciado = true;
        iniciarTemporizador();
    }
    
    // Enfocar el primer animal después de cerrar el tutorial
    const firstAnimal = document.querySelector('.grupoanimales .item');
    if (firstAnimal) {
        firstAnimal.focus();
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
            gameOver();
        }
    }, 1000);
}

function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}

// Inicialización cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar temporizador
    const temporizadorElemento = document.getElementById('temporizador');
    temporizadorElemento.innerText = formatoTiempo(tiempoRestante);
    
    // Cargar datos del jugador
    const playerName = localStorage.getItem('playerName');
    const selectedLevel = localStorage.getItem('selectedLevel');

    if (playerName && selectedLevel) {
        document.getElementById('welcome-text').textContent = `Bienvenido, ${playerName}!`;
        document.getElementById('level-text').textContent = `Nivel: ${selectedLevel}`;
    } else {
        alert("Datos no válidos. Por favor, comienza de nuevo.");
        window.location.href = 'nivelDificil.html';
    }

    // Event listeners para interacción con mouse
    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("click", handleMouseSelection);
    });

    // Event listeners para el tutorial
    document.getElementById('close-instructions').addEventListener('click', cerrarTutorial);
    document.getElementById('close-instructions').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            cerrarTutorial();
        }
    });
    document.getElementById('close-icon').addEventListener('click', cerrarTutorial);
    document.getElementById('close-icon').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            cerrarTutorial();
        }
    });

    // Event listener para navegación con teclado
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Tutorial animation
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

// Estilo para el foco
const style = document.createElement('style');
style.innerHTML = `
    .item:focus {
        outline: none; /* Eliminar el contorno predeterminado */
        border: 2px solid rgba(255, 215, 0, 0.8); /* Borde dorado claro para el foco */
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.8); /* Sombra para mayor visibilidad */
    }
`;
document.head.appendChild(style);

document.getElementById('restart-button').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        window.location.href = 'nivelDificil.html';
    }
});