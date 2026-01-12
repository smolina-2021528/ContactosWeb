// estos son los contactos que tengo quemados
const contactos = [
    {
        id: 1,
        nombre: "Maria Monzon",
        numero: "4478-2595",
        ocupacion: "Secretaria",
        correo: "mmonzon@mastercontact.org.gt"
    },
    {
        id: 2,
        nombre: "Luis Palencia",
        numero: "4412-7845",
        ocupacion: "Desarrollador",
        correo: "lpalencia@mastercontact.org.gt"
    },
    {
        id: 3,
        nombre: "Josue Orellana",
        numero: "3754-1241",
        ocupacion: "Director de Marketing",
        correo: "jorellana@mastercontact.org.gt"
    }, 
    {
        id: 4,
        nombre: "Sharon Wagner",
        numero: "5412-4455",
        ocupacion: "Gerente de Ventas",
        correo: "swagner@mastercontact.org.gt"
    }, 
    {
        id: 5,
        nombre: "Carlos Mendoza",
        numero: "5121-4985",
        ocupacion: "Desarrollador",
        correo: "cmendoza@mastercontact.org.gt"
    }
];

const container = document.getElementById("contactosContainer");

contactos.forEach(c => {
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
            <button class="btn-manage">Gestionar</button>
            <span class="favorite" onclick="addFavorite(${c.id})">❤</span>
        </div>

        <div class="details" id="details-${c.id}">
            <p><strong>Información ampliada del contacto</strong></p>
            <p>Historial, notas y más datos aquí.</p>
        </div>
    `;

    container.appendChild(card);
});

function toggleDetails(id) {
    const details = document.getElementById(`details-${id}`);
    details.style.display = details.style.display === "block" ? "none" : "block";
}

function addFavorite(id) {
    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    const contacto = contactos.find(c => c.id === id);

    if (!favs.some(f => f.id === id)) {
        favs.push(contacto);
        localStorage.setItem("favoritos", JSON.stringify(favs));
        alert("Agregado a favoritos");
    }
}
