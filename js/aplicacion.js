let clientes = [];

function guardarCliente() {
  let nombre = document.getElementById("nombreCliente").value;
  let cedula = document.getElementById("cedulaCliente").value;
  let telefono = document.getElementById("telefonoCliente").value;
  let correo = document.getElementById("correoCliente").value;

  if (nombre == "" || cedula == "" || telefono == "" || correo == "") {
    alert("Por favor complete todos los campos");
    return;
  }

  let cliente = {
    nombre: nombre,
    cedula: cedula,
    telefono: telefono,
    correo: correo
  };

  clientes.push(cliente);

  mostrarClientes();

  document.getElementById("nombreCliente").value = "";
  document.getElementById("cedulaCliente").value = "";
  document.getElementById("telefonoCliente").value = "";
  document.getElementById("correoCliente").value = "";

  alert("Cliente guardado correctamente");
}

function mostrarClientes() {
  let tabla = document.getElementById("tablaClientes");

  tabla.innerHTML = "";

  for (let i = 0; i < clientes.length; i++) {
    tabla.innerHTML += `
      <tr>
        <td>${clientes[i].nombre}</td>
        <td>${clientes[i].cedula}</td>
        <td>${clientes[i].telefono}</td>
        <td>${clientes[i].correo}</td>
      </tr>
    `;
  }
}