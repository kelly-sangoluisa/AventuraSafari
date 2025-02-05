document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const dropzone = document.querySelector('#dropzone');
    const optionsContainer = document.getElementById('options-container');
    const preguntasTitle = document.getElementById('preguntas-title');
    const preguntasDescription = document.getElementById('preguntas-description');
    const temporizador = document.getElementById('temporizador');
    const progressBar = document.querySelector('.progress');

    // Variables del temporizador
    const tiempoTotal = 300; // 5 minutos en segundos
    let tiempoRestante = tiempoTotal;
    let timer;

    // Variables para el control de pausa
    let isPaused = false;
    let savedTime;

    // Función para iniciar el temporizador
    function iniciarTemporizador() {
        if (timer) clearInterval(timer);
        
        timer = setInterval(() => {
            if (!isPaused) {
                tiempoRestante--;
                const minutos = Math.floor(tiempoRestante / 60);
                const segundos = tiempoRestante % 60;
                temporizador.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
                
                // Actualizar barra de progreso del tiempo
                const porcentajeTiempo = (tiempoRestante / tiempoTotal) * 100;
                progressBar.style.width = `${porcentajeTiempo}%`;
                
                if (tiempoRestante <= 0) {
                    clearInterval(timer);
                    alert('¡Se acabó el tiempo!');
                    mostrarEstadisticas();
                }
            }
        }, 1000);
    }

    // Manejar el botón de comenzar juego
    document.getElementById('startGameBtn').addEventListener('click', function() {
        iniciarTemporizador();
        isPaused = false; // Asegurarse de que el juego comience sin pausa
    });

    // Array de preguntas
    const preguntas = [
        {
            titulo: "Pregunta 1",
            descripcion: "¿Cuál de las siguientes opciones es un animal vertebrado?",
            opciones: ["Perro", "Mariposa", "Araña", "Caracol"],
            respuestaCorrecta: "Perro"
        },
        {
            titulo: "Pregunta 2",
            descripcion: "¿Cuál de estos animales es un insecto?",
            opciones: ["Gato", "Mariposa", "Pez", "Rana"],
            respuestaCorrecta: "Mariposa"
        },
        {
            titulo: "Pregunta 3",
            descripcion: "¿Cuál de estos animales vive en el agua?",
            opciones: ["Pez", "Águila", "Conejo", "Serpiente"],
            respuestaCorrecta: "Pez"
        },
        {
            titulo: "Pregunta 4",
            descripcion: "¿Cuál de estos animales es un reptil?",
            opciones: ["Serpiente", "Paloma", "Ratón", "Abeja"],
            respuestaCorrecta: "Serpiente"
        },
        {
            titulo: "Pregunta 5",
            descripcion: "¿Cuál de estos animales es un ave?",
            opciones: ["Delfín", "Rana", "Águila", "Lagarto"],
            respuestaCorrecta: "Águila"
        }
    ];

    let preguntaActual = 0;

    // Variables para estadísticas
    let respuestasCorrectas = 0;
    let respuestasIncorrectas = 0;

    // Función para mostrar la pregunta actual
    function mostrarPregunta() {
        const pregunta = preguntas[preguntaActual];
        
        // Actualizar título y descripción
        preguntasTitle.textContent = pregunta.titulo;
        preguntasDescription.textContent = pregunta.descripcion;
        
        // Limpiar el contenedor de opciones
        optionsContainer.innerHTML = '';
        
        // Crear y agregar nuevas opciones
        pregunta.opciones.forEach(opcion => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = opcion;
            // Ya no lo hacemos draggable
            optionDiv.setAttribute('tabindex', '0');
            optionsContainer.appendChild(optionDiv);
            
            // Función unificada para manejar la selección
            function seleccionarOpcion() {
                const dropzoneElement = dropzone.querySelector('.answer-dropzone');
                dropzoneElement.textContent = opcion;
                verificarRespuesta(opcion);
            }

            // Click con mouse
            optionDiv.addEventListener('click', seleccionarOpcion);

            // Teclado (Enter o Espacio)
            optionDiv.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    seleccionarOpcion();
                }
            });
        });

        // Resetear la zona de respuesta
        const dropzoneElement = dropzone.querySelector('.answer-dropzone');
        dropzoneElement.textContent = 'Selecciona una respuesta';
        dropzoneElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }

    // Función para mostrar estadísticas
    function mostrarEstadisticas() {
        // Detener el temporizador cuando se muestren las estadísticas
        clearInterval(timer);
        
        document.getElementById('correct-answers').textContent = respuestasCorrectas;
        document.getElementById('incorrect-answers').textContent = respuestasIncorrectas;
        const estadisticasModal = new bootstrap.Modal(document.getElementById('estadisticasModal'));
        estadisticasModal.show();

        document.getElementById('estadisticasModal').addEventListener('hidden.bs.modal', function () {
            if (confirm('¿Deseas pasar al siguiente nivel?')) {
                window.location.href = 'nivelMedio.html';
            } else {
                preguntaActual = 0;
                tiempoRestante = tiempoTotal; // Reiniciar el tiempo si se quiere intentar de nuevo
                mostrarPregunta();
                iniciarTemporizador(); // Reiniciar el temporizador
            }
        }, { once: true });
    }

    // Función para verificar respuesta
    function verificarRespuesta(respuesta) {
        const preguntaActualObj = preguntas[preguntaActual];
        const dropzoneElement = dropzone.querySelector('.answer-dropzone');
        
        if (respuesta === preguntaActualObj.respuestaCorrecta) {
            dropzoneElement.style.backgroundColor = '#b5e7a0';
            respuestasCorrectas++;
            setTimeout(() => {
                pasarSiguientePregunta();
            }, 1000);
        } else {
            dropzoneElement.style.backgroundColor = '#f7b2b7';
            respuestasIncorrectas++;
            setTimeout(() => {
                dropzoneElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                dropzoneElement.textContent = 'Selecciona una respuesta';
                pasarSiguientePregunta();
            }, 1000);
        }
    }

    // Función para pasar a la siguiente pregunta
    function pasarSiguientePregunta() {
        preguntaActual++;
        if (preguntaActual >= preguntas.length) {
            mostrarEstadisticas();
        } else {
            mostrarPregunta();
        }
    }

    // Configurar zona de soltar (para drag and drop)
    dropzone.addEventListener('dragover', (e) => e.preventDefault());
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const respuesta = e.dataTransfer.getData('text/plain');
        const dropzoneElement = dropzone.querySelector('.answer-dropzone');
        dropzoneElement.textContent = respuesta;
        verificarRespuesta(respuesta);
    });

    // Botón para saltar preguntas
    const skipButton = document.getElementById('skip-preguntas');
    skipButton.addEventListener('click', function() {
        pasarSiguientePregunta();
    });

    // Botón para salir al menú
    const exitButton = document.getElementById('exit-level');
    exitButton.addEventListener('click', function() {
        if (confirm('¿Estás seguro que deseas salir al menú? Perderás tu progreso actual.')) {
            clearInterval(timer); // Detener el temporizador antes de salir
            window.location.href = 'seleccionNivel.html';
        }
    });

    // Botón para pasar al siguiente nivel
    const nextLevelButton = document.getElementById('next-level');
    nextLevelButton.addEventListener('click', function() {
        if (confirm('¿Estás seguro que deseas pasar al nivel medio? Se guardarán tus estadísticas actuales.')) {
            clearInterval(timer); // Detener el temporizador
            document.getElementById('correct-answers').textContent = respuestasCorrectas;
            document.getElementById('incorrect-answers').textContent = respuestasIncorrectas;
            
            const estadisticasModal = new bootstrap.Modal(document.getElementById('estadisticasModal'));
            estadisticasModal.show();

            document.getElementById('estadisticasModal').addEventListener('hidden.bs.modal', function () {
                window.location.href = 'nivelMedio.html';
            }, { once: true });
        }
    });

    // Cargar nombre del jugador
    const playerName = localStorage.getItem('playerName');
    const selectedLevel = localStorage.getItem('selectedLevel');

    if (playerName && selectedLevel) {
        document.getElementById('player-name').textContent = playerName;
        document.getElementById('welcome-text').textContent = `Bienvenido, ${playerName}!`;
        document.getElementById('level-text').textContent = `Nivel: ${selectedLevel}`;
    }

    // Mostrar la primera pregunta al cargar, pero NO iniciar el temporizador aquí
    mostrarPregunta();

    // Función para pausar/reanudar el juego
    function togglePause() {
        const pauseButton = document.getElementById('pauseButton');
        const skipButton = document.getElementById('skip-preguntas');
        const nextLevelButton = document.getElementById('next-level');
        const exitButton = document.getElementById('exit-level');
        isPaused = !isPaused;

        if (isPaused) {
            // Pausar el juego
            clearInterval(timer);
            savedTime = tiempoRestante;
            pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> Reanudar Juego';
            // Deshabilitar interacción con las opciones y botones
            const opciones = document.querySelectorAll('.option');
            opciones.forEach(opcion => {
                opcion.style.pointerEvents = 'none';
                opcion.setAttribute('tabindex', '-1');
            });
            // Deshabilitar botones
            skipButton.disabled = true;
            nextLevelButton.disabled = true;
            exitButton.disabled = true;
        } else {
            // Reanudar el juego
            tiempoRestante = savedTime;
            iniciarTemporizador();
            pauseButton.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar Juego';
            // Rehabilitar interacción con las opciones y botones
            const opciones = document.querySelectorAll('.option');
            opciones.forEach(opcion => {
                opcion.style.pointerEvents = 'auto';
                opcion.setAttribute('tabindex', '0');
            });
            // Habilitar botones
            skipButton.disabled = false;
            nextLevelButton.disabled = false;
            exitButton.disabled = false;
        }
    }

    // Agregar event listener para el botón de pausa
    document.getElementById('pauseButton').addEventListener('click', function() {
        togglePause();
        // Cerrar el modal de ajustes al pausar/reanudar
        document.getElementById('settingsModal').style.display = 'none';
    });
});
