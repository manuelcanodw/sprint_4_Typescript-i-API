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