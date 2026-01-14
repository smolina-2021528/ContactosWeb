let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let tareaActual = null;
let sortDirection = { relevancia: 'asc', departamento: 'asc', tarea: 'asc' };

// Obtener fecha de login de la sesión
const session = JSON.parse(localStorage.getItem('session')) || { fechaLogin: new Date().toLocaleString('es-ES') };
let fechaLoginStr = session.fechaLogin;

// esto son ajustes para la fecha, sincereamente pedi la solucion a grok porque no sabia como manejarlo y daba error
fechaLoginStr = fechaLoginStr.replace(/,/g, ''); 
const dateParts = fechaLoginStr.match(/(\d{2})[\/-](\d{2})[\/-](\d{4})/);
let fechaLogin;
if (dateParts) {
    const formattedDate = `${dateParts[3]}-${dateParts[2]}-${dateParts[1]} ${fechaLoginStr.split(' ')[1] || '00:00'}`;
    fechaLogin = new Date(formattedDate);
} else {
    fechaLogin = new Date(); 
}
if (isNaN(fechaLogin.getTime())) {
    fechaLogin = new Date();
}

// con esta funcion calculamos la relevancia de cada tarea
function calcularRelevancia(fechaEntregaStr) {
    const fechaEntrega = new Date(fechaEntregaStr);
    if (isNaN(fechaEntrega.getTime())) return 'Tiempo Prudente'; // Fallback si fecha inválida
    const diffTime = fechaEntrega - fechaLogin;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 3) return 'Urgente';
    if (diffDays <= 7) return 'Importante';
    return 'Tiempo Prudente';
}

// esta funcion le da un valor a cada relevancia para poder ordenarla
function getRelevanciaValor(relevancia) {
    if (relevancia === 'Urgente') return 3;
    if (relevancia === 'Importante') return 2;
    return 1;
}

// estea funcion me muestra la seccion seleccionada para no cambiar de pagina
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));

    const section = document.getElementById(id);
    section.classList.add('active');
    const button = document.querySelector(`.tabs button[onclick="showSection('${id}')"]`);
    if (button) button.classList.add('active');
}

// con esto creo una nueva tarea
function crearTarea() {
    const maxId = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) : 0;
    const nuevoId = maxId + 1;

    const nueva = {
        id: nuevoId,
        tarea: nTarea.value,
        fechaEntrega: nFechaEntrega.value,
        departamento: nDepartamento.value
    };

    tareas.push(nueva);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    alert("Tarea agregada");
    nTarea.value = '';
    nFechaEntrega.value = '';
    nDepartamento.value = '';
    renderTareas();
}

// con esto busco una tarea para editar
function buscarTarea() {
    tareaActual = tareas.find(t => t.id == eId.value);

    if (!tareaActual) {
        alert("Tarea no encontrada");
        return;
    }

    editFields.classList.remove("hidden");
    eTarea.value = tareaActual.tarea;
    eFechaEntrega.value = tareaActual.fechaEntrega;
    eDepartamento.value = tareaActual.departamento;
}

// con esto actualizo la tarea editada
function actualizarTarea() {
    tareaActual.tarea = eTarea.value;
    tareaActual.fechaEntrega = eFechaEntrega.value;
    tareaActual.departamento = eDepartamento.value;

    localStorage.setItem("tareas", JSON.stringify(tareas));
    alert("Tarea actualizada");
    renderTareas();
}

// con esto limpio los campos de editar
function limpiarEditar() {
    eTarea.value = '';
    eFechaEntrega.value = '';
    eDepartamento.value = '';
}

// con esto confirmo la eliminacion de una tarea
function confirmarEliminar() {
    alerta.classList.remove("hidden");
}

// con esto cancelo la eliminacion de una tarea
function cancelarEliminar() {
    alerta.classList.add("hidden");
}

// con esto elimino la tarea seleccionada
function eliminarTarea() {
    tareas = tareas.filter(t => t.id != dId.value);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    alerta.classList.add("hidden");
    alert("Tarea eliminada");
    renderTareas();
}

// con esto cargo toda la tabla de tareas
function renderTareas() {
    const tbody = document.getElementById('tareasBody');
    tbody.innerHTML = '';

    tareas.forEach(t => {
        const relevancia = calcularRelevancia(t.fechaEntrega);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.id}</td>
            <td>${t.tarea}</td>
            <td>${relevancia}</td>
            <td>${t.fechaEntrega}</td>
            <td>${t.departamento}</td>
            <td><button onclick="gestionarTarea(${t.id})">Gestion</button></td>
        `;
        tbody.appendChild(row);
    });
}

// con esto gestiono se coloca automaticamente el id en el campo editar
function gestionarTarea(id) {
    showSection('editar');
    eId.value = id;
    buscarTarea();
}

// con esto ordeno la tabla segun la columna y direccion seleccionada
function sortTable(column, direction) {
    if (column === 'relevancia') {
        tareas.sort((a, b) => {
            const valA = getRelevanciaValor(calcularRelevancia(a.fechaEntrega));
            const valB = getRelevanciaValor(calcularRelevancia(b.fechaEntrega));
            return direction === 'asc' ? valA - valB : valB - valA;
        });
    } else if (column === 'departamento') {
        tareas.sort((a, b) => {
            return direction === 'asc' ? a.departamento.localeCompare(b.departamento) : b.departamento.localeCompare(a.departamento);
        });
    } else if (column === 'tarea') {
        tareas.sort((a, b) => {
            return direction === 'asc' ? a.tarea.localeCompare(b.tarea) : b.tarea.localeCompare(a.tarea);
        });
    }
    renderTareas();
}

// aplico el orden seleccionado
function aplicarOrden() {
    const column = document.getElementById('sortColumn').value;
    const direction = document.getElementById('sortDirection').value;
    sortTable(column, direction);
}

// Inicializar
renderTareas();