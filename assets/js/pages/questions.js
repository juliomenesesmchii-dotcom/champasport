document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar sidenav
    M.Sidenav.init(document.querySelectorAll('.sidenav'));

    // 1. Obtener el deporte desde la URL (?deporte=basquet)
    const urlParams = new URLSearchParams(window.location.search);
    const deporte = urlParams.get('deporte') || 'basquet';

    // Metadatos por deporte (imágenes y títulos)
    const infoDeportes = {
        'basquet': { nombre: 'BÁSQUETBOL', img: 'assets/img/basquet.webp' },
        'futsal': { nombre: 'FUTSAL', img: 'assets/img/futbol.webp' },
        'atletismo': { nombre: 'ATLETISMO', img: 'assets/img/atletismo.jpeg' },
        'voley': { nombre: 'VÓLEY', img: 'assets/img/voley.webp' },
        'ajedrez': { nombre: 'AJEDREZ', img: 'assets/img/ajedrez.webp' }
    };

    const configActual = infoDeportes[deporte] || { nombre: deporte.toUpperCase(), img: 'assets/img/principal.webp' };

    // Elementos del DOM
    const tituloPregunta = document.getElementById('texto-pregunta');
    const imagenPregunta = document.getElementById('imagen-pregunta');
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    const textoProgreso = document.getElementById('texto-progreso');
    const barraProgreso = document.getElementById('barra-progreso');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');

    if (imagenPregunta) imagenPregunta.src = configActual.img;

    let preguntas = [];
    let indiceActual = 0;
    const respuestasUsuario = {}; // { 0: 'a', 1: 'c', ... }
    const TOTAL_EVALUAR = 10; // 10 preguntas por examen

    // 2. Cargar archivo JSON
    try {
        const respuesta = await fetch(`assets/json/${deporte}.json`);
        if (!respuesta.ok) throw new Error(`No se pudo cargar el archivo ${deporte}.json`);
        const todasLasPreguntas = await respuesta.json();

        // Barajar aleatoriamente y seleccionar 10 preguntas
        preguntas = todasLasPreguntas.sort(() => 0.5 - Math.random()).slice(0, TOTAL_EVALUAR);
    } catch (error) {
        console.error(error);
        M.toast({
            html: '<i class="material-icons left">error</i>Error al cargar las preguntas del deporte.',
            classes: 'rounded red accent-4'
        });
        setTimeout(() => window.location.href = 'selector.html', 2000);
        return;
    }

    // 3. Función para renderizar la pregunta actual
    function mostrarPregunta(index) {
        const p = preguntas[index];
        if (!p) return;

        // Actualizar texto de la pregunta
        if (tituloPregunta) {
            tituloPregunta.textContent = `${index + 1}. ${p.pregunta}`;
        }

        // Actualizar barra de progreso
        const porcentaje = Math.round(((index + 1) / TOTAL_EVALUAR) * 100);
        if (barraProgreso) barraProgreso.style.width = `${porcentaje}%`;
        if (textoProgreso) {
            textoProgreso.innerHTML = `
                <i class="material-icons left red-text text-accent-4" style="font-size: 1.2rem; margin-right: 6px;">trending_up</i>
                Progreso de examen (${porcentaje}%) - Pregunta ${index + 1} de ${TOTAL_EVALUAR}
            `;
        }

        // Renderizar opciones A, B, C, D
        const letras = ['a', 'b', 'c', 'd'];
        const seleccionPrevia = respuestasUsuario[index];

        let htmlOpciones = '<div class="row" style="margin-bottom: 0;">';
        letras.forEach((letra, idx) => {
            const textoOpcion = p.opciones[letra];
            const estaSeleccionada = seleccionPrevia === letra;

            // Clases de Materialize para respuesta activa
            const colorTarjeta = estaSeleccionada ? 'teal darken-1 z-depth-3' : 'blue darken-2 z-depth-2';
            const colorBotonLetra = estaSeleccionada ? 'amber darken-2' : 'grey darken-4';

            // Cerrar fila cada 2 opciones para mantener la grilla s12 m6
            if (idx === 2) {
                htmlOpciones += '</div><div class="row">';
            }

            htmlOpciones += `
                <div class="col s12 m6 tarjeta-opcion" data-opcion="${letra}" style="margin-bottom: 15px; cursor: pointer;">
                    <div style="display: flex; align-items: center;">
                        <a class="btn-floating btn-large waves-effect waves-light ${colorBotonLetra} center-align bold"
                            style="pointer-events: none; font-weight: 800; flex-shrink: 0; margin-right: 15px;">
                            ${letra.toUpperCase()}
                        </a>
                        <div class="card ${colorTarjeta} hoverable"
                            style="border-radius: 15px; overflow: hidden; width: 100%; margin: 0; transition: transform 0.2s ease;">
                            <div class="card-content white-text" style="padding: 16px 20px;">
                                <span class="card-title bold" style="font-size: 1.15rem; font-weight: 600; margin: 0;">
                                    ${textoOpcion}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        htmlOpciones += '</div>';

        contenedorOpciones.innerHTML = htmlOpciones;

        // Agregar listeners a las opciones
        document.querySelectorAll('.tarjeta-opcion').forEach((opcionCard) => {
            opcionCard.addEventListener('click', () => {
                const opcionElegida = opcionCard.getAttribute('data-opcion');
                respuestasUsuario[index] = opcionElegida;
                mostrarPregunta(index); // Re-renderizar para marcar visualmente
            });
        });

        // Configuración de botones Anterior / Siguiente
        if (btnAnterior) {
            btnAnterior.style.visibility = index === 0 ? 'hidden' : 'visible';
        }

        if (btnSiguiente) {
            if (index === TOTAL_EVALUAR - 1) {
                btnSiguiente.innerHTML = 'Finalizar <i class="material-icons right">done_all</i>';
                btnSiguiente.className = 'waves-effect waves-light btn-large green darken-1 hoverable';
            } else {
                btnSiguiente.innerHTML = 'Siguiente <i class="material-icons right">arrow_forward</i>';
                btnSiguiente.className = 'waves-effect waves-light btn-large red accent-4 hoverable';
            }
        }
    }

    // 4. Eventos de botones
    if (btnAnterior) {
        btnAnterior.addEventListener('click', (e) => {
            e.preventDefault();
            if (indiceActual > 0) {
                indiceActual--;
                mostrarPregunta(indiceActual);
            }
        });
    }

    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', (e) => {
            e.preventDefault();

            // Validar que se haya seleccionado una opción
            if (!respuestasUsuario[indiceActual]) {
                M.toast({
                    html: '<i class="material-icons left">warning</i>Selecciona una respuesta para continuar',
                    classes: 'rounded amber darken-3'
                });
                return;
            }

            if (indiceActual < TOTAL_EVALUAR - 1) {
                indiceActual++;
                mostrarPregunta(indiceActual);
            } else {
                finalizarEvaluacion();
            }
        });
    }

    // 5. Cálculo y redirección a resultados
    function finalizarEvaluacion() {
        let correctas = 0;
        preguntas.forEach((p, idx) => {
            if (respuestasUsuario[idx] === p.respuesta_correcta) {
                correctas++;
            }
        });

        const resultadoData = {
            deporte: deporte,
            nombreDeporte: configActual.nombre,
            totalPreguntas: TOTAL_EVALUAR,
            correctas: correctas,
            incorrectas: TOTAL_EVALUAR - correctas,
            porcentaje: Math.round((correctas / TOTAL_EVALUAR) * 100),
            preguntas: preguntas,
            respuestasUsuario: respuestasUsuario
        };

        // Guardar en sessionStorage para que resultados.html lo consuma
        sessionStorage.setItem('champasport_resultado', JSON.stringify(resultadoData));
        window.location.href = 'resultados.html';
    }

    // Inicializar primera pregunta
    mostrarPregunta(0);
});