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
    
    // Add focus to the button when game over screen appears
    const playAgainButton = document.querySelector('#game-over button');
    playAgainButton.focus();

    // Add keyboard event listener for the button
    playAgainButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            window.location.href = 'nivelDificil.html';
        }
    });
    
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

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        cerrarTutorial();
    }
});

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

// Add these variables to your existing globals
let currentFocusedGroup = 'grupoanimal'; // Track which group (animals or characteristics) is focused
let currentFocusIndex = 0; // Track index within current group

function handleKeyboardNavigation(event) {
    const grupoanimalItems = Array.from(document.querySelectorAll('.grupoanimales .item'));
    const characteristicItems = Array.from(document.querySelectorAll('.characteristics .item'));
    
    switch(event.key) {
        case 'Tab':
            event.preventDefault();
            // Toggle between animal and characteristic groups
            currentFocusedGroup = currentFocusedGroup === 'grupoanimal' ? 'characteristic' : 'grupoanimal';
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            if (currentFocusIndex > 0) {
                currentFocusIndex--;
            }
            break;
            
        case 'ArrowDown':
            event.preventDefault();
            const maxIndex = currentFocusedGroup === 'grupoanimal' ? 
                grupoanimalItems.length - 1 : 
                characteristicItems.length - 1;
            if (currentFocusIndex < maxIndex) {
                currentFocusIndex++;
            }
            break;
            
        case 'Enter':
            event.preventDefault();
            const currentItems = currentFocusedGroup === 'grupoanimal' ? 
                grupoanimalItems : 
                characteristicItems;
            
            const selectedElement = currentItems[currentFocusIndex];
            if (selectedElement) {
                handleKeyboardSelection(selectedElement);
            }
            break;
    }
    
    // Update visual focus
    updateFocus(grupoanimalItems, characteristicItems);
}

function updateFocus(grupoanimalItems, characteristicItems) {
    // Remove focus from all items
    document.querySelectorAll('.item').forEach(item => {
        item.classList.remove('keyboard-focus');
    });
    
    // Add focus to current item
    const currentItems = currentFocusedGroup === 'grupoanimal' ? 
        grupoanimalItems : 
        characteristicItems;
    
    if (currentItems[currentFocusIndex]) {
        currentItems[currentFocusIndex].classList.add('keyboard-focus');
        currentItems[currentFocusIndex].focus();
    }
}

function handleKeyboardMatch(event) {
    if (event.key === 'Enter') {
        const element = document.activeElement;
        if (element.classList.contains('item')) {
            const event = { target: element };
            handleSelection(event);
        }
    } else if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        const grupoanimalItems = Array.from(document.querySelectorAll('.grupoanimales .item'));
        const characteristicItems = Array.from(document.querySelectorAll('.characteristics .item'));
        const currentElement = document.activeElement;
        
        if (!currentElement.classList.contains('item')) return;
        
        const isInGrupoAnimales = grupoanimalItems.includes(currentElement);
        const currentList = isInGrupoAnimales ? grupoanimalItems : characteristicItems;
        const otherList = isInGrupoAnimales ? characteristicItems : grupoanimalItems;
        const currentIndex = currentList.indexOf(currentElement);
        
        let nextElement;
        
        switch(event.key) {
            case 'ArrowRight':
                if (isInGrupoAnimales) {
                    nextElement = characteristicItems[currentIndex] || characteristicItems[0];
                } else {
                    nextElement = characteristicItems[(currentIndex + 1) % characteristicItems.length];
                }
                break;
                
            case 'ArrowLeft':
                if (!isInGrupoAnimales) {
                    nextElement = grupoanimalItems[currentIndex] || grupoanimalItems[0];
                } else {
                    nextElement = grupoanimalItems[(currentIndex - 1 + grupoanimalItems.length) % grupoanimalItems.length];
                }
                break;
                
            case 'ArrowDown':
                nextElement = currentList[(currentIndex + 1) % currentList.length];
                break;
                
            case 'ArrowUp':
                nextElement = currentList[(currentIndex - 1 + currentList.length) % currentList.length];
                break;
        }
        
        if (nextElement) {
            nextElement.focus();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyboardMatch);
    
    const style = document.createElement('style');
    style.textContent = `
        .item:focus {
            outline: 3px solid #007bff;
            box-shadow: 0 0 5px rgba(0,123,255,0.5);
        }
    `;
    document.head.appendChild(style);
});