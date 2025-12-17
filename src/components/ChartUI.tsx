import { LineChart } from "@mui/x-charts/LineChart";
import Typography from "@mui/material/Typography";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface ChartProps {
  data: OpenMeteoResponse;
  selectedIndex: number | null;
}

export default function ChartUI({ data, selectedIndex }: ChartProps) {
  // 24 horas, cada 3 horas (8 puntos)
  const labels = data.hourly.time
    .slice(0, 24)
    .filter((_, index) => index % 3 === 0)
    .map((time) => {
      const date = new Date(time);
      return date.getHours().toString().padStart(2, "0") + ":00";
    });

  const tempValues = data.hourly.temperature_2m.slice(0, 24).filter((_, i) => i % 3 === 0);
  const windValues = data.hourly.wind_speed_10m.slice(0, 24).filter((_, i) => i % 3 === 0);

  // ✅ series “highlight” (solo un punto), para evidenciar que cambió con la tabla
  const tempHighlight: (number | null)[] = tempValues.map((v, i) =>
    selectedIndex === i ? v : null
  );
  const windHighlight: (number | null)[] = windValues.map((v, i) =>
    selectedIndex === i ? v : null
  );

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y Velocidad del Viento (pronóstico por hora)
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {selectedIndex == null
          ? "Selecciona una fila en la tabla para resaltar esa hora en el gráfico."
          : `Hora seleccionada: ${labels[selectedIndex]}`}
      </Typography>

      <LineChart
        height={300}
        xAxis={[{ scaleType: "point", data: labels }]}
        series={[
          { data: tempValues, label: "Temperatura (°C)" },
          { data: windValues, label: "Viento (m/s)" },

          // Puntos resaltados (solo 1 valor, el resto null)
          { data: tempHighlight, label: "Selección Temp", showMark: true },
          { data: windHighlight, label: "Selección Viento", showMark: true },
        ]}
      />
    </>
  );
}
