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

    if(posicionCliente == "" || monto <= 0 || plazo <= 0 || tasa <= 0){
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

    let totalCapital = 0;
    let totalInteres = 0;
    let totalCuotas = 0;

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

        totalCapital = totalCapital + capital;
        totalInteres = totalInteres + interes;
        totalCuotas = totalCuotas + totalCuota;

        let fechaPago = obtenerFechaPago(i);

        tabla.innerHTML += `
            <tr 
                id="filaCuota${i}" 
                class="cuota-pendiente" 
                data-fecha="${fechaPago}"
                data-estado-anterior=""
            >
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

                <td>
                    <button 
                        id="botonRollback${i}" 
                        class="boton-rollback"
                        onclick="rollbackCuota(${i})"
                        disabled
                    >
                        Rollback
                    </button>
                </td>

                <td id="estadoCuota${i}">Pendiente</td>
            </tr>
        `;
    }

    agregarFilaTotales(totalCapital, totalInteres, totalCuotas);

    comprobarCuotasAtrasadas();
}

function calcularSistemaAleman(posicionCliente, monto, plazo, tasa, interesMensual) {
    let cliente = datosDeLosClientes[posicionCliente];
    let resumen = document.getElementById("resumenCredito");
    let tabla = document.getElementById("tablaAmortizacion");

    let saldo = monto;
    let capitalFijo = monto / plazo;

    let totalCapital = 0;
    let totalInteres = 0;
    let totalCuotas = 0;

    resumen.innerHTML = `
        <h3>Resumen del credito</h3>
        <p><strong>Cliente:</strong> ${cliente.nombre}</p>
        <p><strong>Monto solicitado:</strong> $${monto.toFixed(2)}</p>
        <p><strong>Plazo:</strong> ${plazo} meses</p>
        <p><strong>Tasa anual:</strong> ${tasa}%</p>
        <p><strong>Tipo de amortizacion:</strong> Sistema Aleman</p>
        <p><strong>Capital fijo mensual:</strong> $${capitalFijo.toFixed(2)}</p>
    `;

    tabla.innerHTML = "";

    for (let i = 1; i <= plazo; i++) {
        let interes = saldo * interesMensual;
        let capital = capitalFijo;

        if (capital > saldo) {
            capital = saldo;
        }

        let totalCuota = capital + interes;

        saldo = saldo - capital;

        if (saldo < 0.01) {
            saldo = 0;
        }

        totalCapital = totalCapital + capital;
        totalInteres = totalInteres + interes;
        totalCuotas = totalCuotas + totalCuota;

        let fechaPago = obtenerFechaPago(i);

        tabla.innerHTML += `
            <tr 
                id="filaCuota${i}" 
                class="cuota-pendiente" 
                data-fecha="${fechaPago}"
                data-estado-anterior=""
            >
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

                <td>
                    <button 
                        id="botonRollback${i}" 
                        class="boton-rollback"
                        onclick="rollbackCuota(${i})"
                        disabled
                    >
                        Rollback
                    </button>
                </td>

                <td id="estadoCuota${i}">Pendiente</td>
            </tr>
        `;
    }

    agregarFilaTotales(totalCapital, totalInteres, totalCuotas);

    comprobarCuotasAtrasadas();
}

function agregarFilaTotales(totalCapital, totalInteres, totalCuotas) {
    let tabla = document.getElementById("tablaAmortizacion");

    tabla.innerHTML += `
        <tr class="fila-totales">
            <td colspan="2"><strong>Totales</strong></td>
            <td><strong>$${totalCapital.toFixed(2)}</strong></td>
            <td><strong>$${totalInteres.toFixed(2)}</strong></td>
            <td><strong>$${totalCuotas.toFixed(2)}</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    `;
}

function pagarCuota(numeroCuota) {
    let fila = document.getElementById("filaCuota" + numeroCuota);
    let estado = document.getElementById("estadoCuota" + numeroCuota);
    let botonPagar = document.getElementById("botonPagar" + numeroCuota);
    let botonRollback = document.getElementById("botonRollback" + numeroCuota);

    let estadoActual = estado.innerHTML;

    if (estadoActual == "Pagado") {
        alert("Esta cuota ya esta pagada");
        return;
    }

    fila.setAttribute("data-estado-anterior", estadoActual);

    estado.innerHTML = "Pagado";

    aplicarEstiloEstado(numeroCuota);

    botonPagar.disabled = true;
    botonPagar.innerHTML = "Pagada";

    botonRollback.disabled = false;
}

function rollbackCuota(numeroCuota) {
    let fila = document.getElementById("filaCuota" + numeroCuota);
    let estado = document.getElementById("estadoCuota" + numeroCuota);
    let botonPagar = document.getElementById("botonPagar" + numeroCuota);
    let botonRollback = document.getElementById("botonRollback" + numeroCuota);

    let estadoAnterior = fila.getAttribute("data-estado-anterior");

    if (estadoAnterior == "") {
        alert("No hay ningun cambio anterior para revertir");
        return;
    }

    estado.innerHTML = estadoAnterior;

    fila.setAttribute("data-estado-anterior", "");

    botonPagar.disabled = false;
    botonPagar.innerHTML = "Pagar";

    botonRollback.disabled = true;

    aplicarEstiloEstado(numeroCuota);

    comprobarCuotasAtrasadas();
}

function aplicarEstiloEstado(numeroCuota) {
    let fila = document.getElementById("filaCuota" + numeroCuota);
    let estado = document.getElementById("estadoCuota" + numeroCuota);

    fila.classList.remove("cuota-pendiente");
    fila.classList.remove("cuota-atrasada");
    fila.classList.remove("cuota-pagada");

    if (estado.innerHTML == "Pagado") {
        fila.classList.add("cuota-pagada");
    } else if (estado.innerHTML == "Atrasado") {
        fila.classList.add("cuota-atrasada");
    } else {
        fila.classList.add("cuota-pendiente");
    }
}

function comprobarCuotasAtrasadas() {
    let filas = document.querySelectorAll("#tablaAmortizacion tr[data-fecha]");

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
        } else {
            estado.innerHTML = "Pendiente";
        }

        aplicarEstiloEstado(numeroCuota);
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

    if (fechaSeleccionada != "") {
        let partes = fechaSeleccionada.split("-");

        let anio = Number(partes[0]);
        let mes = Number(partes[1]) - 1;
        let dia = Number(partes[2]);

        let fecha = new Date(anio, mes, dia);
        fecha.setHours(0, 0, 0, 0);

        return fecha;
    }

    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return hoy;
}

mostrarClientesTabla();
cargarClientesCredito();