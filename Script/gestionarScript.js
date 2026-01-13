let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let contactoActual = null;

// esto sirve para cambiar secciones sin cargar una pagina nueva
function showSection(id, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));

    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// con esta funcion creamos un nuevo contacto
function crearContacto() {
    const nuevo = {
        id: Date.now(),
        nombre: nNombre.value,
        numero: nNumero.value,
        ocupacion: nOcupacion.value,
        correo: nCorreo.value,
        fecha: new Date().toLocaleDateString()
    };

    contactos.push(nuevo);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    alert("Contacto agregado");
}

// con esta funcion buscamos un contacto para editar
function buscarContacto() {
    contactoActual = contactos.find(c => c.id == eId.value);

    if (!contactoActual) {
        alert("Contacto no encontrado");
        return;
    }

    editFields.classList.remove("hidden");
    eNombre.value = contactoActual.nombre;
    eNumero.value = contactoActual.numero;
    eOcupacion.value = contactoActual.ocupacion;
    eCorreo.value = contactoActual.correo;
}

// con esta funcion actualizamos el contacto editado
function actualizarContacto() {
    contactoActual.nombre = eNombre.value;
    contactoActual.numero = eNumero.value;
    contactoActual.ocupacion = eOcupacion.value;
    contactoActual.correo = eCorreo.value;

    localStorage.setItem("contactos", JSON.stringify(contactos));
    alert("Contacto actualizado");
}

// con estas funciones manejamos la eliminacion de contactos
function confirmarEliminar() {
    alerta.classList.remove("hidden");
}

function cancelarEliminar() {
    alerta.classList.add("hidden");
}

function eliminarContacto() {
    contactos = contactos.filter(c => c.id != dId.value);
    favoritos = favoritos.filter(f => f.id != dId.value);

    localStorage.setItem("contactos", JSON.stringify(contactos));
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    alerta.classList.add("hidden");
    alert("Contacto eliminado");
}
