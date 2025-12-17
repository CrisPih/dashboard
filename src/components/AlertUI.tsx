import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";

interface AlertConfig {
  description: string;
  severity?: AlertColor; // "success" | "info" | "warning" | "error"
}

export default function AlertUI({ description, severity = "success" }: AlertConfig) {
  return (
    <Alert
      variant="standard"
      severity={severity}
      sx={{ textAlign: "center", justifyContent: "center" }}
    >
      {description}
    </Alert>
  );
}
