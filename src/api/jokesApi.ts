import { DadJokeResponse } from '../models/interfaces.js';

const JOKES_API_1 = "https://icanhazdadjoke.com/";
const JOKES_API_2 = "https://v2.jokeapi.dev/joke/Programming,Dark,Spooky?lang=es&safe-mode";
const JOKES_API_CHUCK = "https://api.chucknorris.io/jokes/random";

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

// Función para obtener un chiste de JOKES_API_2 
export async function getJokeApi2(): Promise<string> {
    try {
        console.log('petición a la API ');
        
        const response = await fetch(JOKES_API_2, {
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log('Respuesta de la API:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(' Datos recibidos - API:', data);   
        
        if (data.type === 'single') {
            return data.joke;
        } else {
            return `${data.setup} ${data.delivery}`;
        }
    } catch (error) {
        console.error('Error fetching', error);
        return '¡Inténtalo de nuevo!';
    }
}   

// Función para obtener un chiste de JOKES_API_CHUCK                    
export async function getJokeApiChuck(): Promise<string> {
    try {
        console.log('petición a la API ');
        
        const response = await fetch(JOKES_API_CHUCK, {
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log('Respuesta de la API:', response.status, response.statusText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(' Datos recibidos - API:', data);

        // La API de Chuck Norris devuelve { value: "chiste" }
        return data.value;
    } catch (error) {
        console.error('Error fetching', error);
        return '¡Inténtalo de nuevo!';
    }
}

// Función para obtener chiste aleatorio usando switch
export const getRandomJokeWithSwitch = async (): Promise<string> => {
    try {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        
        let joke: string;
        
        switch (randomNumber) {
            case 1:
                joke = await getDadJoke();
                break;
            case 2:
                joke = await getJokeApi2();
                break;
            case 3:
                joke = await getJokeApiChuck();
                break;
            default:
                throw new Error('Número aleatorio fuera de rango');
        }
        
        return joke;
        
    } catch (error) {
        console.error('Error al obtener chiste aleatorio con switch:', error);
        throw new Error('No se pudo obtener el chiste aleatorio');
    }
};


