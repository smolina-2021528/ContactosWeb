
// con este script cargo los datos del perfil
document.addEventListener('DOMContentLoaded', () => {
    
    // aqui cargo la informacion del usuario
    const session = JSON.parse(localStorage.getItem('session')) || { usuario: 'Invitado', fechaLogin: 'No disponible' };
    document.getElementById('usuarioInfo').textContent = session.usuario;
    document.getElementById('fechaLoginInfo').textContent = session.fechaLogin;

    // aqui cargo el conteo de contactos y favoritos
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    document.getElementById('contactosCount').textContent = contactos.length;
    document.getElementById('favoritosCount').textContent = favoritos.length;

    // con esto cierro la sesion
    document.getElementById('cerrarSesion').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('session');
        window.location.href = '../Index.html'; 
    });
});