function ocultarTodo() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("conceptosBasicos").style.display = "none";
    document.getElementById("test").style.display = "none";

    
    document.getElementById("aplicacionPractica").style.display = "none";

    document.getElementById("acercaProyecto").style.display = "none";
}

function mostrarInicio() {
    ocultarTodo();
    document.getElementById("inicio").style.display = "block";
}

function mostrarConceptos() {
    ocultarTodo();
    document.getElementById("conceptosBasicos").style.display = "block";
}

function mostrarTest() {
    ocultarTodo();
    document.getElementById("test").style.display = "block";
}

function mostrarAplicacion() {
    ocultarTodo();
    document.getElementById("aplicacionPractica").style.display = "block";

    document.getElementById("appValorPresente").style.display = "none";
    document.getElementById("appInteresSimple").style.display = "none";
    document.getElementById("appInteresCompuesto").style.display = "none";
}

function mostrarAcerca() {
    ocultarTodo();
    document.getElementById("acercaProyecto").style.display = "block";
}

function ocultarAplicaciones() {
    document.getElementById("appValorPresente").style.display = "none";
    document.getElementById("appInteresSimple").style.display = "none";
    document.getElementById("appInteresCompuesto").style.display = "none";
}

function mostrarValorPresente() {
    ocultarAplicaciones();
    document.getElementById("appValorPresente").style.display = "block";
}

function mostrarInteresSimple() {
    ocultarAplicaciones();
    document.getElementById("appInteresSimple").style.display = "block";
}

function mostrarInteresCompuesto() {
    ocultarAplicaciones();
    document.getElementById("appInteresCompuesto").style.display = "block";
}

function calificarTest() {
    let puntaje = 0;

    let respuesta1 = document.getElementById("p1a");
    let respuesta2 = document.getElementById("p2a");
    let respuesta3 = document.getElementById("p3a");
    let respuesta4 = document.getElementById("p4a");
    let respuesta5 = document.getElementById("p5a");

    if (respuesta1.checked == true) {
        puntaje = puntaje + 1;
    }

    if (respuesta2.checked == true) {
        puntaje = puntaje + 1;
    }

    if (respuesta3.checked == true) {
        puntaje = puntaje + 1;
    }

    if (respuesta4.checked == true) {
        puntaje = puntaje + 1;
    }

    if (respuesta5.checked == true) {
        puntaje = puntaje + 1;
    }

    let resultado = document.getElementById("resultadoTest");

    if (puntaje == 5) {
        resultado.innerHTML = "Tu puntaje es: " + puntaje + " de 5. Excelente.";
    } else {
        if (puntaje >= 3) {
            resultado.innerHTML = "Tu puntaje es: " + puntaje + " de 5. Buen resultado.";
        } else {
            resultado.innerHTML = "Tu puntaje es: " + puntaje + " de 5. Debes repasar los conceptos.";
        }
    }
}