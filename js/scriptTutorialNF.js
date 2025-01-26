const steps = [
    {
        title: "Paso 1: Observa la pregunta",
        description: "Esta es la pregunta principal. Vamos a responderla paso a paso.",
        highlight: ".question-container",
    },
    {
        title: "Paso 2: Selecciona la opción correcta",
        description: "La respuesta correcta es 'Vertebrados'. Mira cómo se mueve automáticamente.",
        highlight: "#option1",
        action: () => {
            const option = document.getElementById("option1");
            const dropzone = document.getElementById("dropzone");
            setTimeout(() => {
                option.classList.add("tutorial-highlight");
                setTimeout(() => {
                    option.style.transform = "translateY(100px)";
                    setTimeout(() => {
                        option.style.opacity = "0";
                        dropzone.textContent = "Vertebrados";
                        dropzone.style.backgroundColor = "#b5e7a0";
                    }, 1000);
                }, 1000);
            }, 500);
        },
    },
    {
        title: "Paso 3: Intenta arrastrar tú mismo",
        description: "Ahora intenta mover manualmente una opción incorrecta para ver qué sucede.",
        highlight: "#option2",
    },
    {
        title: "¡Tutorial Completo!",
        description: "Ya sabes cómo jugar. Haz clic en 'Siguiente' para comenzar el juego real.",
        highlight: null,
    },
];

let currentStep = 0;

function showStep() {
    const step = steps[currentStep];
    document.getElementById("tutorial-title").textContent = step.title;

    if (step.description) {
        document.getElementById("tutorial-title").nextElementSibling.textContent = step.description;
    }

    document.querySelectorAll(".tutorial-highlight").forEach(el => {
        el.classList.remove("tutorial-highlight");
    });

    if (step.highlight) {
        document.querySelector(step.highlight).classList.add("tutorial-highlight");
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
        alert("¡Tutorial terminado! Ahora comienza el juego.");
        window.location.href = 'nivelFacil.html'; // También redirige si se salta el tutorial
    }
});

document.getElementById("skip-tutorial").addEventListener("click", () => {
    alert("Tutorial saltado. Ahora comienza el juego.");
    window.location.href = 'nivelFacil.html'; // También redirige si se salta el tutorial
});

showStep();
