document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('temporizador');
    const dropzone = document.querySelector('#dropzone');
    const optionsContainer = document.getElementById('options-container');
    const livesElement = document.getElementById('vidas-remaining');
    const nextStepButton = document.getElementById('next-step');
    const skipButton = document.getElementById('skip-preguntas');

    let timeLeft = 300;
    let lives = 3;
    let timer;
    let currentStep = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const progressBar = document.querySelector('.progress');

    function startTimer() {
        timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            progressBar.style.width = `${(timeLeft / 300) * 100}%`;

            if (timeLeft <= 0) {
                stopTimer();
                endGame("¡Se acabó el tiempo! Juego terminado.");
            } else {
                timeLeft--;
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function updateLives() {
        livesElement.textContent = `Vidas ❤️: ${lives}`;
        if (lives === 0) {
            stopTimer();
            endGame("¡Se acabaron las vidas! Juego terminado.");
        }
    }

    function endGame(message) {
        saveResultsAndShowStats();
        setTimeout(() => {
            alert(message); // Muestra el mensaje final del juego
            showStats(); // Muestra las estadísticas solo al final
        }, 500);
    }

    function saveResultsAndShowStats() {
        localStorage.setItem("correctAnswers", correctAnswers);
        localStorage.setItem("incorrectAnswers", incorrectAnswers);
    }

    function showStats() {
        document.getElementById("correct-answers").textContent = localStorage.getItem("correctAnswers") || 0;
        document.getElementById("incorrect-answers").textContent = localStorage.getItem("incorrectAnswers") || 0;

        const statsModal = new bootstrap.Modal(document.getElementById('estadisticasModal'));
        statsModal.show();
    }

    optionsContainer.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('option-button')) {
            e.dataTransfer.setData('text/plain', e.target.textContent);
        }
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
        const step = steps[currentStep];

        if (step.options[step.correctOption] === answer) {
            dropzone.style.backgroundColor = '#b5e7a0';
            correctAnswers++;
        } else {
            dropzone.style.backgroundColor = '#f7b2b7';
            lives--;
            incorrectAnswers++;
            updateLives();
        }

        setTimeout(() => {
            nextQuestion();
        }, 500);
    }

    function nextQuestion() {
        currentStep++;
        if (currentStep < steps.length) {
            showStep();
        } else {
            stopTimer();
            endGame("¡Juego terminado! Has completado todas las preguntas.");
        }
    }

    function showStep() {
        const step = steps[currentStep];

        document.getElementById("preguntas-title").textContent = step.title;
        document.getElementById("preguntas-description").textContent = step.description;
        dropzone.textContent = "Arrastra aquí la respuesta";
        dropzone.style.backgroundColor = "";

        optionsContainer.innerHTML = '';

        step.options.forEach((option, index) => {
            const optionElement = document.createElement("button");
            optionElement.textContent = option;
            optionElement.classList.add("option-button");
            optionElement.draggable = true;

            optionElement.addEventListener("click", () => {
                checkAnswer(option);
            });

            optionsContainer.appendChild(optionElement);
        });
    }

    nextStepButton.addEventListener('click', nextQuestion);

    skipButton.addEventListener('click', () => {
        stopTimer();
        endGame("Juego saltado. Ahora ve las estadísticas.");
    });

    startTimer();
    updateLives();
    showStep();
});

const steps = [
    {
        title: "Pregunta 1",
        description: "¿Cuál de las siguientes opciones es un animal vertebrado?",
        options: ["Perro", "Mosquito", "Pez", "Medusa"],
        correctOption: 0,
        highlight: ".question-container",
    },
    {
        title: "Pregunta 2",
        description: "¿Cuál de los siguientes grupos de animales tiene una columna vertebral?",
        options: ["Artrópodos", "Moluscos", "Vertebrados", "Insectos"],
        correctOption: 2,
        highlight: ".question-container",
    },
    {
        title: "Pregunta 3",
        description: "¿Qué característica diferencia a los vertebrados de los invertebrados?",
        options: ["Tienen exoesqueleto", "Tienen una columna vertebral", "Son todos mamíferos", "Carecen de ojos"],
        correctOption: 1,
        highlight: ".question-container",
    },
    {
        title: "Pregunta 4",
        description: "¿Cuál de los siguientes es un ejemplo de un vertebrado acuático?",
        options: ["Águila", "Delfín", "León", "Gato"],
        correctOption: 1,
        highlight: ".question-container",
    },
    {
        title: "Pregunta 5",
        description: "¿En qué grupo de vertebrados se encuentran los animales que ponen huevos?",
        options: ["Mamíferos", "Aves", "Reptiles", "Peces"],
        correctOption: 1,

    },
];
