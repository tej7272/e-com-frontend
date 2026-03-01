import { Grid, TextField } from "@mui/material";
import { FastField } from "formik";

const RenderTextField = ({
    name, 
    type= 'text',
    size= 12,
    rows = '1',
    disabled,
    required,
    onChange,
    readOnly,
    label
}) => {

    
    return (
        <Grid size={size} >
            <FastField name={name}>
                {({ field, form, meta }) => {
                    const handleChange = (e) => {
                        let value = e.target.value;

                        if (type === "number") {
                            value = value.replace(/\D/g, "");
                        }

                        // Avoid redundant writes; writing the same value repeatedly can cause render loops.
                        if (field.value === value) return;

                        // If caller provides custom onChange, delegate to it; otherwise update Formik directly.
                        if (onChange) {
                            onChange(e);
                            return;
                        }
                        form.setFieldValue(name, value, false);
                    };
                    return (
                        <TextField 
                            {...field}
                            fullWidth
                            name= {name}
                            value={field.value ?? ""}
                            multiline = {rows > 1}
                            rows = {rows}
                            type= {type}
                            label= {label}
                            // size="medium"
                            disabled={disabled}
                            error={Boolean(meta.touched && meta.error)}
                            helperText={meta.touched && meta.error}
                            onChange = {handleChange}
                            onBlur={field.onBlur}
                            variant="outlined"
                            required= {required}
                            InputProps={{readOnly}}
                        />
                    )
                }}

            </FastField>
        </Grid>
    )
}

export default RenderTextField;
