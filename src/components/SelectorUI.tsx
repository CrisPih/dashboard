import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
interface SelectorProps {
    onOptionSelect: (option: string) => void;
}

export default function Selector({ onOptionSelect }: SelectorProps) {

    const [cityInput, setCityInput] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setCityInput(value);
        onOptionSelect(value);
    };


    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>

            <Select
                labelId="city-select-label"
                id="city-simple-select"
                label="Ciudad"
                onChange={handleChange}
                value={cityInput}
            >
                <MenuItem disabled>
                    <em>Seleccione una ciudad</em>
                </MenuItem>
                <MenuItem value="Guayaquil">Guayaquil</MenuItem>
                <MenuItem value="Quito">Quito</MenuItem>
                <MenuItem value="Cuenca">Cuenca</MenuItem>

            </Select>
            {cityInput && (
                <p>
                    Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{cityInput}</span>
                </p>
            )}

        </FormControl>
    );
}
