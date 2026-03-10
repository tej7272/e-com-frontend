import { Autocomplete, TextField, Chip } from '@mui/material';

const ChipInput = ({ label, value, onChange, error, helperText }) => {
    return (
        <Autocomplete
            multiple
            freeSolo                        // ✅ allows typing custom values
            options={[]}                    // no predefined options
            value={value}                   // ["XS", "S", "M"]
            onChange={(_, newValue) => onChange(newValue)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        label={option}
                        {...getTagProps({ index })}
                        size="small"
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    error={error}
                    helperText={helperText || "Type a size and press Enter"}
                />
            )}
        />
    );
};

export default ChipInput;