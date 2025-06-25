// Interfaz espuesta de la API  icanhazdadjoke
export interface DadJokeResponse {
    id: string;
    joke: string;
    status: number;
}

// Interfaz - reporte de chistes
export interface JokeReport {
    joke: string;
    score: number;
    date: string;
}

// Interfaz para la respuesta del clima de OpenWeatherMap
export interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    sys: {
        country: string;
    };
}

export interface Config {
    OPENWEATHER_API_KEY: string;
    CITY_NAME: string;
    PORT: number;
} 