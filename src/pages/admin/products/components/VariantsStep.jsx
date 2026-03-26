import { Field, FieldArray, useFormikContext } from 'formik'
import {
  Box, Typography, TextField,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, IconButton, Grid, Stack
} from '@mui/material'
import Iconify from 'components/base/Iconify'

const VariantsStep = () => {
  const { values, errors, touched } = useFormikContext()

  const variants = values.variants ?? []

  if (!variants.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="body2" color="text.secondary">No variants generated.</Typography>
        <Typography variant="caption" color="text.disabled">
          Go back and select at least one size and one color.
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="body2">
          All possible variants ({variants.length})
        </Typography>
      </Grid>

      <Grid size={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 80 }}>Size</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Color</TableCell>
                <TableCell sx={{ minWidth: 120 }}>MRP(₹)</TableCell>
                <TableCell sx={{ minWidth: 130 }}>Price(₹)</TableCell>
                <TableCell sx={{ minWidth: 130 }}>Stock</TableCell>
                <TableCell sx={{ minWidth: 140 }}>SKU</TableCell>
                <TableCell sx={{ minWidth: 70 }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <FieldArray name="variants">
                {({ remove }) => (
                  <>
                    {variants.map((row, index) => {
                      const vTouched = touched.variants?.[index] ?? {}
                      const vErrors  = errors.variants?.[index]  ?? {}

                      return (
                        <TableRow key={`${row.size}-${row.colorId}`}>

                          <TableCell sx={{ minWidth: 80 }}>
                            <Box sx={{
                              border: '0.5px solid',
                              borderColor: 'primary.main',
                              borderRadius: 1,
                              p: 1,
                              textAlign: 'center',
                              fontSize: 12,
                              fontWeight: 500,
                            }}>
                              {row.size}
                            </Box>
                          </TableCell>

                          <TableCell sx={{ minWidth: 100 }}>
                            <Stack direction="row" alignItems="center" spacing={0.8}>
                              <Box sx={{
                                width: 16, height: 16,
                                borderRadius: '50%',
                                bgcolor: row.colorHex,
                                border: '1px solid',
                                borderColor: 'divider',
                                flexShrink: 0,
                              }} />
                              <Typography variant="body2">{row.colorName}</Typography>
                            </Stack>
                          </TableCell>

                          <TableCell sx={{ minWidth: 120 }}>
                            <Field name={`variants[${index}].mrp`}>
                              {({ field, meta }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  size="small"
                                  error={!!(vTouched.mrp && vErrors.mrp)}
                                  helperText={vTouched.mrp && vErrors.mrp}
                                />
                              )}
                            </Field>
                          </TableCell>

                          <TableCell sx={{ minWidth: 130 }}>
                            <Field name={`variants[${index}].price`}>
                              {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    size="small"
                                    error={meta.touched && !!meta.error}
                                    helperText={meta.touched && meta.error}
                                />
                              )}
                            </Field>
                          </TableCell>

                          <TableCell sx={{ minWidth: 130 }}>
                            <Field name={`variants[${index}].stock`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  size="small"
                                  error={!!(vTouched.stock && vErrors.stock)}
                                  helperText={vTouched.stock && vErrors.stock}
                                />
                              )}
                            </Field>
                          </TableCell>

                          <TableCell sx={{ minWidth: 140 }}>
                            <Field name={`variants[${index}].sku`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  size="small"
                                  error={!!(vTouched.sku && vErrors.sku)}
                                  helperText={vTouched.sku && vErrors.sku}
                                />
                              )}
                            </Field>
                          </TableCell>

                          <TableCell sx={{ minWidth: 70 }}>
                            <IconButton color="error" onClick={() => remove(index)}>
                              <Iconify icon="solar:trash-bin-2-bold" />
                            </IconButton>
                          </TableCell>

                        </TableRow>
                      )
                    })}
                  </>
                )}
              </FieldArray>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default VariantsStep