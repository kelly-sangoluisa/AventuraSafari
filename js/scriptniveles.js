document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('player-name');
    const easyButton = document.getElementById('easy');
    const normalButton = document.getElementById('normal');
    const hardButton = document.getElementById('hard');
    const startGameButton = document.getElementById('start-game');
  
    let selectedLevel = '';
  
    // Al seleccionar un nivel, guardamos el nivel
    easyButton.addEventListener('click', () => {
        selectedLevel = 'Fácil';
    });
  
    normalButton.addEventListener('click', () => {
        selectedLevel = 'Normal';
    });
  
    hardButton.addEventListener('click', () => {
        selectedLevel = 'Difícil';
    });
  
    // Al hacer clic en 'Comenzar'
    startGameButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName === '') {
            alert('Por favor, ingresa tu nombre.');
            return;
        }
  
        if (!selectedLevel) {
            alert('Por favor, selecciona un nivel.');
            return;
        }
  
        // Guardamos el nombre y el nivel en localStorage
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('selectedLevel', selectedLevel);
  
        // Redirigimos a la página de niveles correspondiente
        if (selectedLevel === 'Fácil') {
            window.location.href = 'nivelFacil.html';
        } else if (selectedLevel === 'Normal') {
            window.location.href = 'nivelMedio.html';
        } else if (selectedLevel === 'Difícil') {
            window.location.href = 'nivelDificil.html';
        }
    });
  });

  
  // Selecciona todos los botones de nivel
const buttons = document.querySelectorAll("button");

// Añade un event listener a cada botón
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Elimina la clase 'selected' de todos los botones
        buttons.forEach(btn => btn.classList.remove("selected"));

        // Añade la clase 'selected' al botón clickeado
        button.classList.add("selected");
    });
});
////////////////////////////////////

