// scriptAjustes.js

document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsLink');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.querySelector('.close-settings');
    const volumeControl = document.getElementById('volumeControl');
    const returnToStart = document.getElementById('returnToStart');

    // Abrir modal de ajustes
    settingsIcon.addEventListener('click', function (event) {
        event.preventDefault();
        if (settingsModal) {
            settingsModal.style.display = 'block';
        } else {
            console.error('No se encontró el modal de ajustes');
        }
    });

    // Cerrar modal de ajustes
    if (closeSettings) {
        closeSettings.addEventListener('click', function () {
            settingsModal.style.display = 'none';
        });
    }

    // Cerrar modal si se hace clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Ajustar volumen
    if (volumeControl) {
        volumeControl.addEventListener('input', function () {
            const audio = getGameAudio();
            if (audio) {
                audio.volume = this.value;
            }
        });
    }

    // Regresar al inicio
    if (returnToStart) {
        returnToStart.addEventListener('click', function () {
            window.location.href = 'seleccionNivel.html';
        });
    }

    // Agregar logging para depuración
    console.log('Modal:', settingsModal);
    console.log('Close button:', closeSettings);
    console.log('Volume control:', volumeControl);
    console.log('Return button:', returnToStart);
});