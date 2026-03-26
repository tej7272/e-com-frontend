import { useFormikContext } from 'formik'
import { useSelector } from 'react-redux'
import {
  Box, TextField, Autocomplete, Chip,
  CircularProgress, Typography, Grid
} from '@mui/material'
import { buildVariants } from '../utils/buildVariants'
// import { buildVariants } from 'utils/buildVariants'

const OrganisationStep = () => {
  const { values, errors, touched, handleBlur, setFieldValue } = useFormikContext()

  const formConfig = useSelector(state => state.formConfig.data)
  const isLoading  = useSelector(state => state.formConfig.status === 'loading')

  const categories = formConfig?.categories  || []
  const brands = formConfig?.brands || []
  const colors = formConfig?.colors || []

  const subCategories = values.category
    ? (formConfig?.subCategories || []).filter(
        s => s.category._id === values.category
      )
    : []

  const selectedSubCategory = subCategories.find(s => s._id === values.subCategory)
  const availableSizes = selectedSubCategory?.sizeGroup?.sizes || []


  const handleCategoryChange = (val) => {
    setFieldValue('category', val?._id ?? '')
    setFieldValue('subCategory', '')
    setFieldValue('sizes', [])
    setFieldValue('colors', [])
    setFieldValue('variants', [])
  }

  const handleSubCategoryChange = (val) => {
    const newSizes = val?.sizeGroup?.sizes ?? []
    setFieldValue('subCategory', val?._id ?? '')
    setFieldValue('sizes', newSizes)
    setFieldValue('variants',  buildVariants(newSizes, values.colors))
  }

  const handleSizeToggle = (size) => {
    const isSelected = values.sizes.includes(size)
    const newSizes = isSelected
      ? values.sizes.filter(s => s !== size)
      : [...values.sizes, size]

    setFieldValue('sizes', newSizes)
    setFieldValue('variants', buildVariants(newSizes, values.colors))
  }

  const handleColorToggle = (color) => {
    const isSelected = values.colors.some(c => c._id === color._id)
    const newColors  = isSelected
      ? values.colors.filter(c => c._id !== color._id)
      : [...values.colors, color]

    setFieldValue('colors',   newColors)
    setFieldValue('variants', buildVariants(values.sizes, newColors))
  }

  return (
    <Grid container spacing={3}>

      <Grid size={6}>
        <Autocomplete
          options={brands}
          getOptionLabel={(o) => o.name}
          value={brands.find(b => b._id === values.brand) ?? null}
          loading={isLoading}
          isOptionEqualToValue={(o, v) => o._id === v._id}
          onChange={(_, val) => setFieldValue('brand', val?._id ?? '')}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Brand"
              error={touched.brand && !!errors.brand}
              helperText={touched.brand && errors.brand}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading && <CircularProgress size={16} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>

      <Grid size={6}>
        <Autocomplete
          options={categories}
          getOptionLabel={(o) => o.name}
          value={categories.find(c => c._id === values.category) ?? null}
          loading={isLoading}
          isOptionEqualToValue={(o, v) => o._id === v._id}
          onChange={(_, val) => handleCategoryChange(val)}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              error={touched.category && !!errors.category}
              helperText={touched.category && errors.category}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading && <CircularProgress size={18} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>

      {values.category && (
        <Grid size={12}>
          <Autocomplete
            options={subCategories}
            getOptionLabel={(o) => o.name}
            value={subCategories.find(c => c._id === values.subCategory) ?? null}
            loading={isLoading}
            disabled={!values.category}
            isOptionEqualToValue={(o, v) => o._id === v._id}
            onChange={(_, val) => handleSubCategoryChange(val)}
            onBlur={handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sub-category"
                placeholder={!values.category ? 'Select a category first' : ''}
                error={touched.subCategory && !!errors.subCategory}
                helperText={touched.subCategory && errors.subCategory}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading && <CircularProgress size={16} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>
      )}

      {values.subCategory && (
        <Grid size={12}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Available sizes
          </Typography>

          {availableSizes.length === 0 ? (
            <Typography variant="caption" color="text.disabled">
              No size group linked to this sub-category
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {availableSizes.map((size) => {
                const isSelected = values.sizes.includes(size)
                return (
                  <Chip
                    key={size}
                    label={size}
                    variant={isSelected ? 'filled' : 'outlined'}
                    color={isSelected ? 'primary' : 'default'}
                    onClick={() => handleSizeToggle(size)}
                    sx={{ cursor: 'pointer', py: 2.5, px: 1.5 }}
                  />
                )
              })}
            </Box>
          )}

          {touched.sizes && errors.sizes && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
              {errors.sizes}
            </Typography>
          )}
        </Grid>
      )}

      {/* ── Colors ── */}
      <Grid size={12}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Colors
        </Typography>

        {isLoading ? <CircularProgress size={18} /> : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {colors.map((color) => {
              const isSelected = values.colors.some(c => c._id === color._id)
              return (
                <Chip
                  key={color._id}
                  variant={isSelected ? 'filled' : 'outlined'}
                  color={isSelected ? 'primary' : 'default'}
                  onClick={() => handleColorToggle(color)}
                  sx={{ cursor: 'pointer', py: 2.5, px: 1.5 }}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <Box sx={{
                        width: 18, height: 18,
                        borderRadius: '50%',
                        bgcolor: color.hex,
                        border: '0.5px solid',
                        borderColor: 'divider',
                        flexShrink: 0,
                      }} />
                      {color.name}
                    </Box>
                  }
                />
              )
            })}
          </Box>
        )}

        {touched.colors && errors.colors && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
            {errors.colors}
          </Typography>
        )}
      </Grid>

    </Grid>
  )
}

export default OrganisationStep