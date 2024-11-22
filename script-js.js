document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const materia = this.querySelector('.card-title').textContent;
            console.log(`Seleccionaste la materia: ${materia}`);
            // Aquí podrías agregar lógica adicional para cada materia
        });
    });

    // Función para cambiar el tema
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }
});
