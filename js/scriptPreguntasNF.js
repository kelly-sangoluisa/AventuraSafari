const steps = [
    {
        title: "Pregunta 1",
        description: "¿Cuál de las siguientes opciones es un animal vertebrado?",
        options: [
            "Perro",       // Opción 0 (Correcta)
            "Mosquito",    // Opción 1
            "Pez",         // Opción 2
            "Medusa"       // Opción 3
        ],
        correctOption: 0,  // La opción correcta es la 0 (Perro)
        highlight: ".question-container",
    },
    {
        title: "Pregunta 2",
        description: "¿Cuál de los siguientes grupos de animales tiene una columna vertebral?",
        options: [
            "Artrópodos",  // Opción 0
            "Moluscos",    // Opción 1
            "Vertebrados",  // Opción 2 (Correcta)
            "Insectos"     // Opción 3
        ],
        correctOption: 2,  // La opción correcta es la 2 (Vertebrados)
        highlight: "#option1",
    },
    {
        title: "Pregunta 3",
        description: "¿Qué característica diferencia a los vertebrados de los invertebrados?",
        options: [
            "Tienen exoesqueleto",   // Opción 0
            "Tienen una columna vertebral", // Opción 1 (Correcta)
            "Son todos mamíferos",   // Opción 2
            "Carecen de ojos"        // Opción 3
        ],
        correctOption: 1,  // La opción correcta es la 1 (Tienen una columna vertebral)
        highlight: "#option2",
    },
    {
        title: "Pregunta 4",
        description: "¿Cuál de los siguientes es un ejemplo de un vertebrado acuático?",
        options: [
            "Águila",     // Opción 0
            "Delfín",     // Opción 1 (Correcta)
            "León",       // Opción 2
            "Gato"        // Opción 3
        ],
        correctOption: 1,  // La opción correcta es la 1 (Delfín)
        highlight: "#option3",
    },
    {
        title: "Pregunta 5",
        description: "¿En qué grupo de vertebrados se encuentran los animales que ponen huevos?",
        options: [
            "Mamíferos",  // Opción 0
            "Aves",       // Opción 1 (Correcta)
            "Reptiles",   // Opción 2
            "Peces"       // Opción 3
        ],
        correctOption: 1,  // La opción correcta es la 1 (Aves)
        highlight: "#option4",
    },
];

let currentStep = 0;

function showStep() {
    const step = steps[currentStep];
    document.getElementById("preguntas-title").textContent = step.title;

    if (step.description) {
        document.getElementById("preguntas-description").textContent = step.description;
    }

    // Mostrar las opciones
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ''; // Limpiar las opciones previas

    step.options.forEach((option, index) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.id = `option${index}`;
        optionElement.classList.add("option-button");

        // Agregar el evento de clic para verificar si la opción seleccionada es correcta
        optionElement.addEventListener("click", () => {
            if (index === step.correctOption) {  // Verificar si la opción seleccionada es correcta
                alert("¡Respuesta correcta!");
            } else {
                alert("Respuesta incorrecta. Intenta nuevamente.");
            }
        });

        optionsContainer.appendChild(optionElement);
    });

    document.querySelectorAll(".preguntas-highlight").forEach(el => {
        el.classList.remove("preguntas-highlight");
    });

    if (step.highlight) {
        document.querySelector(step.highlight).classList.add("preguntas-highlight");
    }

    if (step.action) {
        step.action();
    }
}

document.getElementById("next-step").addEventListener("click", () => {
    currentStep++;
    if (currentStep < steps.length) {
        showStep();
    } else {
        alert("¡Juego terminado!");
        window.location.href = 'estadisticasNF.html';
    }
});

document.getElementById("skip-preguntas").addEventListener("click", () => {
    alert("Juego saltado. Ahora ve las estadísticas.");
    window.location.href = 'estadisticasNF.html';
});

showStep();
