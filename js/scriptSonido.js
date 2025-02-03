document.addEventListener('DOMContentLoaded', function () {
    const volumeIcon = document.getElementById('volumeLink');
    let isMuted = false;

    // Crear el elemento de audio
    const gameAudio = new Audio('resources/audio/marimba-tropical-african.mp3');
    gameAudio.loop = true; // Para que el audio se repita

    // Función para iniciar el audio tras la interacción del usuario
    function playAudio() {
        gameAudio.play()
            .then(() => {
                console.log('Audio reproducido automáticamente.');
            })
            .catch((error) => {
                console.error('Error al reproducir automáticamente:', error);
            });
    }

    // Reproducir audio al hacer clic en cualquier parte de la página
    document.body.addEventListener('click', playAudio, { once: true });

    // Mute/desmute al hacer clic en el ícono de volumen
    volumeIcon.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace redirija
        isMuted = !isMuted; // Cambia el estado de mute

        if (isMuted) {
            // Mutea el audio
            gameAudio.pause();
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-mute" aria-hidden="true"></i>';
        } else {
            // Desmutea el audio
            gameAudio.play();
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-up" aria-hidden="true"></i>';
        }
    });
});
