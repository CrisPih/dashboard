import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default function WeatherIconUI({ code }: { code: number }) {
  if (code === 0) return <WbSunnyIcon fontSize="large" />; // despejado
  if (code >= 1 && code <= 3) return <CloudIcon fontSize="large" />; // nublado
  if (code === 45 || code === 48) return <BlurOnIcon fontSize="large" />; // niebla
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return <UmbrellaIcon fontSize="large" />; // lluvia
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
    return <AcUnitIcon fontSize="large" />; // nieve
  if (code >= 95 && code <= 99) return <ThunderstormIcon fontSize="large" />; // tormenta

  return <CloudIcon fontSize="large" />;
}
