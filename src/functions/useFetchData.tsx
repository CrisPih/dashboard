import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(): OpenMeteoResponse | null | undefined {

    const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago";

    const [data, setData] = useState<OpenMeteoResponse>();

        useEffect(() => {
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
    }, []);  
    return data;

}