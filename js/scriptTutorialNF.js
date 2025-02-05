document.addEventListener('DOMContentLoaded', function() {
    // Cargar nombre del jugador
    const playerName = localStorage.getItem('playerName');
    if (playerName) {
        document.getElementById('player-name').textContent = playerName;
    }

    const tutorialModal = new bootstrap.Modal(document.getElementById('tutorialModal'), {
        backdrop: 'static',
        keyboard: false
    });
    
    // Función para deshabilitar todas las opciones
    function disableAllOptions() {
        document.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'none';
            option.setAttribute('tabindex', '-1');
            option.classList.add('disabled-option');
        });
    }

    // Función para habilitar una opción específica
    function enableOption(selector) {
        const option = document.querySelector(selector);
        if (option) {
            option.style.pointerEvents = 'auto';
            option.setAttribute('tabindex', '0');
            option.classList.remove('disabled-option');
        }
    }

    const steps = [
        {
            title: "Bienvenido al Tutorial",
            message: "El objetivo es seleccionar la respuesta correcta para cada pregunta. Haz clic en 'Entendido' para continuar.",
            highlight: "#next-step",
            setup: () => {
                disableAllOptions();
            }
        },
        {
            title: "Paso 1: La Pregunta",
            message: "Lee cuidadosamente la pregunta: '¿Cuál de las siguientes opciones es un animal vertebrado?'",
            highlight: ".question-container",
            setup: () => {
                disableAllOptions();
            }
        },
        {
            title: "Paso 2: Las Opciones",
            message: "Estas son las opciones disponibles. ¡Prueba a seleccionar cualquiera de ellas!",
            highlight: ".options-container",
            setup: () => {
                // Habilitar todas las opciones para prueba
                document.querySelectorAll('.option').forEach(option => {
                    option.style.pointerEvents = 'auto';
                    option.setAttribute('tabindex', '0');
                    option.classList.remove('disabled-option');
                    
                    // Agregar evento temporal para demostración
                    option.addEventListener('click', function demoClick() {
                        const dropzone = document.querySelector('.answer-dropzone');
                        dropzone.textContent = this.textContent;
                        // Remover el evento después de usarlo
                        option.removeEventListener('click', demoClick);
                        setTimeout(() => nextStep(), 1000);
                    }, { once: true });
                });
            }
        },
        {
            title: "Paso 3: Respuesta Correcta",
            message: "Selecciona 'Vertebrados' para ver qué pasa con una respuesta correcta.",
            highlight: ".option:first-child",
            setup: () => {
                disableAllOptions();
                enableOption('.option:first-child');
            },
            action: function() {
                const firstOption = document.querySelector('.option:first-child');
                firstOption.addEventListener('click', function() {
                    const dropzone = document.querySelector('.answer-dropzone');
                    dropzone.textContent = 'Vertebrados';
                    dropzone.style.backgroundColor = '#b5e7a0';
                    setTimeout(() => nextStep(), 1500);
                }, { once: true });
            }
        },
        {
            title: "Paso 4: Respuesta Incorrecta",
            message: "Ahora selecciona 'Invertebrados' para ver qué pasa con una respuesta incorrecta.",
            highlight: ".option:nth-child(2)",
            setup: () => {
                disableAllOptions();
                enableOption('.option:nth-child(2)');
            },
            action: function() {
                const secondOption = document.querySelector('.option:nth-child(2)');
                secondOption.addEventListener('click', function() {
                    const dropzone = document.querySelector('.answer-dropzone');
                    dropzone.textContent = 'Invertebrados';
                    dropzone.style.backgroundColor = '#f7b2b7';
                    setTimeout(() => nextStep(), 1500);
                }, { once: true });
            }
        },
        {
            title: "¡Tutorial Completado!",
            message: "¡Felicidades! Ya sabes cómo jugar. Haz clic en 'Entendido' para comenzar el juego.",
            highlight: "#next-step",
            setup: () => {
                disableAllOptions();
            }
        }
    ];

    let currentStep = 0;
    const progressBar = document.querySelector('.progress-bar');

    function showStep() {
        const step = steps[currentStep];
        
        // Actualizar título
        document.getElementById('tutorial-title').textContent = step.title;
        document.getElementById('tutorialModalLabel').textContent = step.title;
        
        // Mostrar mensaje en el modal
        document.getElementById('tutorial-message').textContent = step.message;
        
        // Remover highlights anteriores
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });

        // Aplicar nuevo highlight
        if (step.highlight) {
            document.querySelector(step.highlight).classList.add('tutorial-highlight');
        }

        // Configurar las opciones para este paso
        if (step.setup) {
            step.setup();
        }

        // Mostrar el modal
        tutorialModal.show();
    }

    function nextStep() {
        currentStep++;
        if (currentStep < steps.length) {
            showStep();
        } else {
            window.location.href = 'nivelFacil.html';
        }
    }

    // Event Listeners
    document.getElementById('next-step').addEventListener('click', nextStep);
    
    document.getElementById('skip-tutorial').addEventListener('click', function() {
        if (confirm('¿Estás seguro que deseas saltar el tutorial?')) {
            window.location.href = 'nivelFacil.html';
        }
    });

    // Inicializar el temporizador en 5:00 (solo visual)
    document.getElementById('temporizador').textContent = '5:00';

    // Modificar el manejador del botón "Entendido"
    document.getElementById('modal-next').addEventListener('click', function() {
        tutorialModal.hide();
        const step = steps[currentStep];
        if (step.action) {
            step.action();
        }
    });

    // Mostrar el primer paso
    showStep();
});
