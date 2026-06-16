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

function calcularSistemaFrances(posicionCliente, monto, plazo, tasa, interesMensual){
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

    for(let i = 1; i <= plazo; i++){
        let interes = saldo * interesMensual;
        let capital = cuotaMensual - interes;

        if(capital > saldo){
            capital = saldo;
        }

        let totalCuota = capital + interes;

        saldo = saldo - capital;

        if(saldo < 0.01){
            saldo = 0;
        }

        tabla.innerHTML +=`
            <tr>
                <td>${i}</td>
                <td>${obtenerFechaPago(i)}</td>
                <td>$${capital.toFixed(2)}</td>
                <td>$${interes.toFixed(2)}</td>
                <td>$${totalCuota.toFixed(2)}</td>
                <td>$${saldo.toFixed(2)}</td>
            </tr>
        `;
    }
}