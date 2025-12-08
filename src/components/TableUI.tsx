import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface Props {
  data: OpenMeteoResponse;
}


function combineArrays(labels: string[], tempValues: number[], windValues: number[]) {
  return labels.map((label, index) => ({
    id: index,
    label,
    temperatura: tempValues[index],
    viento: windValues[index],
  }));
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },

  {
    field: 'label',
    headerName: 'Fecha / Hora',
    width: 180,
  },

  {
    field: 'temperatura',
    headerName: 'Temperatura (°C)',
    width: 150,
  },

  {
    field: 'viento',
    headerName: 'Viento (m/s)',
    width: 150,
  },

  {
    field: 'resumen',
    headerName: 'Resumen',
    width: 220,
    sortable: false,
    hideable: false,
    valueGetter: (_, row) =>
      `${row.label} → ${row.temperatura}°C, ${row.viento} m/s`,
  },
];

export default function TableUI({ data }: Props) {
  const rows = combineArrays(
    data.hourly.time.slice(0,10),
    data.hourly.temperature_2m.slice(0,10),
    data.hourly.wind_speed_10m.slice(0,10)
  );

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
