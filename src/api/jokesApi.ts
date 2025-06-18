import { DadJokeResponse } from '../models/interfaces.js';

const JOKES_API_1 = "https://icanhazdadjoke.com/";


// Función para obtener un chiste de icanhazdadjoke.com
export async function getDadJoke(): Promise<string> {
    try {
        console.log('petición a la API ');
        
        const response = await fetch(JOKES_API_1, {
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log('Respuesta de la API:', response.status, response.statusText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: DadJokeResponse = await response.json();
        console.log(' Datos recibidos - API:', data);
        
        
        return data.joke;
    } catch (error) {
        console.error('Error fetching', error);
        return '¡Inténtalo de nuevo!';
    }
}






