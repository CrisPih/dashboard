import { useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark";
type UserMode = Mode | "auto";

function getModeByHour(date = new Date()): Mode {
  const h = date.getHours();
  return h >= 6 && h < 18 ? "light" : "dark";
}

export default function useAutoThemeMode() {
  const [userMode, setUserMode] = useState<UserMode>("auto");
  const [autoMode, setAutoMode] = useState<Mode>(getModeByHour());

  useEffect(() => {
    const id = setInterval(() => {
      setAutoMode(getModeByHour());
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const mode: Mode = userMode === "auto" ? autoMode : userMode;
  const isNight = mode === "dark";

  return {
    mode,
    isNight,
    userMode,
    setUserMode,
  };
}
