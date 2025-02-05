// Crear una variable global para el audio
let gameAudio;

document.addEventListener('DOMContentLoaded', function () {
    const volumeIcon = document.getElementById('volumeLink');
    const volumeControl = document.getElementById('volumeControl');
    const startGameModal = new bootstrap.Modal(document.getElementById('startGameModal'));
    let isMuted = false;

    // Inicializar el audio
    gameAudio = new Audio('resources/audio/marimba-tropical-african.mp3');
    gameAudio.loop = true;
    
    // Establecer volumen inicial
    gameAudio.volume = volumeControl.value;

    // Mostrar el modal al cargar la página
    startGameModal.show();

    // Manejar el clic en el botón de comenzar
    document.getElementById('startGameBtn').addEventListener('click', function() {
        gameAudio.play()
            .then(() => {
                console.log('Audio reproducido correctamente');
                startGameModal.hide();
            })
            .catch((error) => {
                console.error('Error al reproducir:', error);
                startGameModal.hide();
            });
    });

    // Manejar cambios en el control de volumen
    volumeControl.addEventListener('input', function() {
        gameAudio.volume = this.value;
        
        // Actualizar el ícono según el volumen
        if (parseFloat(this.value) === 0) {
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-mute" aria-hidden="true"></i>';
            isMuted = true;
        } else {
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-up" aria-hidden="true"></i>';
            isMuted = false;
        }
    });

    // Mute/desmute al hacer clic en el ícono de volumen
    volumeIcon.addEventListener('click', function (event) {
        event.preventDefault();
        isMuted = !isMuted;

        if (isMuted) {
            gameAudio.volume = 0;
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-mute" aria-hidden="true"></i>';
            volumeControl.value = 0;
        } else {
            gameAudio.volume = 1;
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-up" aria-hidden="true"></i>';
            volumeControl.value = 1;
        }
    });
});

// Exponer función para acceder al audio desde otros scripts
function getGameAudio() {
    return gameAudio;
}
