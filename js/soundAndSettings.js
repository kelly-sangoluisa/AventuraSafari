document.addEventListener('DOMContentLoaded', () => {
    const pauseButton = document.getElementById('pause-button');
    const endGameButton = document.getElementById('end-game-button');
    const soundButton = document.getElementById('sound-button'); // Botón para controlar el sonido
    const backgroundMusic = document.getElementById('background-music'); // Elemento de audio

    let isPaused = false;
    let isSoundOn = true;

    // Función para pausar/reanudar el juego
    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? "Reanudar" : "Pausa";

        // Notificar al juego principal que está en pausa
        if (isPaused) {
            dispatchEvent(new CustomEvent('gamePaused'));
        } else {
            dispatchEvent(new CustomEvent('gameResumed'));
        }
    });

    // Función para terminar el juego manualmente
    endGameButton.addEventListener('click', () => {
        dispatchEvent(new CustomEvent('endGameManually'));
    });

    // Función para controlar el sonido
    soundButton.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        soundButton.textContent = isSoundOn ? "🔊 Sonido ON" : "🔇 Sonido OFF";

        if (isSoundOn) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });
});