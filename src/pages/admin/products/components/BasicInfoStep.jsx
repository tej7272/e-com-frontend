import { Autocomplete, Chip, FormControlLabel, Grid, Switch, TextField } from '@mui/material'
import RenderTextField from 'components/textField/RenderTextField'
import { useFormikContext } from 'formik'
import { useSelector } from 'react-redux'

const BasicInfoStep = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext() 
  const formConfig = useSelector(state => state.formConfig.data)

  return (
    <Grid container spacing={3} my={2}>

      <RenderTextField
        name="name"
        label="Name"
        size={6}
        required
      />

      <Grid size={6}>
        <FormControlLabel
          control={
            <Switch
              checked={values.isActive}
              onChange={(e) => setFieldValue('isActive', e.target.checked)}
              name="isActive"
            />
          }
          label="Active"
        />
      </Grid>

      <Grid size={12}>
        <Autocomplete
          multiple
          options={formConfig?.tags ?? []}
          getOptionLabel={(o) => o.name}
          value={(formConfig?.tags ?? []).filter(t => values.tags.includes(t.value))}
          isOptionEqualToValue={(o, v) => o.value === v.value}
          onChange={(_, selected) => setFieldValue('tags', selected.map(t => t.value))}
          renderTags={(selected, getTagProps) =>
            selected.map((tag, index) => (
              <Chip
                {...getTagProps({ index })}
                key={tag.value}
                label={tag.name}
                size="small"
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Add tags..."
              error={touched.tags && !!errors.tags}
              helperText={touched.tags && errors.tags}
            />
          )}
        />
      </Grid>

      <RenderTextField
        name="description"
        label="Description"
        size={12}
        rows={3}
        required
      />

    </Grid>
  )
}

export default BasicInfoStep