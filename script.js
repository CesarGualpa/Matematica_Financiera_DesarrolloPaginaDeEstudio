function ocultarSecciones() {
    document.getElementById("inicio").classList.remove("activa");
    document.getElementById("conceptosBasicos").classList.remove("activa");
    document.getElementById("test").classList.remove("activa");
    document.getElementById("acercaProyecto").classList.remove("activa");
}

function mostrarSeccion(id) {
    ocultarSecciones();

    document.getElementById(id).classList.add("activa");
}

function calificarTest() {
    let puntaje = 0;

    let p1 = document.querySelector('input[name="p1"]:checked');
    let p2 = document.querySelector('input[name="p2"]:checked');
    let p3 = document.querySelector('input[name="p3"]:checked');
    let p4 = document.querySelector('input[name="p4"]:checked');
    let p5 = document.querySelector('input[name="p5"]:checked');

    if (p1 != null && p1.value == "a") {
        puntaje++;
    }

    if (p2 != null && p2.value == "a") {
        puntaje++;
    }

    if (p3 != null && p3.value == "a") {
        puntaje++;
    }

    if (p4 != null && p4.value == "a") {
        puntaje++;
    }

    if (p5 != null && p5.value == "a") {
        puntaje++;
    }

    mostrarResultado(puntaje);
}

function mostrarResultado(puntaje) {
    let resultado = document.getElementById("resultadoTest");
    resultado.style.visibility = "visible";

    if (puntaje == 5) {
        resultado.innerHTML = "Tu puntaje es: " + puntaje + " de 5. Excelente.";
    } else if (puntaje >= 3) {
        resultado.innerHTML = "Tu puntaje es: " + puntaje + " de 5. Buen resultado.";
    } else {
        resultado.innerHTML = "Tu puntaje es: " + puntaje + " de 5. Debes repasar los conceptos.";
    }
}