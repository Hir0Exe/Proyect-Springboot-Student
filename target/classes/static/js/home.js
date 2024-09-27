//======================Variables Globales===========================================

let usuarioSesion = null;
let htmlBodyModalSesion = null;

//====================================================================================
///===================== Peticiones ==================================================

function peticionGuardarUsuario(data) {
    var obj = $.ajax({
        type: "POST",
        url: "./mainController/usuario",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        data: JSON.stringify(data), ContentType: "application/json", dataType: "json"
    });
    return obj;
}

function getSesion(nombre, contrasenia) {
    return $.ajax({
        type: "GET",
        url: "./mainController/sesion/" + nombre + "/" + contrasenia,
        dataType: "json"
    });
}
function getAllLibros() {
    return $.ajax({
        type: "GET",
        url: "./mainController/libro",
        dataType: "json"
    });
}

function showModalSesion(furips) {
    console.log(furips);
    
    $('#modalSesion').modal({backdrop: 'static', keyboard: false});
}

function hideModal(idModal) {
    if (esVacio(htmlBodyModalSesion)) {
        htmlBodyModalSesion = document.getElementById('contentCrudSesionBodyFuRi').innerHTML;
    }
    document.getElementById('contentCrudSesionBodyFuRi').innerHTML = htmlBodyModalSesion;
    $(`#${idModal}`).modal('hide');
}

function showRegistrar() {
    document.getElementById('contentRegistrar').style = 'display: block';
    document.getElementById('iniciarSesion').setAttribute('disabled', '');
    document.getElementById('registrarUsuario').onclick = () => {
        guardarUsuario();
    };
}

function esVacio(params) {
    if (params === null || params === undefined || params === '') {
        return true;
    }
    return false;
}

async function guardarUsuario() {
    const json = {};
    //Verificacion de datos
    let noTieneValor = false;
    document.getElementById('contentCrudSesionBodyFuRi').querySelectorAll('input, select').forEach(input => {
        if (esVacio(input.value)) {
            noTieneValor = true;
        }
        json[ input.name ] = input.value;
    });
    if (noTieneValor) {
        return Swal.fire('Atención', 'Campos vacíos en el registro', 'error');
    }
    try {
        let request = await peticionGuardarUsuario(json);
        console.log(request);
        Swal.fire('Atención', 'Usuario registrado correctamente', 'success');
        hideModal('modalSesion');
    } catch (error) {
        Swal.fire('Atención', 'Error al registrar el usuario', 'error');
        console.log(error);
    }
}

async function iniciarSesion() {
    try {
        usuarioSesion = await getSesion(document.getElementById('nombreSesion').value, document.getElementById('passwordSesion').value);
        if (usuarioSesion != undefined && usuarioSesion != null) {
            hideModal('modalSesion');
        }
    } catch (error) {
        Swal.fire('Atención', 'Usuario no encontrado', 'error');
    }
}

async function chargeLibros() {
    const body = document.getElementById('bodyItems');
    body.innerHTML = '';
    try {
        let libros = await getAllLibros();
        let html1 = '';
        libros.forEach((libro, index) => {
            let div = document.createElement('div');
            div.classList.add('col-lg-4');
            div.classList.add('col-md-6');
            div.classList.add('col-sm-6');
            div.id = `itemLibro${index}`;
            html1 = `
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="${libro.enlacetapa}" style="background-image: url(&quot;${libro.enlacetapa}&quot;);">
                            <div class="ep">+ ${libro.categoria.minimoEdad}</div>
                            <div class="comment"><i class="fa fa-comments"></i> 0</div>
                            <div class="view"><i class="fa fa-eye"></i> 0</div>
                        </div>
                        <div class="product__item__text">
                            <ul>
                                <li>${libro.categoria.nombre}</li>
                            </ul>
                            <h5><a href="#">${libro.titulo}</a></h5>
                        </div>
                    </div>
            `;
            div.onclick = () => {
                showViewLibro(libro);
            };
            div.innerHTML = html1;
            body.appendChild(div);
        });
    } catch (error) {
        console.log(error);
    }
}

function showViewLibro(libro) {
    console.log(libro);
    const contenedor = document.getElementById('contentViewLibro');
    contenedor.innerHTML = '';
    let div1 = document.createElement('div');
    div1.classList.add('product__item__pic');
    div1.classList.add('set-bg');
    div1.id = 'divImangeViewLibro';
    div1.setAttribute('data-setbg', `${libro.enlacetapa}`);
    //div1.style.backgroundImage = `url(&quot;${libro.enlacetapa}&quot;);`;
    $('#divImangeViewLibro').css('background-image', `url(&quot;${libro.enlacetapa}&quot;);`);
    div1.innerHTML = `
        <div class="ep">+ ${libro.categoria.minimoEdad}</div>
        <div class="comment"><i class="fa fa-comments"></i> 0</div>
        <div class="view"><i class="fa fa-eye"></i> 0</div>
    `;
    contenedor.appendChild(div1);
    let div2 = document.createElement('div');
    div2.classList.add('product__item__text');
    div2.innerHTML = `
        <ul>
            <li>${libro.categoria.nombre}</li>
        </ul>
        <h5><a href="#">${libro.titulo}</a></h5>
    `;
    contenedor.appendChild(div2);
    $('#modalLibros').modal({backdrop: 'static', keyboard: false});
}

(async function cargarEventos()
  {
    document.getElementById('btnSesion').onclick = () => {
        showModalSesion();
    };
  })();

$(document).ready(async () => {
    await chargeLibros();
});