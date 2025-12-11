// Cargar invitados guardados
const invitados = JSON.parse(localStorage.getItem("invitados")) || [];

function guardarInvitados() {
    localStorage.setItem("invitados", JSON.stringify(invitados));
}

function generarQR(texto) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(texto)}`;
}

function renderTabla() {
    const tbody = document.querySelector("#tablaInvitados tbody");
    tbody.innerHTML = "";

    invitados.forEach(inv => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${inv.nombre}</td>
            <td>${inv.estado}</td>
            <td><img src="${inv.qr}" width="80"></td>
        `;
        tbody.appendChild(fila);
    });
}

// Evento para agregar invitado
document.querySelector("#formInvitado").addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.querySelector("#nombreInvitado").value;
    const estado = document.querySelector("#estadoInvitado").value;
    const qr = generarQR(nombre);

    invitados.push({ nombre, estado, qr });
    guardarInvitados();
    renderTabla();

    e.target.reset();
});

// Render inicial
renderTabla();
