function calcularEdadAnios(fechaNacimiento) {
    const fecha = new Date(fechaNacimiento);
    const today = new Date();
    return today.getFullYear() - fecha.getFullYear() -
        (today.getMonth() < fecha.getMonth() ||
            (today.getMonth() === fecha.getMonth() && today.getDate() < fecha.getDate())
    );
}