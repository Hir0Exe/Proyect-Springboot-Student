//======================Variables Globales===========================================



//====================================================================================
///===================== Peticiones ==================================================

function saveDesarrollador(data) {
    return fetch('./mainController/desarrollador', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
    });
}

//====================================================================================

async function saveDevelopment() {
    if (validateSaveDevelopment()) {
        const data = armarDesarrollador();
        try {
            const response = await saveDesarrollador(data);
            if (!response.ok) throw new Error('Error al guardar el desarrollador');
            $('#modalTarjeta').modal('hide');
            document.getElementById('limpiarFormulario').click();
            Swal.fire('Atención', 'Guardado exitosamente', 'success');
        } catch (error) {
            Swal.fire('Atención', error.message, 'error');
        }
    }
}

function validateSaveDevelopment() {
    return true;
}

function armarDesarrollador() {
    let habilidades = [];
    const contenedor = document.getElementById('habilidadesSeleccionadas').querySelector('ul');
    Array.from(contenedor.children).map(option => habilidades.push({id: option.value}));
    return {
        desarrollador: {
            nombre: document.getElementById('nombre').value || null,
            profesion: document.getElementById('profesion').value || null,
            telefono: document.getElementById('telefono').value || null,
            email: document.getElementById('email').value || null,
            linkedin: document.getElementById('linkedin').value || null,
        },
        habilidades
    };
}