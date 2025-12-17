import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import AutoModeIcon from "@mui/icons-material/AutoMode";

type UserMode = "light" | "dark" | "auto";

interface Props {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
}

export default function ThemeToggleUI({ userMode, setUserMode }: Props) {
  const handleClick = () => {
    if (userMode === "auto") setUserMode("light");
    else if (userMode === "light") setUserMode("dark");
    else setUserMode("auto");
  };

  const modeConfig = {
    auto: {
      label: "Modo automático",
      icon: <AutoModeIcon />,
      color: "info" as const,
    },
    light: {
      label: "Modo día",
      icon: <WbSunnyIcon />,
      color: "warning" as const,
    },
    dark: {
      label: "Modo noche",
      icon: <NightsStayIcon />,
      color: "default" as const,
    },
  };

  const current = modeConfig[userMode];

  return (
    <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* Etiqueta visible */}
        <Chip
          icon={current.icon}
          label={current.label}
          color={current.color}
          variant="filled"
        />

        {/* Botón */}
        <IconButton color="inherit" onClick={handleClick}>
          {current.icon}
        </IconButton>
      </Stack>
    </Box>
  );
}
