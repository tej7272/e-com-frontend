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
  Checkbox,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { Formik, Form, Field } from 'formik';
import RenderTextField from "../../../components/textField/RenderTextField";
import { X, Plus } from 'lucide-react';
// import CustomIcon from "../../../components/Icons/Icon";
import { useDispatch, useSelector } from 'react-redux';



const AddProductModal = ({ open, onClose, selectedData }) => {
  const dispatch = useDispatch()

  const master = useSelector((state) => state.master.data);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth='md'
    >
      <DialogTitle >
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

      {/* <Divider /> */}

      <Formik
       initialValues={{ 
        title: selectedData?.title ?? "",
        price: selectedData?.price ?? "",
        categoryId: selectedData?.categoryId ?? "", 
        sku: selectedData?.sku ?? "", 
        brandId: selectedData?.brandId ?? "", 
        inStock: selectedData?.inStock ?? false,
        quantity: selectedData?.quantity ?? "", 
        itemPics: selectedData?.itemPics ?? [], 
        colorId: selectedData?.colorId ?? [], 
        sizeId: selectedData?.sizeId ?? [], 
        description: selectedData?.description ?? '', 
      }}
       validationSchema={null}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
          console.log("product", values)
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
        {({ values, isSubmitting, errors, touched, handleChange, setFieldValue }) => {
            return (
                <Form>
                    <DialogContent sx={{maxHeight: '65vh', py: 2}} dividers>
                        <Grid container spacing={2} sx={{}}>
                            <RenderTextField 
                              name= 'title'
                              label = "Title"
                              size={4}
                            />

                            <Grid size={4}>
                              <Field name="brandId">
                                {({field}) => {

                                  const error = Boolean(touched.brandId && errors.brandId)
                                  return (
                                    <FormControl required size="small" fullWidth>
                                      <InputLabel>Brand</InputLabel>

                                      <Select
                                        {...field}
                                        label="Brand"
                                        value={field.value || ''}
                                      >
                                        {master?.brands.length > 0 ? (
                                          master.brands.map((row) => (
                                            <MenuItem value={row._id} key={row._id}>
                                              {row.label}
                                            </MenuItem>
                                          ))
                                        ) : (
                                          <MenuItem disabled>No item found</MenuItem>
                                        )}
                                      </Select>
                                    </FormControl>
                                  )
                                }}

                              </Field>
                            </Grid>

                            <Grid size={4}>
                              <Field name="categoryId">
                                {({field}) => {

                                  const error = Boolean(touched.categoryId && errors.categoryId)
                                  return (
                                    <FormControl required size="small" fullWidth>
                                      <InputLabel>Category</InputLabel>

                                      <Select
                                        {...field}
                                        label="Category"
                                        value={field.value || ''}
                                        onChange={(e) => {setFieldValue('categoryId', e.target.value); setFieldValue('sizeId', [])}}
                                      >
                                        {master.categories.length > 0 ? (
                                          master.categories.map((category, idx) => (
                                            <MenuItem value={category._id} key={idx}>
                                              {category.label}
                                            </MenuItem>
                                          ))
                                        ) : (
                                          <MenuItem disabled>No item found</MenuItem>
                                        )}
                                      </Select>
                                    </FormControl>
                                  )
                                }}

                              </Field>
                            </Grid>
                            
                            {values.categoryId &&
                              <Grid size={4}>
                                <Field name="sizeId">
                                  {({field}) => {
                                    const sizes = master?.sizes.filter((row) => row.categoryId === values.categoryId)

                                    const error = Boolean(touched.sizeId && errors.sizeId)
                                    return (
                                      <FormControl required size="small" fullWidth>
                                        <InputLabel>Sizes</InputLabel>

                                        <Select
                                          {...field}
                                          label="Sizes"
                                          multiple
                                          value={field.value || []}
                                          renderValue={(selected) => {
                                            return master?.sizes
                                              ?.filter((size) => selected.includes(size._id))
                                              .map((size) => size.label)
                                              .join(", ");
                                          }}
                                        >
                                          {sizes.length > 0 ? (
                                            
                                            sizes.map((row) => (
                                              <MenuItem value={row._id} key={row._id}>
                                                <Checkbox checked={values.sizeId.includes(row._id)} />
                                                {row.label}
                                              </MenuItem>
                                            ))
                                          ) : (
                                            <MenuItem disabled>No item found</MenuItem>
                                          )}
                                        </Select>
                                      </FormControl>
                                    )
                                  }}

                                </Field>
                              </Grid>
                            }

                            
                            <Grid size={4}>
                              <Field name="colorId">
                                {({field}) => {

                                  const error = Boolean(touched.colorId && errors.colorId)
                                  return (
                                    <FormControl required size="small" fullWidth>
                                      <InputLabel>Color</InputLabel>

                                      <Select
                                        {...field}
                                        label="Colors"
                                        multiple
                                        value={field.value || []}
                                        renderValue={(selected) => {
                                          return master?.colors
                                            ?.filter((color) => selected.includes(color._id))
                                            .map((color) => color.label)
                                            .join(", ");
                                        }}
                                      >
                                        {master?.colors.length > 0 ? (
                                          
                                          master?.colors.map((row) => (
                                            <MenuItem value={row._id} key={row._id}>
                                              <Checkbox checked={values.colorId.includes(row._id)} />
                                              <Box component="span" sx={{width: 13, height: 13, mr: 1, backgroundColor: row.key}}></Box>
                                              {row.label}
                                            </MenuItem>
                                          ))
                                        ) : (
                                          <MenuItem disabled>No item found</MenuItem>
                                        )}
                                      </Select>
                                    </FormControl>
                                  )
                                }}

                              </Field>
                            </Grid>

                            <RenderTextField 
                              name= 'sku'
                              label = "SKU"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'price'
                              label = "Price"
                              size={4}
                            />

                            <RenderTextField 
                              name= 'quantity'
                              label = "Quantity"
                              size={4}
                            />

                            <Grid size={4}>
                              <FormControlLabel 
                                control={
                                  <Switch 
                                    checked={values.inStock} 
                                    onChange={handleChange} 
                                    name="inStock" />
                                  }
                                label="In Stock"
                              />
                            </Grid>

                            <RenderTextField 
                              name= 'description'
                              label = "Description"
                              rows = '3'
                              size={12}
                            />

                            <Grid size={12}>
                              <Grid container>
                                <Grid size={4}>
                                  <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    tabIndex={-1}
                                  >
                                    <TextField
                                      type="file"
                                      hidden
                                      multiple
                                    />
                                  </Button>
                                </Grid>
                                <Grid size={8}></Grid>
                              </Grid>
                            </Grid>
                            
                        </Grid>
                    </DialogContent>

                    {/* <Divider /> */}

                    <DialogActions>
                      <Stack direction='row' spacing= {1} justifyContent= 'flex-end'>
                        <Button type="button" variant="outlined" onClick={onClose}>Cancel</Button>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting} sx={{mr: 2}}>{selectedData?._id ? 'Update':'Save'}</LoadingButton>
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
