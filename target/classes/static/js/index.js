//======================Variables Globales===========================================



//====================================================================================
///===================== Peticiones ==================================================

function getAllDesarrolladores() {
    return fetch(`./mainController/desarrollador`, {
        method: 'GET',
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    await cargarDesarrolladores();
});

async function cargarDesarrolladores() {
    const response = await getAllDesarrolladores();
    try {
        if (!response.ok) throw new Error('Error al traer todos los desarrolladores');
        const data = await response.json();
        const contenedor = document.getElementById('contenedorTarjetas');
        data.forEach(element => {
            const {desarrollador, habilidades} = element;
            const habilidadesTxt = Array.from(habilidades).map(habilidad => habilidad.nombre);
            let div = document.createElement('div');
            div.classList.add('col-4');
            div.innerHTML = div.innerHTML + `
                    <div class="card">
                        <img src="https://as2.ftcdn.net/v2/jpg/06/96/08/43/1000_F_696084382_nubPZYb9MTxXXl0t1VaLahzUQUWu53ix.jpg" class="card-img-top" alt="img">
                        <div class="card-body">
                        <h5 class="card-title">${desarrollador.nombre}</h5>
                        <p class="card-text">
                            <spam>Profesión: ${desarrollador.profesion}</spam><br>
                            <spam>Teléfono: ${desarrollador.telefono}</spam><br>
                            <spam>Email: ${desarrollador.email}</spam><br>
                            <spam>LinkedIn: <a href="${desarrollador.linkedin}" target="_blank">${desarrollador.linkedin}</a></spam><br>
                            <spam>Habilidades: ${habilidadesTxt.join(', ')}</spam><br>
                        </p>
                        </div>
                    </div>`;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        Swal.fire('Atención', error.message, 'error');
    }
}