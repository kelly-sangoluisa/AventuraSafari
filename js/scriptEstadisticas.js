// scriptEstadisticas.js

// Función para mostrar las estadísticas en el modal
// Función para mostrar las estadísticas en el modal
function showStats() {
    // Obtener las estadísticas del localStorage
    const correctAnswers = localStorage.getItem("correctAnswers") || 0;
    const incorrectAnswers = localStorage.getItem("incorrectAnswers") || 0;

    // Mostrar las estadísticas en el modal
    document.getElementById("correct-answers").textContent = correctAnswers;
    document.getElementById("incorrect-answers").textContent = incorrectAnswers;

    // Mostrar el modal
    const statsModal = new bootstrap.Modal(document.getElementById('estadisticasModal'));
    statsModal.show();
}
