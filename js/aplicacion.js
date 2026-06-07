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
  cargarClientesEnSelect();

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

function cargarClientesEnSelect() {
  let selectCliente = document.getElementById("clienteCredito");

  selectCliente.innerHTML = `
    <option value="">Seleccione un cliente</option>
  `;

  for (let i = 0; i < clientes.length; i++) {
    selectCliente.innerHTML += `
      <option value="${i}">${clientes[i].nombre}</option>
    `;
  }
}

function calcularCredito() {
  let clienteSeleccionado = document.getElementById("clienteCredito").value;
  let monto = Number(document.getElementById("montoCredito").value);
  let plazo = Number(document.getElementById("plazoCredito").value);
  let tasaAnual = Number(document.getElementById("tasaCredito").value);
  let tipoAmortizacion = document.getElementById("tipoAmortizacion").value;

  if (clienteSeleccionado == "" || monto == "" || plazo == "" || tasaAnual == "" || tipoAmortizacion == "") {
    alert("Por favor complete todos los datos del crédito");
    return;
  }

  if (monto <= 0 || plazo <= 0 || tasaAnual <= 0) {
    alert("El monto, plazo y tasa deben ser mayores a cero");
    return;
  }

  let cliente = clientes[clienteSeleccionado];

  mostrarResumenCredito(cliente, monto, plazo, tasaAnual, tipoAmortizacion);

  if (tipoAmortizacion == "frances") {
    calcularAmortizacionFrancesa(monto, plazo, tasaAnual);
  } else if (tipoAmortizacion == "aleman") {
    calcularAmortizacionAlemana(monto, plazo, tasaAnual);
  }
}

function mostrarResumenCredito(cliente, monto, plazo, tasaAnual, tipoAmortizacion) {
  let resumen = document.getElementById("resumenCredito");

  let nombreTipo = "";

  if (tipoAmortizacion == "frances") {
    nombreTipo = "Sistema Francés";
  } else if (tipoAmortizacion == "aleman") {
    nombreTipo = "Sistema Alemán";
  }

  resumen.innerHTML = `
    <div class="resumen">
      <h3>Resumen del Crédito</h3>
      <p><strong>Cliente:</strong> ${cliente.nombre}</p>
      <p><strong>Monto solicitado:</strong> $${monto.toFixed(2)}</p>
      <p><strong>Plazo:</strong> ${plazo} meses</p>
      <p><strong>Tasa anual:</strong> ${tasaAnual}%</p>
      <p><strong>Tipo de amortización:</strong> ${nombreTipo}</p>
    </div>
  `;
}

function calcularAmortizacionFrancesa(monto, plazo, tasaAnual) {
  let tabla = document.getElementById("tablaAmortizacion");

  tabla.innerHTML = "";

  let tasaMensual = tasaAnual / 100 / 12;

  let cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);

  let saldo = monto;

  for (let i = 1; i <= plazo; i++) {
    let interes = saldo * tasaMensual;
    let capital = cuota - interes;
    saldo = saldo - capital;

    if (saldo < 0) {
      saldo = 0;
    }

    let fechaPago = obtenerFechaPago(i);

    tabla.innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${fechaPago}</td>
        <td>$${capital.toFixed(2)}</td>
        <td>$${interes.toFixed(2)}</td>
        <td>$${cuota.toFixed(2)}</td>
        <td>$${saldo.toFixed(2)}</td>
      </tr>
    `;
  }
}

function calcularAmortizacionAlemana(monto, plazo, tasaAnual) {
  let tabla = document.getElementById("tablaAmortizacion");

  tabla.innerHTML = "";

  let tasaMensual = tasaAnual / 100 / 12;

  let capitalFijo = monto / plazo;

  let saldo = monto;

  for (let i = 1; i <= plazo; i++) {
    let interes = saldo * tasaMensual;
    let cuota = capitalFijo + interes;
    saldo = saldo - capitalFijo;

    if (saldo < 0) {
      saldo = 0;
    }

    let fechaPago = obtenerFechaPago(i);

    tabla.innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${fechaPago}</td>
        <td>$${capitalFijo.toFixed(2)}</td>
        <td>$${interes.toFixed(2)}</td>
        <td>$${cuota.toFixed(2)}</td>
        <td>$${saldo.toFixed(2)}</td>
      </tr>
    `;
  }
}

function obtenerFechaPago(numeroCuota) {
  let fecha = new Date();

  fecha.setMonth(fecha.getMonth() + numeroCuota);

  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let anio = fecha.getFullYear();

  return dia + "/" + mes + "/" + anio;
}