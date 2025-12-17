import Alert from "@mui/material/Alert";

interface AlertConfig {
  description: string;
}

export default function AlertUI({ description }: AlertConfig) {
  return (
    <Alert
      variant="standard"
      severity="success"
      sx={{
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      {description}
    </Alert>
  );
}
