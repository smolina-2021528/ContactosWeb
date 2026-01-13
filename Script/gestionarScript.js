let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let contactoActual = null;

// esto sirve para cambiar secciones sin cargar una pagina nueva
function showSection(id) {  
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));

    const section = document.getElementById(id);
    section.classList.add('active');
    const button = document.querySelector(`.tabs button[onclick="showSection('${id}')"]`);
    if (button) button.classList.add('active');
}

// Obtener el ID de la URL si existe
const urlParams = new URLSearchParams(window.location.search);
const contactId = urlParams.get('id');

// Si hay un ID, abrir la sección de editar y prellenar el campo
if (contactId) {
    showSection('editar'); // Cambia a la pestaña de editar
    eId.value = contactId;
    buscarContacto(); // Busca automáticamente el contacto
}

// con esta funcion creamos un nuevo contacto
function crearContacto() {
    // Encontrar el ID máximo actual y asignar el siguiente secuencial
    const maxId = contactos.length > 0 ? Math.max(...contactos.map(c => c.id)) : 0;
    const nuevoId = maxId + 1;

    const nuevo = {
        id: nuevoId,
        nombre: nNombre.value,
        numero: nNumero.value,
        ocupacion: nOcupacion.value,
        correo: nCorreo.value,
        fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })  // Formato DD-MM-YYYY
    };

    contactos.push(nuevo);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    alert("Contacto agregado");
    // Limpiar los campos después de agregar
    nNombre.value = '';
    nNumero.value = '';
    nOcupacion.value = '';
    nCorreo.value = '';
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