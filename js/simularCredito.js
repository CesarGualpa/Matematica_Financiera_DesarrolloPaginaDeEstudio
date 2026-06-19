function cargarClientesCredito(){
    let seleccionarCliente = document.getElementById("clienteCredito");

    seleccionarCliente.innerHTML = `<option value="">Seleccione un cliente</option>`;

    for (let i = 0; i < datosDeLosClientes.length; i++){
        seleccionarCliente.innerHTML += `
            <option value="${i}">${datosDeLosClientes[i].nombre}</option>
        `;
    }
}

function calcularCredito(){
    let posicionCliente = document.getElementById("clienteCredito").value;
    let monto = Number(document.getElementById("montoCredito").value);
    let plazo = Number(document.getElementById("plazoCredito").value);
    let tasa = Number(document.getElementById("tasaCredito").value);

    let tipoAmortizacion = document.querySelector(`input[name="tipoAmortizacion"]:checked`).value;

    if(posicionCliente == "" || monto <= 0 || plazo <= 0 || tasa <=0){
        alert("Debe llenar todos los datos correctamente");
        return;
    }

    let interesMensual = tasa / 100 / 12;

    if(tipoAmortizacion == "frances"){
        calcularSistemaFrances(posicionCliente, monto, plazo, tasa, interesMensual);
    }else{
        calcularSistemaAleman(posicionCliente, monto, plazo, tasa, interesMensual);
    }
}

function calcularSistemaFrances(posicionCliente, monto, plazo, tasa, interesMensual) {
    let cliente = datosDeLosClientes[posicionCliente];
    let resumen = document.getElementById("resumenCredito");
    let tabla = document.getElementById("tablaAmortizacion");

    let saldo = monto;

    let cuotaMensual = monto * (interesMensual * Math.pow(1 + interesMensual, plazo)) / (Math.pow(1 + interesMensual, plazo) - 1);

    resumen.innerHTML = `
        <h3>Resumen del credito</h3>
        <p><strong>Cliente:</strong> ${cliente.nombre}</p>
        <p><strong>Monto solicitado:</strong> $${monto.toFixed(2)}</p>
        <p><strong>Plazo:</strong> ${plazo} meses</p>
        <p><strong>Tasa anual:</strong> ${tasa}%</p>
        <p><strong>Tipo de amortizacion:</strong> Sistema Frances</p>
        <p><strong>Cuota mensual aproximada:</strong> $${cuotaMensual.toFixed(2)}</p>
    `;

    tabla.innerHTML = "";

    for (let i = 1; i <= plazo; i++) {
        let interes = saldo * interesMensual;
        let capital = cuotaMensual - interes;

        if (capital > saldo) {
            capital = saldo;
        }

        let totalCuota = capital + interes;

        saldo = saldo - capital;

        if (saldo < 0.01) {
            saldo = 0;
        }

        let fechaPago = obtenerFechaPago(i);

        tabla.innerHTML += `
            <tr id="filaCuota${i}" class="cuota-pendiente" data-fecha="${fechaPago}">
                <td>${i}</td>
                <td>${fechaPago}</td>
                <td>$${capital.toFixed(2)}</td>
                <td>$${interes.toFixed(2)}</td>
                <td>$${totalCuota.toFixed(2)}</td>
                <td>$${saldo.toFixed(2)}</td>
                <td>
                    <button id="botonPagar${i}" onclick="pagarCuota(${i})">
                        Pagar
                    </button>
                </td>
                <td id="estadoCuota${i}">Pendiente</td>
            </tr>
        `;
    }

    comprobarCuotasAtrasadas();
}

function calcularSistemaAleman(posicionCliente, monto, plazo, tasa, interesMensual) {
    let cliente = datosDeLosClientes[posicionCliente];
    let resumen = document.getElementById("resumenCredito");
    let tabla = document.getElementById("tablaAmortizacion");

    let saldo = monto;
    let capitalFijo = monto / plazo;

    resumen.innerHTML = `
        <h3>Resumen del crédito</h3>
        <p><strong>Cliente:</strong> ${cliente.nombre}</p>
        <p><strong>Monto solicitado:</strong> $${monto.toFixed(2)}</p>
        <p><strong>Plazo:</strong> ${plazo} meses</p>
        <p><strong>Tasa anual:</strong> ${tasa}%</p>
        <p><strong>Tipo de amortización:</strong> Sistema Alemán</p>
        <p><strong>Capital fijo mensual:</strong> $${capitalFijo.toFixed(2)}</p>
    `;

    tabla.innerHTML = "";

    for (let i = 1; i <= plazo; i++) {
        let interes = saldo * interesMensual;
        let totalCuota = capitalFijo + interes;

        saldo = saldo - capitalFijo;

        if (saldo < 0.01) {
            saldo = 0;
        }

        let fechaPago = obtenerFechaPago(i);

        tabla.innerHTML += `
            <tr id="filaCuota${i}" class="cuota-pendiente" data-fecha="${fechaPago}">
                <td>${i}</td>
                <td>${fechaPago}</td>
                <td>$${capitalFijo.toFixed(2)}</td>
                <td>$${interes.toFixed(2)}</td>
                <td>$${totalCuota.toFixed(2)}</td>
                <td>$${saldo.toFixed(2)}</td>
                <td>
                    <button id="botonPagar${i}" onclick="pagarCuota(${i})">
                        Pagar
                    </button>
                </td>
                <td id="estadoCuota${i}">Pendiente</td>
            </tr>
        `;
    }

    comprobarCuotasAtrasadas();
}

function pagarCuota(numeroCuota) {
    let fila = document.getElementById("filaCuota" + numeroCuota);
    let estado = document.getElementById("estadoCuota" + numeroCuota);
    let boton = document.getElementById("botonPagar" + numeroCuota);

    estado.innerHTML = "Pagado";

    fila.classList.remove("cuota-pendiente");
    fila.classList.remove("cuota-atrasada");
    fila.classList.add("cuota-pagada");

    boton.disabled = true;
    boton.innerHTML = "Pagada";
}

function comprobarCuotasAtrasadas() {
    let filas = document.querySelectorAll("#tablaAmortizacion tr");

    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    for (let i = 0; i < filas.length; i++) {
        let fila = filas[i];

        let numeroCuota = fila.children[0].innerHTML;
        let fechaTexto = fila.getAttribute("data-fecha");
        let fechaPago = convertirTextoAFecha(fechaTexto);

        let estado = document.getElementById("estadoCuota" + numeroCuota);

        if (estado.innerHTML == "Pagado") {
            continue;
        }

        if (fechaPago < hoy) {
            estado.innerHTML = "Atrasado";

            fila.classList.remove("cuota-pendiente");
            fila.classList.add("cuota-atrasada");
        } else {
            estado.innerHTML = "Pendiente";

            fila.classList.remove("cuota-atrasada");
            fila.classList.add("cuota-pendiente");
        }
    }
}

function obtenerFechaPago(numeroCuota) {
    let fecha = new Date();

    fecha.setMonth(fecha.getMonth() + numeroCuota);

    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();

    if (dia < 10) {
        dia = "0" + dia;
    }

    if (mes < 10) {
        mes = "0" + mes;
    }

    return dia + "/" + mes + "/" + anio;
}

function convertirTextoAFecha(fechaTexto) {
    let partes = fechaTexto.split("/");

    let dia = Number(partes[0]);
    let mes = Number(partes[1]) - 1;
    let anio = Number(partes[2]);

    let fecha = new Date(anio, mes, dia);

    fecha.setHours(0, 0, 0, 0);

    return fecha;
}

function obtenerFechaActual() {
    let fechaSeleccionada = document.getElementById("fechaPrueba").value;

    if (fechaSeleccionada) {
        let fecha = new Date(fechaSeleccionada);
        fecha.setHours(0, 0, 0, 0);
        return fecha;
    }

    let hoy = obtenerFechaActual();
    return hoy;
}

function comprobarCuotasAtrasadas() {
    let filas = document.querySelectorAll("#tablaAmortizacion tr");

    let hoy = obtenerFechaActual();

    for (let i = 0; i < filas.length; i++) {
        let fila = filas[i];

        let numeroCuota = fila.children[0].innerHTML;
        let fechaTexto = fila.getAttribute("data-fecha");
        let fechaPago = convertirTextoAFecha(fechaTexto);

        let estado = document.getElementById("estadoCuota" + numeroCuota);

        if (estado.innerHTML == "Pagado") {
            continue;
        }

        if (fechaPago < hoy) {
            estado.innerHTML = "Atrasado";

            fila.classList.remove("cuota-pendiente");
            fila.classList.add("cuota-atrasada");
        } else {
            estado.innerHTML = "Pendiente";

            fila.classList.remove("cuota-atrasada");
            fila.classList.add("cuota-pendiente");
        }
    }
}