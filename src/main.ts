import { getRandomJokeWithSwitch } from './api/jokesApi.js';
import { getWeather } from './api/weatherApi.js';
import { JokeReport } from './models/interfaces.js';

// Array para almacenar los reportes de chistes
const reportAcudits: JokeReport[] = [];

// Variables globales
let currentJoke: string = '';

// Elementos del DOM
const chiste = document.getElementById('chiste') as HTMLParagraphElement;
const btn = document.getElementById('btn') as HTMLButtonElement;
const votacion = document.getElementById('votacion') as HTMLDivElement;
const radioInputs = document.querySelectorAll('input[name="score"]') as NodeListOf<HTMLInputElement>;
const weatherInfo = document.getElementById('weather-info') as HTMLDivElement;
const cityName = document.getElementById('city-name') as HTMLDivElement;
const magicPatternContainer = document.querySelector('.magic-pattern-container') as HTMLDivElement;

console.log('Aplicación iniciada');

// Array con todas las URLs de SVG amarillas de Magic Pattern
const magicPatternUrls = [
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M852 692Q722 884 524 842.5t-360-192Q2 500 165.5 351.5t341.5-160Q685 180 833.5 340T852 692Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f6f745%22 d=%22M852 692Q722 884 524 842.5t-360-192Q2 500 165.5 351.5t341.5-160Q685 180 833.5 340T852 692Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M803 704.5Q736 909 508.5 894T155 689.5Q29 500 145.5 294T457 162q195 74 304 206t42 336.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f6f745%22 d=%22M803 704.5Q736 909 508.5 894T155 689.5Q29 500 145.5 294T457 162q195 74 304 206t42 336.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M787 647Q670 794 506 784T193.5 637Q45 500 151.5 290t317-154.5q210.5 55.5 323 210T787 647Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f6f745%22 d=%22M787 647Q670 794 506 784T193.5 637Q45 500 151.5 290t317-154.5q210.5 55.5 323 210T787 647Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M746.5 652Q675 804 468 859T190.5 707q-70.5-207 21-377.5T504 152q201-7 257.5 170.5t-15 329.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f6f745%22 d=%22M746.5 652Q675 804 468 859T190.5 707q-70.5-207 21-377.5T504 152q201-7 257.5 170.5t-15 329.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M804 630.5Q651 761 494 772T196.5 641.5Q56 500 176 323t332-190.5q212-13.5 330.5 177t-34.5 321Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f6f745%22 d=%22M804 630.5Q651 761 494 772T196.5 641.5Q56 500 176 323t332-190.5q212-13.5 330.5 177t-34.5 321Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M839.5 706Q738 912 535.5 850.5t-290-206Q158 500 220 311t255-145q193 44 329.5 189t35 351Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f6f745%22 d=%22M839.5 706Q738 912 535.5 850.5t-290-206Q158 500 220 311t255-145q193 44 329.5 189t35 351Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
];

// Función para obtener un patrón aleatorio
const randomPattern = (): string => {
    const randomIndex = Math.floor(Math.random() * magicPatternUrls.length);
    return magicPatternUrls[randomIndex];
};

// Función para cambiar el fondo del contenedor Magic Pattern
const cambiarFondoMagicPattern = (): void => {
    const selectedPattern = randomPattern();
    
    console.log(`Cambiando fondo a patrón ${magicPatternUrls.indexOf(selectedPattern) + 1}`);
    
    magicPatternContainer.style.backgroundImage = `url("${selectedPattern}")`;
};

// Función para cargar y mostrar el clima
const cargarClima = async (): Promise<void> => {
    try {
        console.log('Cargando información meteorológica...');
        const weather = await getWeather();
        
        // Actualizar nombre de la ciudad
        cityName.textContent = weather.name;
        
        weatherInfo.innerHTML = `
            <div class="weather-item">
                <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Clima" class="weather-icon">
                <span class="weather-value">${Math.round(weather.main.temp)}°C</span>
            </div>
            <div class="weather-item">
                <span>💨</span>
                <span class="weather-value">${Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div class="weather-item">
                <span>💧</span>
                <span class="weather-value">${weather.main.humidity}%</span>
            </div>
        `;
        
        console.log('Información meteorológica cargada exitosamente');
    } catch (error) {
        console.error('Error al cargar el clima:', error);
        weatherInfo.innerHTML = '<span>No se pudo cargar el clima</span>';
    }
};

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
        
        // Cambiar el fondo del contenedor Magic Pattern
        cambiarFondoMagicPattern();
        
        chiste.innerText = 'Loading joke......';
        
        // Guardar el reporte del chiste anterior si existe
        guardarReporte();
        
        const joke = await getRandomJokeWithSwitch();
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

// Cargar clima y chiste al abrir la aplicación
console.log('Iniciando aplicación...');
cargarClima();
cargarChiste();

// Evento para cargar un chiste nuevo
btn.addEventListener("click", async (e: Event) => {
    e.preventDefault();
    console.log('Botón evento- chiste');
    await cargarChiste();
});