document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes Materialize
    M.Sidenav.init(document.querySelectorAll('.sidenav'));

    // 1. Recuperar los datos desde sessionStorage
    const dataString = sessionStorage.getItem('champasport_resultado');

    if (!dataString) {
        M.toast({
            html: '<i class="material-icons left">info</i>No se encontraron resultados recientes.',
            classes: 'rounded red accent-4'
        });
        setTimeout(() => window.location.href = 'selector.html', 1500);
        return;
    }

    const res = JSON.parse(dataString);

    // 2. Elementos del DOM a actualizar
    const puntajeTexto = document.getElementById('puntaje-texto');
    const barraProgreso = document.getElementById('puntaje-barra');
    const tarjetaMensaje = document.getElementById('tarjeta-mensaje');
    const tituloMensaje = document.getElementById('titulo-mensaje');
    const parrafoMensaje = document.getElementById('parrafo-mensaje');
    const iconoMensaje = document.getElementById('icono-mensaje');
    const correctasTexto = document.getElementById('res-correctas');
    const incorrectasTexto = document.getElementById('res-incorrectas');
    const totalPuntajeTabla = document.getElementById('res-total-tabla');
    const btnReintentar = document.getElementById('btn-reintentar');

    // 3. Inyectar datos numéricos
    if (puntajeTexto) puntajeTexto.textContent = `${res.correctas} / ${res.totalPreguntas}`;
    if (barraProgreso) barraProgreso.style.width = `${res.porcentaje}%`;
    if (correctasTexto) correctasTexto.textContent = res.correctas;
    if (incorrectasTexto) incorrectasTexto.textContent = res.incorrectas;
    if (totalPuntajeTabla) totalPuntajeTabla.textContent = `${res.correctas} / ${res.totalPreguntas} (${res.porcentaje}%)`;

    // 4. Mensaje según rendimiento con colores Materialize
    if (res.porcentaje >= 80) {
        if (tarjetaMensaje) tarjetaMensaje.className = 'card green darken-2 z-depth-2';
        if (iconoMensaje) iconoMensaje.textContent = 'emoji_events';
        if (tituloMensaje) tituloMensaje.textContent = '¡Excelente rendimiento!';
        if (parrafoMensaje) parrafoMensaje.textContent = 'Has demostrado un dominio sobresaliente del reglamento deportivo.';
    } else if (res.porcentaje >= 50) {
        if (tarjetaMensaje) tarjetaMensaje.className = 'card blue darken-2 z-depth-2';
        if (iconoMensaje) iconoMensaje.textContent = 'thumb_up';
        if (tituloMensaje) tituloMensaje.textContent = '¡Buen trabajo!';
        if (parrafoMensaje) parrafoMensaje.textContent = 'Aprobaste el cuestionario, pero aún puedes perfeccionar algunos detalles.';
    } else {
        if (tarjetaMensaje) tarjetaMensaje.className = 'card red accent-4 z-depth-2';
        if (iconoMensaje) iconoMensaje.textContent = 'school';
        if (tituloMensaje) tituloMensaje.textContent = '¡Sigue practicando!';
        if (parrafoMensaje) parrafoMensaje.textContent = 'Repasa las reglas oficiales del deporte e inténtalo de nuevo.';
    }

    // 5. Configurar botón Reintentar
    if (btnReintentar) {
        btnReintentar.href = `preguntas.html?deporte=${res.deporte}`;
    }

    // 6. Generar Sección de Revisión de Preguntas (Collapsible de Materialize)
    const contenedorRevision = document.getElementById('contenedor-revision');
    if (contenedorRevision && res.preguntas) {
        let htmlCollapsible = `
            <div class="card z-depth-2" style="border-radius: 20px; overflow: hidden; margin-top: 25px;">
                <div class="card-content">
                    <span class="card-title red-text text-accent-4 bold" style="font-weight: 700;">
                        <i class="material-icons left">checklist</i>Revisión Detallada de Preguntas
                    </span>
                    <ul class="collapsible popout" style="margin-top: 15px;">
        `;

        res.preguntas.forEach((p, idx) => {
            const respDada = res.respuestasUsuario[idx];
            const esCorrecta = respDada === p.respuesta_correcta;
            const icono = esCorrecta ? 'check_circle' : 'cancel';
            const colorIcono = esCorrecta ? 'green-text' : 'red-text';

            htmlCollapsible += `
                <li>
                    <div class="collapsible-header" style="display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-weight: 600;">
                            <i class="material-icons ${colorIcono}">${icono}</i>
                            Pregunta ${idx + 1}: ${p.pregunta.substring(0, 60)}...
                        </span>
                        <span class="badge ${esCorrecta ? 'green' : 'red'} white-text" style="border-radius: 4px;">
                            ${esCorrecta ? '+1 Pts' : '0 Pts'}
                        </span>
                    </div>
                    <div class="collapsible-body grey lighten-4">
                        <p><strong>Pregunta:</strong> ${p.pregunta}</p>
                        <p><strong>Tu respuesta:</strong> <span class="${esCorrecta ? 'green-text bold' : 'red-text bold'}">(${respDada ? respDada.toUpperCase() : 'Ninguna'}) ${respDada ? p.opciones[respDada] : 'Sin responder'}</span></p>
                        ${!esCorrecta ? `<p><strong>Respuesta correcta:</strong> <span class="green-text text-darken-2 bold">(${p.respuesta_correcta.toUpperCase()}) ${p.opciones[p.respuesta_correcta]}</span></p>` : ''}
                        <div class="card-panel white" style="border-left: 4px solid #d50000; padding: 10px 15px; margin-top: 10px;">
                            <span class="grey-text text-darken-3"><strong>Fundamentación reglamentaria:</strong> ${p.explicacion}</span>
                        </div>
                    </div>
                </li>
            `;
        });

        htmlCollapsible += `
                    </ul>
                </div>
            </div>
        `;
        contenedorRevision.innerHTML = htmlCollapsible;

        // Inicializar el Collapsible de Materialize
        M.Collapsible.init(document.querySelectorAll('.collapsible'));
    }
});