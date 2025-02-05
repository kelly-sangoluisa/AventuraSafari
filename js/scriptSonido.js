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
    if (volumeControl) {
        gameAudio.volume = volumeControl.value;
    }

    // Función para actualizar el ícono según el estado
    function updateVolumeIcon(muted) {
        // Simplemente actualizar la clase del ícono existente
        volumeIcon.className = muted ? 'fa-solid fa-volume-mute' : 'fa-solid fa-volume-up';
    }

    // Función para alternar el estado de silencio
    function toggleMute() {
        isMuted = !isMuted;
        
        if (isMuted) {
            gameAudio.volume = 0;
            if (volumeControl) volumeControl.value = 0;
        } else {
            gameAudio.volume = 1;
            if (volumeControl) volumeControl.value = 1;
        }
        
        updateVolumeIcon(isMuted);
    }

    // Manejar el clic en el ícono de volumen
    volumeIcon.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleMute();
    });

    // Manejar interacción con teclado
    volumeIcon.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMute();
        }
    });

    // Manejar el cambio de volumen desde el control deslizante
    if (volumeControl) {
        volumeControl.addEventListener('input', function() {
            gameAudio.volume = this.value;
            isMuted = parseFloat(this.value) === 0;
            updateVolumeIcon(isMuted);
        });
    }

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
});

// Exponer función para acceder al audio desde otros scripts
function getGameAudio() {
    return gameAudio;
}

