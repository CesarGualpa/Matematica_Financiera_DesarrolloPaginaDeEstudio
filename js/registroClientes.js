let datosDeLosClientes = [
{nombre: "Gabriel", cedula: "1312345678", telefono: "0987654321", correo: "gabr@gmail.com"},
{nombre: "Luis", cedula: "1309876543", telefono: "0991234567", correo: "luis@gmail.com"},
{nombre: "Jessica", cedula: "1723456789", telefono: "0965432109", correo: "jussica@gmail.com"},
{nombre: "Andy", cedula: "1004567890", telefono: "0976543210", correo: "andyon@gmail.com"}
];

function registrarCliente(){
    let nombre = document.getElementById("nombreCliente").value;
    let cedula = document.getElementById("cedulaCliente").value;
    let telefono = document.getElementById("telefonoCliente").value;
    let correo = document.getElementById("correoCliente").value;

    if(nombre=="" || cedula=="" || telefono=="" || correo==""){
        alert("Debe llenar todos los campos <3");
        return;
    }

    let datosCliente = {
        nombre: nombre,
        cedula: cedula,
        telefono: telefono,
        correo: correo,
    };

    datosDeLosClientes.push(datosCliente);

    mostrarClientesTabla();

    cargarClientesCredito();

    limpiarFormulario();

    alert("Cliente registrado correctamente <3");

}

function mostrarClientesTabla(){
    let tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    for (let i = 0; i < datosDeLosClientes.length; i++){
        tabla.innerHTML += `
            <tr>
                    <td>${datosDeLosClientes[i].nombre}</td>
                    <td>${datosDeLosClientes[i].cedula}</td>
                    <td>${datosDeLosClientes[i].telefono}</td>
                    <td>${datosDeLosClientes[i].correo}</td>
            </tr>
        `;
    }
}

function limpiarFormulario(){
    document.getElementById("nombreCliente").value = "";
    document.getElementById("cedulaCliente").value = "";
    document.getElementById("telefonoCliente").value = "";
    document.getElementById("correoCliente").value = "";
}