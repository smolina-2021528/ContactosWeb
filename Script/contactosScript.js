// estos son los contactos que tengo quemados
const contactosIniciales = [
    {
        id: 1,
        nombre: "Maria Monzon",
        numero: "4478-2595",
        ocupacion: "Secretaria",
        correo: "mmonzon@mastercontact.org.gt",
        fecha: "01-01-2024"  // Fecha por defecto para contactos iniciales
    },
    {
        id: 2,
        nombre: "Luis Palencia",
        numero: "4412-7845",
        ocupacion: "Desarrollador",
        correo: "lpalencia@mastercontact.org.gt",
        fecha: "01-01-2024"
    },
    {
        id: 3,
        nombre: "Josue Orellana",
        numero: "3754-1241",
        ocupacion: "Director de Marketing",
        correo: "jorellana@mastercontact.org.gt",
        fecha: "01-01-2024"
    }, 
    {
        id: 4,
        nombre: "Sharon Wagner",
        numero: "5412-4455",
        ocupacion: "Gerente de Ventas",
        correo: "swagner@mastercontact.org.gt",
        fecha: "01-01-2024"
    }, 
    {
        id: 5,
        nombre: "Carlos Mendoza",
        numero: "5121-4985",
        ocupacion: "Desarrollador",
        correo: "cmendoza@mastercontact.org.gt",
        fecha: "01-01-2024"
    }
];

let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const container = document.getElementById("contactosContainer");

// Inicializar contactos si no existen en localStorage
if (contactos.length === 0) {
    contactos = contactosIniciales;
    localStorage.setItem("contactos", JSON.stringify(contactos));
}

/* Render tarjetas */
function renderContactos() {
    container.innerHTML = "";

    contactos.forEach(c => {
        const isFav = favoritos.some(f => f.id === c.id);

        const card = document.createElement("div");
        card.className = "contact-card";

        card.innerHTML = `
            <h2>${c.nombre}</h2>
            <p><strong>Tel:</strong> ${c.numero}</p>
            <p><strong>Ocupación:</strong> ${c.ocupacion}</p>
            <p><strong>Email:</strong> ${c.correo}</p>

            <div class="card-actions">
                <button class="btn-details" onclick="toggleDetails(${c.id})">Ver detalles</button>
                <button class="btn-call">Llamar ahora</button>
                <button class="btn-manage" onclick="gestionarContacto(${c.id})">Gestionar</button>
                <span class="favorite ${isFav ? 'active' : ''}"
                      onclick="toggleFavorite(${c.id})">❤</span>
            </div>

            <div class="details" id="details-${c.id}" style="display: none;">
                <p><strong>ID:</strong> ${c.id}</p>
                <p><strong>Fecha de guardado:</strong> ${c.fecha || 'No disponible'}</p>
                <p><strong>Información ampliada</strong></p>
                <p>Notas, historial y datos adicionales.</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function toggleDetails(id) {
    const details = document.getElementById(`details-${id}`);
    details.style.display = details.style.display === "block" ? "none" : "block";
}

function toggleFavorite(id) {
    const index = favoritos.findIndex(f => f.id === id);

    if (index === -1) {
        const contacto = contactos.find(c => c.id === id);
        favoritos.push(contacto);
    } else {
        favoritos.splice(index, 1);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    renderContactos();
}

function gestionarContacto(id) {
    // Redirigir a la página de gestión, pasando el ID en la URL como parámetro de consulta
    window.location.href = '../Index/gestionarContactos.html?id=' + id;
}

renderContactos();