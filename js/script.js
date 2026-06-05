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