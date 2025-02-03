// scriptAjustes.js

document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsLink');

    // Crear el modal de ajustes
    const settingsModal = document.createElement('div');
    settingsModal.id = 'settingsModal';
    settingsModal.style.display = 'none'; // Inicialmente oculto
    settingsModal.style.position = 'fixed';
    settingsModal.style.top = '0';
    settingsModal.style.left = '0';
    settingsModal.style.width = '100%';
    settingsModal.style.height = '100%';
    settingsModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo oscuro transparente
    settingsModal.style.zIndex = '1000';

    // Contenido del modal
    const settingsContent = document.createElement('div');
    settingsContent.style.position = 'fixed';
    settingsContent.style.top = '50%';
    settingsContent.style.left = '50%';
    settingsContent.style.transform = 'translate(-50%, -50%)';
    settingsContent.style.backgroundColor = '#fff';
    settingsContent.style.padding = '20px';
    settingsContent.style.borderRadius = '10px';
    settingsContent.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    settingsContent.style.textAlign = 'center';

    settingsContent.innerHTML = `
        <h2>Ajustes</h2>
        <div class="settings-option">
            <label for="volumeControl">Volumen:</label>
            <input type="range" id="volumeControl" min="0" max="1" step="0.1" value="1">
        </div>
        <div class="settings-option">
            <button id="returnToStart" class="btn btn-primary">Regresar al Inicio</button>
        </div>
        <span id="closeSettings" style="cursor: pointer; float: right; font-size: 20px;">&times;</span>
    `;

    // Añadir el contenido al modal
    settingsModal.appendChild(settingsContent);

    // Añadir el modal al body
    document.body.appendChild(settingsModal);

    // Abrir modal de ajustes
    settingsIcon.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace redirija
        settingsModal.style.display = 'block';
    });

    // Cerrar modal de ajustes
    const closeSettings = document.getElementById('closeSettings');
    closeSettings.addEventListener('click', function () {
        settingsModal.style.display = 'none';
    });

    // Cerrar modal si se hace clic fuera de él
    settingsModal.addEventListener('click', function (event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Ajustar volumen
    const volumeControl = document.getElementById('volumeControl');
    const gameAudio = new Audio('resources/audio/marimba-tropical-african.mp3'); // Asegúrate de que sea el mismo audio que en scriptSonido.js
    gameAudio.volume = volumeControl.value; // Establecer el volumen inicial

    volumeControl.addEventListener('input', function () {
        gameAudio.volume = volumeControl.value; // Actualizar el volumen
    });

    // Regresar al inicio
    const returnToStart = document.getElementById('returnToStart');
    returnToStart.addEventListener('click', function () {
        window.location.href = 'index.html'; // Cambia 'index.html' por la URL de tu página de inicio
    });
});