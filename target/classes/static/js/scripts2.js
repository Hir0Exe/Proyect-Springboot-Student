function getAllHabilidades() {
    return fetch(`./mainController/habilidad`, {
        method: 'GET',
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('postulacion-form');
    const contenedorAreas = document.getElementById('areas-content');
    if (form) {
        await cargarHabilidades();
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            mostrarTarjeta();
        });
        form.addEventListener('reset', (e) => {
            document.getElementById('habilidadesSeleccionadas').querySelector('ul').innerHTML = '';
        });
        $('body #modalTarjeta').on('click', '#botonCloseModal', () => {
            $('#modalTarjeta').modal('hide');
        });
        agregarHabilidad();
    } else if (contenedorAreas) {
        cargarAreas();
    }
});

function mostrarTarjeta() {
    const nombre = document.getElementById('nombre').value;
    const profesion = document.getElementById('profesion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const habilidades = Array.from(document.getElementById('habilidadesSeleccionadas').querySelector('ul').children).map(option => option.textContent.replace('x', ''));
    
    const tarjeta = `
        <div>
            <h3>${nombre}</h3>
            <img src="https://as2.ftcdn.net/v2/jpg/06/96/08/43/1000_F_696084382_nubPZYb9MTxXXl0t1VaLahzUQUWu53ix.jpg" alt="img" style="width: 200px; height: 140px;" />
            <p>Profesión: ${profesion}</p>
            <p>Teléfono: ${telefono}</p>
            <p>Email: ${email}</p>
            <p>LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a></p>
            <p>Habilidades: ${habilidades.join(', ')}</p>
        </div>
    `;
    
    document.getElementById('bodyModalTarjeta').innerHTML = tarjeta;
    $('#modalTarjeta').modal({
        backdrop: 'static', keyboard: false
    });
}

function cargarAreas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'areas-content.html', true); // Suponiendo que tienes un archivo 'areas-content.html' con el contenido
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('areas-content').innerHTML = xhr.responseText;
        } else {
            console.error('Error al cargar las áreas de desarrollo');
        }
    };
    xhr.onerror = function() {
        console.error('Error de conexión');
    };
    xhr.send();
}

function agregarHabilidad() {
    const select = document.getElementById('habilidades');
    const ul = document.getElementById('habilidadesSeleccionadas').querySelector('ul');
    if (select.value) {
        const option = select.selectedOptions[0];
        if (ul.children.length > 2 || Array.from(ul.children).some(li => li.textContent.trim().replace('x', '') === option.textContent)) return;

        const li = document.createElement('li');
        li.value = option.value;
        li.textContent = option.textContent;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            ul.removeChild(li);
        });
        li.appendChild(removeButton);
        ul.appendChild(li);
    }
}

async function cargarHabilidades() {
    try {
        const response = await getAllHabilidades();
        if (!response.ok) throw new Error('Error al cargar el select de habilidades');
        const data = await response.json();
        const select = document.getElementById('habilidades');
        select.innerHTML = '<option value="">Seleccionar</option>';
        data.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id;
            option.textContent = element.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}