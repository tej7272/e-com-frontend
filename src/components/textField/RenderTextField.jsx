import { Grid, TextField } from "@mui/material";
import { Field } from "formik";

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
            <Field name={name}>
                {({ field, form, meta }) => {
                    const handleChange = (e) => {
                        let value = e.target.value;

                        if(type === 'number'){
                            value = value.replace(/\D/g, '')
                        }
                        form.setFieldValue(name, value);
                        onChange?.(e);
                    }
                    return (
                        <TextField 
                            {...field}
                            fullWidth
                            name= {name}
                            multiline = {rows > 1}
                            rows = {rows}
                            type= {type}
                            label= {label}
                            disabled={disabled}
                            error={Boolean(meta.touched && meta.error)}
                            helperText={meta.touched && meta.error}
                            onChange = {handleChange}
                            variant="outlined"
                            required= {required}
                            InputProps={{readOnly}}
                        />
                    )
                }}

            </Field>
        </Grid>
    )
}

export default RenderTextField;