import { WeatherResponse } from '../models/interfaces.js';
import { config } from '../config.js';

export const getWeather = async (): Promise<WeatherResponse> => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${config.CITY_NAME}&APPID=${config.OPENWEATHER_API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.status}`);
        }

        const data: WeatherResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener el clima de ${config.CITY_NAME}:`, error);
        throw new Error(`No se pudo obtener el clima de ${config.CITY_NAME}`);
    }
}; 