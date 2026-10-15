
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes Materialize
    M.Sidenav.init(document.querySelectorAll('.sidenav'));

    // Mapeo de botones a sus archivos JSON
    const deportesDisponibles = {
        'basquet': { nombre: 'Básquet', json: 'basquet.json', activo: true },
        'futsal': { nombre: 'Futsal', json: 'futsal.json', activo: true },
        'tenis': { nombre: 'Tenis', json: 'tenis.json', activo: true },
        'voley': { nombre: 'Vóley', json: 'voley.json', activo: true },
        'ajedrez': { nombre: 'Ajedrez', json: 'ajedrez.json', activo: true },
        'local': { nombre: 'Deporte Local', json: null, activo: false }
    };

    const botones = document.querySelectorAll('.btn-seleccionar');

    botones.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.card');
            const titulo = card.querySelector('.titulo-deporte').textContent.trim().toLowerCase();

            let claveDeporte = null;
            if (titulo.includes('básquet') || titulo.includes('basquet')) claveDeporte = 'basquet';
            else if (titulo.includes('futsal') || titulo.includes('futbol') || titulo.includes('fútbol')) claveDeporte = 'futsal';
            else if (titulo.includes('tenis')) claveDeporte = 'tenis';
            else if (titulo.includes('voley') || titulo.includes('vóley')) claveDeporte = 'voley';
            else if (titulo.includes('ajedrez')) claveDeporte = 'ajedrez';
            else if (titulo.includes('local')) claveDeporte = 'local';

            if (!claveDeporte || !deportesDisponibles[claveDeporte].activo) {
                M.toast({
                    html: '<i class="material-icons left">info</i>Este cuestionario estará disponible próximamente',
                    classes: 'rounded amber darken-3'
                });
                return;
            }

            // Redirigir enviando el deporte como parámetro GET
            window.location.href = `preguntas.html?deporte=${claveDeporte}`;
        });
    });
});