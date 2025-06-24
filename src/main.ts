import { getDadJoke } from './api/jokesApi.js';
import { JokeReport } from './models/interfaces.js';

// Array para almacenar los reportes de chistes
const reportAcudits: JokeReport[] = [];

// Variables globales
let currentJoke: string = '';

// Elementos del DOM
const chiste = document.getElementById('chiste') as HTMLParagraphElement;
const btn = document.getElementById('btn') as HTMLButtonElement;
const votacion = document.getElementById('votacion') as HTMLDivElement;
const formVotacion = document.getElementById('form-votacion') as HTMLFormElement;
const radioInputs = document.querySelectorAll('input[name="score"]') as NodeListOf<HTMLInputElement>;

console.log('Aplicación iniciada');

// Función para guardar el reporte del chiste actual
const guardarReporte = (): void => {
    // Obtener la votación seleccionada actualmente
    const selectedRadio = document.querySelector('input[name="score"]:checked') as HTMLInputElement;
    
    if (currentJoke && selectedRadio) {
        const currentScore = parseInt(selectedRadio.value);
        const reporte: JokeReport = {
            joke: currentJoke,
            score: currentScore,
            date: new Date().toISOString()
        };
        
        // Buscar si ya existe un reporte para este chiste
        const index = reportAcudits.findIndex(report => report.joke === currentJoke);
        
        if (index !== -1) {
            // Actualizar el reporte existente
            reportAcudits[index] = reporte;
        } else {
            // Agregar nuevo reporte
            reportAcudits.push(reporte);
        }
        
        console.log('Reporte guardado:', reporte);
        console.log('Array completo de reportes:', reportAcudits);
    }
};

// Función para cargar un chiste
const cargarChiste = async (): Promise<void> => {
    try {
        console.log('Iniciando carga de chiste...');
        chiste.innerText = 'Loading joke......';
        
        // Guardar el reporte del chiste anterior si existe
        guardarReporte();
        
        const joke = await getDadJoke();
        currentJoke = joke;
        chiste.innerText = joke;
        
        // Mostrar formulario de votación
        votacion.style.display = 'block';
        
        // Desmarcar todos los radio buttons
        radioInputs.forEach(radio => {
            radio.checked = false;
        });
        
        console.log('Chiste cargado exitosamente en la UI');
    } catch (error) {
        console.error('Error al cargar el chiste:', error);
        chiste.innerText = 'Error al cargar el chiste. Inténtalo de nuevo.';
    }
};

// Cargar un chiste al abrir la aplicación
console.log('Cargando chiste inicial...');
cargarChiste();

// Evento para cargar un chiste nuevo
btn.addEventListener("click", async (e: Event) => {
    e.preventDefault();
    console.log('Botón evento- chiste');
    await cargarChiste();
});