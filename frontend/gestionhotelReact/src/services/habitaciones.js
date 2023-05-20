const API_URL = 'http://localhost:8000'

// Fetching Data habitaciones
export async function getHabitaciones() {
    try{ 
        const response = await fetch(`${API_URL}/habitaciones/`);
        const data = await response.json()
        return data;
    } catch(error){
        console.error(error);
    }
}

// Fetching Data reservas
export async function getReservas() {
    try{ 
        const response = await fetch(`${API_URL}/reservas/`);
        const data = await response.json()
        return data;
    } catch(error){
        console.error(error);
    }
}

