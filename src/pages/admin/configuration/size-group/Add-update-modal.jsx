import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Stack, Switch, Typography } from '@mui/material';
import React from 'react'
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import RenderTextField from '../../../../components/textField/RenderTextField';
import Iconify from 'components/base/Iconify';
import ChipInput from 'components/form/ChipInput';
import { addSizeGroup } from 'store/slices/admin/configuration/sizeGroupSlice';
import { updateSizeGroup } from 'store/slices/admin/configuration/sizeGroupSlice';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  isActive: yup.boolean(),
  description: yup.string(),
});

function AddUpdateModal({ open, onClose, selectedData }) {

    const dispatch = useDispatch();
  
    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
      try{
        setSubmitting(true)
        const res = selectedData 
          ? await dispatch(updateSizeGroup({id: selectedData._id, payload: values})).unwrap()
          : await dispatch(addSizeGroup(values)).unwrap();        
          if(res.success) onClose();
      } catch(err) {
        if(err.errors) {
          const serverErrors = Object.fromEntries(
            Object.entries(err.errors).map(([field, messages]) => [field, messages[0]])
          );
          setErrors(serverErrors);
        }
      }finally{
        setSubmitting(false);
      }
      
    }

  return (
    <Dialog
          fullWidth
          open={open}
          onClose={onClose}
          maxWidth='sm'
        >
          <DialogTitle >
            <Stack direction='row' alignItems='center' gap={1}>
                <Iconify icon="eva:plus-fill" />
                <Typography variant="h6" fontWeight='600' >
                  {selectedData?._id ? 'Update' : 'Add'} size group
                </Typography>
            </Stack>
            <IconButton onClick={onClose} sx={{position: 'absolute', top: 17, right: 13}}>
              <Iconify icon="solar:close-circle-broken" />
            </IconButton>
          </DialogTitle>
    
          <Formik
           initialValues={{ 
            name: selectedData?.name ?? "",
            description: selectedData?.description ?? "",
            sizes: selectedData?.sizes ?? [],
            isActive: selectedData?.isActive ?? true
          }}
           validationSchema={validationSchema}
           onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors }) => {
                return (
                    <Form>
                        <DialogContent sx={{maxHeight: '65vh', py: 3}} dividers>
                            <Grid container spacing={2} sx={{}}>
                                <RenderTextField 
                                  name= 'name'
                                  label = "Name"
                                  size={6}
                                  required
                                />

                                <Grid size={6}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={values.isActive} 
                                        onChange={(e) => setFieldValue('isActive', e.target.checked)} 
                                        name="isActive" />
                                      }
                                    label="Active"
                                  />
                                </Grid>
                                <Grid size={12}>
                                  <ChipInput
                                    label="Sizes"
                                    value={values.sizes}
                                    onChange={(newSizes) => setFieldValue('sizes', newSizes)}
                                    error={!!errors.sizes}
                                    helperText={errors.sizes}
                                  />
                                </Grid>

                                <RenderTextField 
                                  name= 'description'
                                  label = "Description"
                                  size={12}
                                  rows={2}
                                />
                                
                            </Grid>
                        </DialogContent>
  
    
                        <DialogActions>
                          <Stack direction='row' spacing={1} justifyContent='flex-end'>
                            <Button variant="outlined" onClick={onClose}>
                              <Iconify icon='solar:undo-left-round-linear' sx={{ mr: .5 }} />
                              Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                                sx={{ mr: 2 }}
                            >
                              <Iconify icon='eva:save-outline' sx={{mr: .5}}/>
                                {selectedData?._id ? 'Update' : 'Save'}
                            </Button>
                          </Stack>
                        </DialogActions>
                    </Form>
                    )} 
                }
            </Formik>
        </Dialog>
  )
}

export default AddUpdateModal;
