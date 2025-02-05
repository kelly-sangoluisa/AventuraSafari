// scriptAjustes.js

document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsLink');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.querySelector('.close-settings');
    const volumeControl = document.getElementById('volumeControl');
    const returnToStart = document.getElementById('returnToStart');

    // Mejorar la interacción con el teclado para el ícono de configuración
    settingsIcon.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (settingsModal) {
                settingsModal.style.display = 'block';
                // Enfocar el primer elemento interactivo del modal
                const firstFocusableElement = settingsModal.querySelector('button, [tabindex="0"], input');
                if (firstFocusableElement) {
                    firstFocusableElement.focus();
                }
            }
        }
    });

    // Abrir modal de ajustes (clic)
    settingsIcon.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation(); // Prevenir propagación del evento
        if (settingsModal) {
            settingsModal.style.display = 'block';
            // Enfocar el primer elemento interactivo del modal
            const firstFocusableElement = settingsModal.querySelector('button, [tabindex="0"], input');
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }
    });

    // Cerrar modal con teclado
    if (closeSettings) {
        closeSettings.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                settingsModal.style.display = 'none';
                settingsIcon.focus(); // Devolver el foco al ícono de configuración
            }
        });

        closeSettings.addEventListener('click', function () {
            settingsModal.style.display = 'none';
            settingsIcon.focus(); // Devolver el foco al ícono de configuración
        });
    }

    // Manejar el ciclo de foco dentro del modal
    settingsModal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = settingsModal.querySelectorAll('button, [tabindex="0"], input');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Tab hacia atrás
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else { // Tab hacia adelante
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }

        if (e.key === 'Escape') {
            settingsModal.style.display = 'none';
            settingsIcon.focus();
        }
    });

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