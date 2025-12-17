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

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import useAutoThemeMode from "./functions/useAutoThemeMode";

function App() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dataFetcherOutput = useFetchData(selectedOption);

    // ✅ estado que controla el gráfico (criterio 10 pts)
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
                        <AlertUI description="No se preveen lluvias" />
                    </Grid>

                    {/* Selector */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <SelectorUI
                            onOptionSelect={(city) => {
                                setSelectedOption(city);
                                setSelectedIndex(null); // reset selección al cambiar ciudad
                            }}
                        />
                    </Grid>

                    {/* Indicadores */}
                    <Grid container size={{ xs: 12, md: 9 }}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <IndicatorUI
                                    title="Temperatura (2m)"
                                    description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`}
                                />
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <IndicatorUI
                                    title="Temperatura aparente"
                                    description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`}
                                />
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <IndicatorUI
                                    title="Velocidad del viento"
                                    description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`}
                                />
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            {dataFetcherOutput && (
                                <IndicatorUI
                                    title="Humedad relativa"
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
                                        ).getHours().toString().padStart(2, "0")
                                        }:00 se espera una temperatura de ${dataFetcherOutput.hourly.temperature_2m[selectedIndex * 3]
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
