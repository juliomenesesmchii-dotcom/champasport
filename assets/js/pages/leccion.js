
document.addEventListener("DOMContentLoaded", function () {

    // Inicializar menú lateral de Materialize
    M.Sidenav.init(document.querySelectorAll(".sidenav"));

    // Obtener el deporte seleccionado desde la URL
    const parametros = new URLSearchParams(window.location.search);
    const deporte = parametros.get("deporte") || "basquet";

    // Información dinámica de los deportes
    const lecciones = {

        basquet: {
            nombre: "BÁSQUETBOL",
            imagenFondo: "assets/img.leccion/basquet/fondo.jpg",
            icono: "sports_basketball",
            definicionTitulo: "¿Qué es el básquetbol?",
            definicion: "El básquetbol es un deporte de equipo que se juega entre dos conjuntos de cinco jugadores. El objetivo principal es conseguir puntos introduciendo el balón en el aro del equipo contrario.",

            elementos: [
                {
                    titulo: "El balón",
                    icono: "sports_basketball",
                    imagen: "assets/img.leccion/basquet/balon.png",
                    descripcion: "Es el elemento principal del juego. Se utiliza para realizar pases, lanzamientos y dribles.",
                    etiqueta: "Características",
                    detalles: [
                        "Circunferencia: 75 – 77 cm.",
                        "Peso: 580 – 620 g.",
                        "Tamaño habitual: N.º 7."
                    ]
                },
                {
                    titulo: "La cancha",
                    icono: "sports",
                    imagen: "assets/img.leccion/basquet/cancha.png",
                    descripcion: "Es el espacio rectangular donde se enfrentan los dos equipos.",
                    etiqueta: "Medidas oficiales",
                    detalles: [
                        "Largo: 28 m.",
                        "Ancho: 15 m."
                    ]
                }
            ],

            reglas: [
                "Cada equipo tiene cinco jugadores en la cancha.",
                "Se puede botar, pasar o lanzar el balón.",
                "No se puede caminar con el balón en las manos sin botarlo.",
                "El partido se divide en cuatro períodos."
            ],

            dato: "El básquetbol fue creado en 1891 por James Naismith, un profesor de educación física.",

            datosClave: [
                "5 jugadores por equipo.",
                "4 períodos de juego.",
                "El objetivo es encestar en el aro contrario.",
                "Las canastas pueden valer 1, 2 o 3 puntos."
            ]
        },

        futsal: {
            nombre: "FUTSAL",
            imagenFondo: "assets/img.leccion/futsal/fondo.jpg",
            icono: "sports_soccer",
            definicionTitulo: "¿Qué es el futsal?",
            definicion: "El futsal es un deporte colectivo que se juega entre dos equipos de cinco jugadores, incluido el arquero. Su objetivo es marcar goles introduciendo el balón en la portería del equipo contrario.",

            elementos: [
                {
                    titulo: "El balón",
                    icono: "sports_soccer",
                    imagen: "assets/img.leccion/futsal/balonfutsal.webp",
                    descripcion: "Es el elemento utilizado para realizar pases, controles y remates durante el partido.",
                    etiqueta: "Características",
                    detalles: [
                        "Circunferencia: 62 – 64 cm.",
                        "Peso: 400 – 440 g.",
                        "Rebote reducido."
                    ]
                },
                {
                    titulo: "La cancha",
                    icono: "stadium",
                    imagen: "assets/img.leccion/futsal/canchafutsal.webp",
                    descripcion: "Es el espacio rectangular donde los equipos desarrollan el partido.",
                    etiqueta: "Características",
                    detalles: [
                        "Superficie lisa.",
                        "Cuenta con dos porterías.",
                        "Tiene líneas que delimitan el terreno."
                    ]
                }
            ],

            reglas: [
                "Cada equipo juega con cinco jugadores, incluido el arquero.",
                "Los jugadores utilizan principalmente los pies para controlar el balón.",
                "Los saques laterales se realizan con el pie.",
                "Gana el equipo que consigue más goles."
            ],

            dato: "El futsal se caracteriza por su ritmo rápido, el control del balón y el trabajo en equipo.",

            datosClave: [
                "5 jugadores por equipo.",
                "2 tiempos de 20 minutos de juego efectivo.",
                "Se juega en una cancha de dimensiones reducidas.",
                "El objetivo es marcar goles."
            ]
        },

        atletismo: {
            nombre: "ATLETISMO",
            imagenFondo: "assets/img.leccion/atletismo/fondo.jpeg",
            icono: "directions_run",
            definicionTitulo: "¿Qué es el atletismo?",
            definicion: "El atletismo es una disciplina deportiva que reúne diferentes pruebas de carrera, salto y lanzamiento. Permite desarrollar capacidades físicas como la velocidad, la resistencia, la fuerza y la coordinación.",

            elementos: [
                {
                    titulo: "La pista",
                    icono: "track_changes",
                    imagen: "assets/img.leccion/atletismo/pista.jpg",
                    descripcion: "Es el espacio donde se realizan diferentes pruebas de carrera y velocidad.",
                    etiqueta: "Características",
                    detalles: [
                        "Generalmente tiene forma ovalada.",
                        "Cuenta con carriles delimitados.",
                        "La pista estándar al aire libre mide 400 m."
                    ]
                },
                {
                    titulo: "El calzado",
                    icono: "directions_run",
                    imagen: "assets/img.leccion/atletismo/spikes.jfif",
                    descripcion: "El calzado deportivo ayuda al atleta a desplazarse y realizar sus pruebas.",
                    etiqueta: "Características",
                    detalles: [
                        "Debe adaptarse a la prueba.",
                        "Facilita el desplazamiento.",
                        "Puede incluir clavos para determinadas pruebas."
                    ]
                }
            ],

            reglas: [
                "Los participantes deben respetar las indicaciones de cada prueba.",
                "En las carreras, se debe respetar el recorrido establecido.",
                "En las pruebas de salto se debe cumplir la zona de impulso.",
                "En los lanzamientos se deben respetar las áreas delimitadas."
            ],

            dato: "El atletismo reúne pruebas muy variadas, desde carreras de velocidad hasta lanzamientos y saltos.",

            datosClave: [
                "Incluye carreras, saltos y lanzamientos.",
                "Desarrolla velocidad y resistencia.",
                "También requiere fuerza y coordinación.",
                "Cada prueba tiene sus propias reglas."
            ]
        },

        voley: {
            nombre: "VÓLEY",
            imagenFondo: "assets/img.leccion/voley/fondo.webp",
            icono: "sports_volleyball",
            definicionTitulo: "¿Qué es el voleibol?",
            definicion: "El voleibol es un deporte de equipo en el que dos conjuntos separados por una red intentan enviar el balón al campo contrario para conseguir puntos.",

            elementos: [
                {
                    titulo: "El balón",
                    icono: "sports_volleyball",
                    imagen: "assets/img.leccion/voley/balon.jpg",
                    descripcion: "Es el elemento principal del juego. Los jugadores lo golpean para enviarlo al campo contrario.",
                    etiqueta: "Características",
                    detalles: [
                        "Circunferencia: 65 – 67 cm.",
                        "Peso: 260 – 280 g.",
                        "Debe ser esférico y flexible."
                    ]
                },
                {
                    titulo: "La cancha",
                    icono: "sports",
                    imagen: "assets/img.leccion/voley/cancha.jpg",
                    descripcion: "Es el terreno rectangular dividido en dos campos por una red central.",
                    etiqueta: "Medidas oficiales",
                    detalles: [
                        "Largo: 18 m.",
                        "Ancho: 9 m.",
                        "La red divide ambos campos."
                    ]
                }
            ],

            reglas: [
                "Cada equipo tiene seis jugadores en cancha.",
                "Un equipo puede realizar hasta tres toques para devolver el balón.",
                "Un jugador no puede tocar el balón dos veces consecutivas, salvo excepciones reglamentarias.",
                "Los jugadores realizan una rotación cuando recuperan el saque."
            ],

            dato: "En el voleibol, los partidos se juegan normalmente al mejor de cinco sets. Los primeros cuatro sets se disputan a 25 puntos y el quinto a 15, con diferencia mínima de dos puntos.",

            datosClave: [
                "6 jugadores por equipo en cancha.",
                "Hasta 3 toques por equipo.",
                "Se juega dividido en sets.",
                "El objetivo es que el balón toque el suelo contrario."
            ]
        },

        ajedrez: {
            nombre: "AJEDREZ",
            imagenFondo: "assets/img.leccion/ajedrez/fondo.jpg",
            icono: "extension",
            definicionTitulo: "¿Qué es el ajedrez?",
            definicion: "El ajedrez es un juego de estrategia que enfrenta a dos jugadores en un tablero de 64 casillas. Cada participante utiliza 16 piezas con movimientos diferentes y busca dar jaque mate al rey contrario.",

            elementos: [
                {
                    titulo: "El tablero",
                    icono: "grid_on",
                    imagen: "assets/img.leccion/ajedrez/tablero.png",
                    descripcion: "Es la superficie cuadriculada donde se desarrolla la partida.",
                    etiqueta: "Características",
                    detalles: [
                        "Tiene 64 casillas.",
                        "Está organizado en 8 filas y 8 columnas.",
                        "Alterna casillas claras y oscuras."
                    ]
                },
                {
                    titulo: "Las piezas",
                    icono: "extension",
                    imagen: "assets/img.leccion/ajedrez/piezas.jfif",
                    descripcion: "Son las figuras que cada jugador utiliza para realizar sus movimientos y estrategias.",
                    etiqueta: "Por jugador",
                    detalles: [
                        "16 piezas en total.",
                        "1 rey y 1 dama.",
                        "2 torres, 2 alfiles y 2 caballos.",
                        "8 peones."
                    ]
                }
            ],

            reglas: [
                "Cada jugador comienza con 16 piezas.",
                "Las piezas tienen movimientos diferentes.",
                "Las blancas realizan el primer movimiento.",
                "Los jugadores mueven una pieza por turno.",
                "La partida puede terminar con jaque mate o tablas."
            ],

            dato: "El objetivo principal del ajedrez es dar jaque mate al rey contrario, es decir, dejarlo bajo amenaza sin posibilidad de escapar.",

            datosClave: [
                "2 jugadores.",
                "Tablero de 64 casillas.",
                "16 piezas por jugador.",
                "El objetivo es conseguir el jaque mate."
            ]
        }

    };

    // Buscar información del deporte seleccionado
    const contenido = lecciones[deporte];
    // Cambiar imagen de fondo según el deporte
    document.getElementById("portada-deporte").style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url('${contenido.imagenFondo}')`;

    // Si el deporte no existe, regresar al selector
    if (!contenido) {
        window.location.href = "selector.html";
        return;
    }

    // Mostrar portada
    document.getElementById("titulo-portada").textContent = contenido.nombre;
    document.getElementById("icono-portada").textContent = contenido.icono;

    // Mostrar definición
    document.getElementById("titulo-definicion").textContent =
        contenido.definicionTitulo;

    document.getElementById("texto-definicion").textContent =
        contenido.definicion;

    // Mostrar elementos principales
    contenido.elementos.forEach(function (elemento, indice) {

        const numero = indice + 1;

        // Mostrar título
        document.getElementById(`titulo-elemento-${numero}`).textContent =
            elemento.titulo;

        // Mostrar imagen
        const imagen = document.getElementById(`imagen-elemento-${numero}`);
        imagen.src = elemento.imagen;
        imagen.alt = elemento.titulo;

        // Mostrar descripción
        document.getElementById(`descripcion-elemento-${numero}`).textContent =
            elemento.descripcion;

        document.getElementById(`descripcion-elemento-${numero}`).textContent =
            elemento.descripcion;

        document.getElementById(`etiqueta-elemento-${numero}`).textContent =
            elemento.etiqueta;

        const lista = document.getElementById(`lista-elemento-${numero}`);
        lista.innerHTML = "";

        elemento.detalles.forEach(function (detalle) {

            const li = document.createElement("li");

            const icono = document.createElement("i");
            icono.className = "material-icons";
            icono.textContent = "fiber_manual_record";

            const texto = document.createElement("span");
            texto.textContent = detalle;

            li.appendChild(icono);
            li.appendChild(texto);

            lista.appendChild(li);
        });
    });

    // Mostrar reglas fundamentales
    const listaReglas = document.getElementById("lista-reglas");
    listaReglas.innerHTML = "";

    contenido.reglas.forEach(function (regla) {

        const elemento = document.createElement("div");
        elemento.className = "regla-item";

        const icono = document.createElement("i");
        icono.className = "material-icons";
        icono.textContent = "check_circle";

        const texto = document.createElement("span");
        texto.textContent = regla;

        elemento.appendChild(icono);
        elemento.appendChild(texto);

        listaReglas.appendChild(elemento);
    });

    // Mostrar dato curioso
    document.getElementById("dato-importante").textContent =
        contenido.dato;

    // Mostrar datos clave
    const datosClave = document.getElementById("datos-clave");
    datosClave.innerHTML = "";

    contenido.datosClave.forEach(function (dato) {

        const columna = document.createElement("div");
        columna.className = "col s12 m6";

        const elemento = document.createElement("p");
        elemento.style.display = "flex";
        elemento.style.alignItems = "center";
        elemento.style.gap = "10px";
        elemento.style.margin = "8px 0";

        const icono = document.createElement("i");
        icono.className = "material-icons red-text text-accent-4";
        icono.textContent = "check_circle";

        const texto = document.createElement("span");
        texto.textContent = dato;

        elemento.appendChild(icono);
        elemento.appendChild(texto);

        columna.appendChild(elemento);
        datosClave.appendChild(columna);
    });

    // Enviar el deporte seleccionado al cuestionario
    document.getElementById("btn-comenzar").href =
        `preguntas.html?deporte=${encodeURIComponent(deporte)}`;

});
