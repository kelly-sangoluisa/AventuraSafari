document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const dropzone = document.querySelector('#dropzone');
    const options = document.querySelectorAll('.option');

    // Temporizador
    let seconds = 0;
    const timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    }, 1000);

    // Arrastrar y Soltar
    options.forEach(option => {
        option.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.textContent);
        });
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        dropzone.textContent = data;
        checkAnswer(data);
    });

    function checkAnswer(answer) {
        if (answer === 'Vertebrados') {
            dropzone.style.backgroundColor = '#b5e7a0'; // Correcto
        } else {
            dropzone.style.backgroundColor = '#f7b2b7'; // Incorrecto
        }
    }
});


//////Nombre de  jugadore y nivel /
document.addEventListener('DOMContentLoaded', () => {
    const playerName = localStorage.getItem('playerName');
    const selectedLevel = localStorage.getItem('selectedLevel');

    if (playerName && selectedLevel) {
        // Mostrar el nombre y nivel
        document.getElementById('welcome-text').textContent = `Bienvenido, ${playerName}!`;
        document.getElementById('level-text').textContent = `Nivel: ${selectedLevel}`;
    } else {
        // Si no se encuentran los datos, redirigir al inicio
        alert("Datos no válidos. Por favor, comienza de nuevo.");
        window.location.href = 'index.html';
    }
});
