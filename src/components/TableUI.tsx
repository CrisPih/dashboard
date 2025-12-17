import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
  type GridRowSelectionModel,
  type GridRowId,
} from "@mui/x-data-grid";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface Props {
  data: OpenMeteoResponse;
  selectedIndex: number | null;
  onSelectIndex: (index: number | null) => void;
}

type Row = {
  id: number;
  label: string;
  temperatura: number;
  viento: number;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "label", headerName: "Hora", width: 120 },
  { field: "temperatura", headerName: "Temperatura (°C)", width: 160 },
  { field: "viento", headerName: "Viento (m/s)", width: 140 },
];

function toHourLabel(iso: string) {
  const d = new Date(iso);
  return d.getHours().toString().padStart(2, "0") + ":00";
}

export default function TableUI({ data, selectedIndex, onSelectIndex }: Props) {
  // 24h → cada 3h (8 filas)
  const times = data.hourly.time.slice(0, 24).filter((_, i) => i % 3 === 0);
  const temps = data.hourly.temperature_2m.slice(0, 24).filter((_, i) => i % 3 === 0);
  const winds = data.hourly.wind_speed_10m.slice(0, 24).filter((_, i) => i % 3 === 0);

  const rows: Row[] = times.map((t, i) => ({
    id: i,
    label: toHourLabel(t),
    temperatura: temps[i],
    viento: winds[i],
  }));

  const handleRowClick = (params: GridRowParams) => {
    onSelectIndex(Number(params.id));
  };

  // ✅ Modelo de selección (API nueva: { type, ids })
  const rowSelectionModel: GridRowSelectionModel = {
    type: "include",
    ids: new Set<GridRowId>(selectedIndex !== null ? [selectedIndex] : []),
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleRowClick}
        rowSelectionModel={rowSelectionModel}
        disableRowSelectionOnClick={false}
        pageSizeOptions={[8]}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
      />
    </Box>
  );
}
