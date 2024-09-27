/* ==================================================================== */
/* PETICIONES */
/* ==================================================================== */

function getUsuario(email, contrania) {
    return fetch(`./mainController/sesion/${email}/${contrania}`, {
        method: 'GET',
    });
}

function getAllPropiedad() {
    return fetch(`./mainController/propiedad`, {
        method: 'GET',
    });
}

function postUsuario(data) {
    return fetch('./mainController/usuario', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
    });
}

function postPropiedad(data) {
    return fetch('./mainController/propiedad', {
        method: 'POST',
        body: data,
    });
}

/* ==================================================================== */
/* FUNCIONAL */
/* ==================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('btnIniciarSesion').onclick = async (e) => {
        e.preventDefault();
        await iniciarSesion();
    };
    document.getElementById('btnRegistrarUsuario').onclick = async (e) => {
        e.preventDefault();
        await registrarUsuario();
    };
    document.getElementById('btnSavePropiedad').onclick = async (e) => {
        e.preventDefault();
        await savePropiedad();
    };
    const response = sessionStorage.getItem('usuario');
    if (response) {
        const usuario = JSON.parse(response);
        const listOcultar = ['btnInicioSesion', 'btnRegistro'];
        listOcultar.forEach(item => document.getElementById(item).style.display = 'none');

        const contentUser = document.getElementById('contentUserSesion');
        contentUser.innerHTML = `Bienvenido, ${usuario.nombre} <button id="btnCerrarSesion">Cerrar Sesion</button>`;
        contentUser.style.display = 'block';
        document.getElementById('btnCerrarSesion').onclick = async (e) => {
            e.preventDefault();
            await cerrarSesion();
        };
        document.getElementById('form-savePropiedad').querySelector('#usuario').value = usuario.id;
        hideLoginModal();
    }
    await cargarAllPropiedades();
});

async function iniciarSesion() {
    const form = document.getElementById('form-inicioSesion');
    const email = form.querySelector('#login-email').value || null;
    const contrania = form.querySelector('#login-password').value || null;
    if ((!email) || (!contrania)) return;
    try {
        const response = await getUsuario(email, contrania);
        if (response.status === 204) {
            form.querySelector('#login-email').value = '';
            form.querySelector('#login-password').value = '';
            form.querySelector('#login-email').focus();
            throw new Error('Usuario no encontrado');
        }
        if (!response.ok) throw new Error('Error al iniciar sesion');
        const data = await response.json();
        if (data) sessionStorage.setItem('usuario', JSON.stringify(data));
        const listOcultar = ['btnInicioSesion', 'btnRegistro'];
        listOcultar.forEach(item => document.getElementById(item).style.display = 'none');

        const contentUser = document.getElementById('contentUserSesion');
        contentUser.innerHTML = `Bienvenido, ${data.nombre} <button id="btnCerrarSesion">Cerrar Sesion</button>`;
        contentUser.style.display = 'block';
        document.getElementById('btnCerrarSesion').onclick = async (e) => {
            e.preventDefault();
            await cerrarSesion();
        };
        document.getElementById('form-savePropiedad').querySelector('#usuario').value = data.id;
        hideLoginModal();
    } catch (e) {
        console.error(e);
    }
}

function cerrarSesion() {
    document.getElementById('form-savePropiedad').querySelector('#titulo').value = '';
    sessionStorage.removeItem('usuario');
    document.getElementById('contentUserSesion').style.display = 'none';
    const listMostrar = ['btnInicioSesion', 'btnRegistro'];
    listMostrar.forEach(item => document.getElementById(item).style.display = '');
}

async function registrarUsuario() {
    const form = document.getElementById('form-registrarUsuario');
    try {
        const data = armarUsuario(form);
        const response = await postUsuario(data);
        if (!response.ok) throw new Error('Error al guardar el usuario');
        const dataResponse = await response.json();
        if (!dataResponse) throw new Error('Error al guardar el usuario');
        hideRegisterModal();
        showLoginModal();
    } catch (e) {
        console.error(e);
    }
}

function armarUsuario(form) {
    return {
        nombre: form.querySelector('#register-name').value || null,
        email: form.querySelector('#register-email').value || null,
        contrasenia: form.querySelector('#register-password').value || null,
    };
}

async function savePropiedad() {
    const form = document.getElementById('form-savePropiedad');
    try {
        const data = armarPropiedad(form);
        const response = await postPropiedad(data);
        if (!response.ok) throw new Error('Error al guardar la propiedad');
        const dataResponse = await response.json();
        if (!dataResponse) throw new Error('Error al guardar la propiedad');
        hidePublicarModal();
    } catch (e) {
        console.error(e);
    }
}

function armarPropiedad(form) {
    const formData = new FormData();
    formData.append('propiedad.titulo', form.querySelector('#titulo').value);
    formData.append('propiedad.descripcion', form.querySelector('#descripcion').value);
    formData.append('propiedad.tipoCasa', form.querySelector('#tipo').value);
    formData.append('propiedad.precio', form.querySelector('#precio').value);
    formData.append('propiedad.ubicacion', form.querySelector('#ubicacion').value);
    formData.append('propiedad.superficie', form.querySelector('#superficie').value);
    formData.append('propiedad.numeroHabitaciones', form.querySelector('#habitaciones').value);
    formData.append('propiedad.numeroBanios', form.querySelector('#banios').value);
    formData.append('propiedad.usuario.id', form.querySelector('#usuario').value);

    // Agregar los archivos de imágenes al FormData
    var imagenes = form.querySelector('#imagenes').files;
    for (var i = 0; i < imagenes.length; i++) {
        formData.append('imagenes', imagenes[i]);
    }
    return formData;
}

async function cargarAllPropiedades() {
    const content = document.getElementById('content-allPropiedades');
    try {
        const response = await getAllPropiedad();
        if (!response.ok) throw new Error('Error al cargar las propiedades');
        const dataResponse = await response.json();
        if (!dataResponse) throw new Error('Error al cargar las propiedades');
        console.log(dataResponse);
    } catch (e) {
        
    }
}

/* ==================================================================== */
/* UTILES */
/* ==================================================================== */

function showAdvancedSearchModal() {
    document.getElementById('advancedSearchModal').style.display = 'block';
}

function hideAdvancedSearchModal() {
    document.getElementById('advancedSearchModal').style.display = 'none';
}


function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function hideLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}


function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function hideRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}


function showPublicarModal() {
    const modal = document.getElementById('publicarModal');
    modal.querySelector('.modal-content').style.width = '40%'
    modal.style.display = 'block';
}

function hidePublicarModal() {
    document.getElementById('publicarModal').style.display = 'none';
}
