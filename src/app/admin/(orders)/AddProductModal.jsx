import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  Button,
  Grid,
  Box,
  Select,
  Stack,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Avatar
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { Formik, Form, Field } from 'formik';
import RenderTextField from "../../../components/textField/RenderTextField";
import { X, Plus } from 'lucide-react';
// import CustomIcon from "../../../components/Icons/Icon";
import master from "../master.json";



const AddProductModal = ({ open, onClose, selectedData }) => {

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth='sm'
    >
      <DialogTitle id="scroll-dialog-title">
        <Stack direction='row' justifyContent="space-between" alignItems='center'>
          <Box display="flex" flexDirection='row' alignItems= 'center' gap={.5}>
            {/* <CustomIcon icon={Plus} size={18}/> */}+
            <Typography variant="h6" fontWeight='600' >
              {selectedData?.id ? 'Update Product' : 'Add new product'}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            {/* <CustomIcon icon ={X} size={18}/> */}X
          </IconButton>

        </Stack>
       
      </DialogTitle>

      <Divider />

      <Formik
       initialValues={{ 
        title: selectedData?.title ?? "",
        price: selectedData?.price ?? "",
        category: selectedData?.category ?? "", 
        slug: selectedData?.slug ?? "", 
        sku: selectedData?.sku ?? "", 
        brand: selectedData?.brand ?? "", 
        stockStatus: selectedData?.stockStatus ?? "", 
        quantity: selectedData?.quantity ?? "", 
        itemPics: selectedData?.itemPics ?? [], 
        color: selectedData?.color ?? '', 
        sizes: selectedData?.sizes ?? [], 
        description: selectedData?.description ?? '', 
      }}
       validationSchema={null}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
        {({ values, isSubmitting, errors, touched, handleChange, setFieldValue }) => {
            // Formik render-props must be destructured from a single object.
            return (
                <Form>
                    <DialogContent sx={{maxHeight: '65vh'}}>
                        <Grid container spacing={2} sx={{}}>
                            <RenderTextField 
                              name= 'title'
                              label = "Title"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'price'
                              label = "Price"
                              size={4}
                            />

                            <Grid size={4}>
                              <Field name="category">
                                {(field) => {
                                  return (
                                    <FormControl required size="small" fullWidth>
                                      <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value=""
                                        label="Category"
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                      </Select>
                                      {/* <FormHelperText>Required</FormHelperText> */}
                                    </FormControl>
                                  )
                                }}

                              </Field>
                            </Grid>

                            <RenderTextField 
                              name= 'slug'
                              label = "Slug"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'sku'
                              label = "SKU"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'brand'
                              label = "Brand"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'stockStatus'
                              label = "Stock Status"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'quantity'
                              label = "Quantity"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'colors'
                              label = "Colors"
                              size={4}
                            />

                            <Grid size={4}>
                              <Field name='colors'>
                                {({ field, form, meta }) => (
                                  <TextField
                                    // {...field}
                                    type="color"
                                    label='Color'
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => form.setFieldValue('colors', e.target.value)}
                                    error={Boolean(meta.touched && meta.error)}
                                    helperText={meta.touched && meta.error}
                                  />
                                )}
                              </Field>
                            </Grid>

                            <Grid size={4}>
                              <RadioGroup
                                row
                                value={values.color}
                                onChange={(e) => setFieldValue("color", e.target.value)}
                              >
                                {master.color.map((hex) => (
                                  <FormControlLabel
                                    key={hex.id}
                                    value={hex.id}
                                    control={<Radio sx={{ display: "none" }} />} // hide native radio if you like
                                    label={<Avatar sx={{ width: 28, height: 28, bgcolor: hex.title }} />}
                                  />
                                ))}
                              </RadioGroup>
                            </Grid>

                            <RenderTextField 
                              name= 'sizes'
                              label = "Sizes"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'description'
                              label = "Description"
                              rows = '2'
                              size={12}
                            />
                            
                        </Grid>
                    </DialogContent>

                    <Divider />

                    <DialogActions>
                      <Stack direction='row' spacing= {1} justifyContent= 'flex-end' sx={{p: 2}}>
                        <Button type="button" variant="outlined" onClick={onClose}>Cancel</Button>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting} sx={{mr: 2}}>Subscribe</LoadingButton>
                      </Stack>
                    </DialogActions>
                </Form>
                )} 
            }
        </Formik>
    </Dialog>
  );
};

export default AddProductModal;
