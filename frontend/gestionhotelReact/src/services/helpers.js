export function filterResults(habitaciones, search) {
    return !search ? habitaciones : habitaciones.filter((habitacion) => habitacion.tipo.toLowerCase().includes(search.toLowerCase()));
}