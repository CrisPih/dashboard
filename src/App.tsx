import "./App.css";
import { Grid } from "@mui/material";
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from "./components/SelectorUI";
import IndicatorUI from "./components/IndicatorUI";
import useFetchData from "./functions/useFetchData";
import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";
import { useState, useMemo } from "react";
import ThemeToggleUI from "./components/ThemeToggleUI";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WeatherIconUI from "./components/WeatherIconUI";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import useAutoThemeMode from "./functions/useAutoThemeMode";

import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";

function App() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dataFetcherOutput = useFetchData(selectedOption);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { mode, userMode, setUserMode } = useAutoThemeMode();

    const theme = useMemo(
        () =>
            createTheme({
                palette: { mode },
            }),
        [mode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeToggleUI userMode={userMode} setUserMode={setUserMode} />

            <div>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    {/* Encabezado */}
                    <Grid size={{ xs: 12, md: 12 }}>
                        <HeaderUI />
                    </Grid>

                    {/* Alertas */}
                    <Grid container justifyContent="right" alignItems="center">
                        {dataFetcherOutput && (() => {
                            const code = dataFetcherOutput.current.weathercode;

                            // Mensaje según weathercode (aprox, suficiente y entendible)
                            const isRain =
                                (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
                            const isStorm = code >= 95 && code <= 99;
                            const isFog = code === 45 || code === 48;

                            if (isStorm) {
                                return <AlertUI severity="error" description="Tormenta probable. Toma precauciones." />;
                            }
                            if (isRain) {
                                return <AlertUI severity="warning" description="Posibles lluvias. Considera llevar paraguas." />;
                            }
                            if (isFog) {
                                return <AlertUI severity="info" description="Posible niebla. Maneja con precaución." />;
                            }
                            return <AlertUI severity="success" description="No se prevén lluvias." />;
                        })()}
                    </Grid>


                    {/* Selector */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <SelectorUI
                            onOptionSelect={(city) => {
                                setSelectedOption(city);
                                setSelectedIndex(null);
                            }}
                        />
                    </Grid>

                    {/* Indicadores */}
                    <Grid container size={{ xs: 12, md: 9 }}>
                        {/* Temperatura con icono dinámico por weathercode */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <WeatherIconUI code={dataFetcherOutput.current.weathercode} />

                                            <Box>
                                                <Typography variant="h5" component="div">
                                                    {dataFetcherOutput.current.temperature_2m}{" "}
                                                    {dataFetcherOutput.current_units.temperature_2m}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Temperatura (2m)
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>

                        {/* Temperatura aparente */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <IndicatorUI
                                    icon={<ThermostatIcon />}
                                    title="Temperatura aparente"
                                    description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`}
                                />
                            )}
                        </Grid>

                        {/* Viento */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <IndicatorUI
                                    icon={<AirIcon />}
                                    title="Velocidad del viento"
                                    description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`}
                                />
                            )}
                        </Grid>

                        {/* Humedad */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <IndicatorUI
                                    icon={<OpacityIcon />}
                                    title="Humedad relativa actual del clima"
                                    description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`}
                                />
                            )}
                        </Grid>
                    </Grid>

                    {/* Gráfico */}
                    <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                        {dataFetcherOutput && (
                            <ChartUI data={dataFetcherOutput} selectedIndex={selectedIndex} />
                        )}
                    </Grid>

                    {/* Tabla */}
                    <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                        {dataFetcherOutput && (
                            <TableUI
                                data={dataFetcherOutput}
                                selectedIndex={selectedIndex}
                                onSelectIndex={setSelectedIndex}
                            />
                        )}
                    </Grid>

                    {/* Información adicional */}
                    <Grid size={{ xs: 12, md: 12 }}>
                        {dataFetcherOutput && (
                            <AlertUI
                                description={
                                    selectedIndex === null
                                        ? "Selecciona una hora en la tabla para ver un resumen detallado del clima."
                                        : `A las ${new Date(
                                            dataFetcherOutput.hourly.time[selectedIndex * 3]
                                        )
                                            .getHours()
                                            .toString()
                                            .padStart(2, "0")}:00 se espera una temperatura de ${dataFetcherOutput.hourly.temperature_2m[selectedIndex * 3]
                                        } °C y una velocidad del viento de ${dataFetcherOutput.hourly.wind_speed_10m[selectedIndex * 3]
                                        } m/s.`
                                }
                            />
                        )}
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default App;
