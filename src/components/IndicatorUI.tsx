import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface IndicatorUIProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}


export default function IndicatorUI({
  title,
  description,
  icon,
}: IndicatorUIProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {icon && <Box>{icon}</Box>}

          <Box>
            <Typography variant="h5" component="div">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
