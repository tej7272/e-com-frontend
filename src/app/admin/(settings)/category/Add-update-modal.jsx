import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
// import CustomIcon from '../../../../components/Icons/Icon';
import { Plus, X } from 'lucide-react';
import { Form, Formik } from 'formik';
import RenderTextField from '../../../../components/textField/RenderTextField';
import { LoadingButton } from '@mui/lab';

function AddUpdateModel({ open, onClose, selectedData }) {

    const dispatch = useDispatch();
  
    const handleSubmit = async (values, {setSubmitting}) => {
      setSubmitting(true)
      if(selectedData?._id){
        // const res = await dispatch(updateCategory(values)).unwrap();
        // if(res.status){
        //   onClose();
        // }
  
      }else{
        // const res = await dispatch(addNewCategory(values)).unwrap();
        // if(res.status){
        //   onClose();
        // }
      }
      setSubmitting(false);
    }

  return (
    <Dialog
          fullWidth
          open={open}
          onClose={onClose}
          maxWidth='xs'
        >
          <DialogTitle>
            <Stack direction='row' justifyContent="space-between" alignItems='center'>
              <Box display="flex" flexDirection='row' alignItems= 'center' gap={.5}>
                {/* <CustomIcon icon={Plus} size={18}/> */}
                <Typography variant="h6" fontWeight='600' fontSize={16}>
                  {selectedData?._id ? 'Update Category' : 'Add New Category'}
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
            id: selectedData?._id || 0,
            key: selectedData?.key ?? "",
            label: selectedData?.label ?? ""
          }}
           validationSchema={null}
           onSubmit={handleSubmit}
         >
            {({ isSubmitting }) => {
                return (
                    <Form>
                        <DialogContent sx={{maxHeight: '65vh', py: 2}}>
                            <Grid container spacing={2} sx={{}}>
                                <RenderTextField 
                                  name= 'key'
                                  label = "Key"
                                  size={6}
                                  disabled={selectedData?._id}
                                />
    
                                <RenderTextField 
                                  name= 'label'
                                  label = "Label"
                                  size={6}
                                />
                                
                            </Grid>
                        </DialogContent>
    
                        <Divider />
    
                        <DialogActions>
                          <Stack direction='row' spacing= {1} justifyContent= 'flex-end' sx={{p: 2}}>
                            <Button type="button" variant="outlined" onClick={onClose}>Cancel</Button>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting} sx={{mr: 2}}>{selectedData?.key ? "Update" : "Save"}</LoadingButton>
                          </Stack>
                        </DialogActions>
                    </Form>
                    )} 
                }
            </Formik>
        </Dialog>
  )
}

export default AddUpdateModel;
