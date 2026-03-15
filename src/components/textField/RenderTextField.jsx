import { Grid, TextField } from "@mui/material";
import { FastField } from "formik";
import { useState } from "react";

const RenderTextField = ({
    name, 
    type = 'text',
    size = 12,
    rows = '1',
    disabled,
    required,
    onChange,
    InputProps,
    label
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Grid size={size}>
            <FastField name={name}>
                {({ field, form, meta }) => {
                    const handleChange = (e) => {
                        let value = e.target.value;
                        if (type === "number") {
                            value = value.replace(/\D/g, "");
                        }
                        if (field.value === value) return;
                        if (onChange) {
                            onChange(e);
                            return;
                        }
                        form.setFieldValue(name, value, false);
                    };

                    const resolvedInputProps = InputProps
                        ? {
                            ...InputProps,
                            startAdornment: isFocused
                                ? InputProps.startAdornment
                                : null,
                            endAdornment: isFocused
                                ? InputProps.endAdornment
                                : null,
                          }
                        : undefined;

                    return (
                        <TextField 
                            {...field}
                            fullWidth
                            name={name}
                            value={field.value ?? ""}
                            multiline={rows > 1}
                            rows={rows}
                            type={type}
                            label={label}
                            disabled={disabled}
                            error={Boolean(meta.touched && meta.error)}
                            helperText={meta.touched && meta.error}
                            onChange={handleChange}
                            onBlur={(e) => {
                                field.onBlur(e);
                                setIsFocused(false);
                            }}
                            onFocus={() => setIsFocused(true)}
                            variant="outlined"
                            required={required}
                            InputProps={resolvedInputProps}
                        />
                    )
                }}
            </FastField>
        </Grid>
    )
}

export default RenderTextField;