import { getDadJoke } from './api/jokesApi.js';

const chiste = document.getElementById('chiste') as HTMLParagraphElement;
const btn = document.getElementById('btn') as HTMLButtonElement; 

console.log('Aplicación iniciada');

// Función para cargar un chiste
async function cargarChiste() {
    try {
        console.log('Iniciando carga de chiste...');
        chiste.innerText = 'Loading joke......';
        const joke = await getDadJoke();
        chiste.innerText = joke;
        console.log('Chiste cargado exitosamente en la UI');
    } catch (error) {
        console.error('Error al cargar el chiste:', error);
        chiste.innerText = 'Error al cargar el chiste. Inténtalo de nuevo.';
    }
}

// Cargar un chiste al abrir la aplicación
console.log('Cargando chiste inicial...');
cargarChiste();

// Evento para cargar un chiste nuevo
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('Botón evento- chiste');
    await cargarChiste();
});
