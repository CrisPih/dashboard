import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// 1. Diccionario de coordenadas
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
    Quito: { latitude: -0.1807, longitude: -78.4678 },
    Cuenca: { latitude: -2.9006, longitude: -79.0045 },
};

export default function useFetchData(
    selectedOption: string | null
): OpenMeteoResponse | null | undefined {

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {
        const cityConfig =
            selectedOption != null
                ? CITY_COORDS[selectedOption]
                : CITY_COORDS["Guayaquil"];

        // **CORREGIDO: URL dinámica**
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedOption]);

    return data;
}
