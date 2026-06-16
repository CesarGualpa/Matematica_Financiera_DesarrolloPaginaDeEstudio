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