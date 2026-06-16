function cargarClientesCredito(){
    let seleccionarCliente = document.getElementById("clienteCredito");

    seleccionarCliente.innerHTML = <option value="">Seleccione un cliente</option>;

    for (let i = 0; i < datosDeLosClientes.length; i++){
        seleccionarCliente.innerHTML += `
            <option value="${i}">${datosDeLosClientes[i].nombre}</option>
        `;
    }
}