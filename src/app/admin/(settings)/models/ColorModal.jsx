import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from 'formik';
import RenderTextField from "../../../../components/textField/RenderTextField";
import { X, Plus } from 'lucide-react';
// import CustomIcon from "../../../../components/Icons/Icon";
import { useDispatch } from "react-redux";
import { addNewColor, updateColor } from "../../../../redux/admin/settings/masterSlice";
import { SketchPicker } from 'react-color'; // npm install react-color



export default function ColorModal({ open, onClose, selectedData }){

  const dispatch = useDispatch();
  const[showPicker, setShowPicker] = useState(false)

 const handleSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    if(selectedData?._id){
      const res = await dispatch(updateColor(values)).unwrap();
      if(res.status){
        onClose();
      }

    }else{
      const res = await dispatch(addNewColor(values)).unwrap();
      if(res.status){
        onClose();
      }
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
      <DialogTitle id="scroll-dialog-title">
        <Stack direction='row' justifyContent="space-between" alignItems='center'>
          <Box display="flex" flexDirection='row' alignItems= 'center' gap={.5}>
            {/* <CustomIcon icon={Plus} size={18}/> */}
            <Typography variant="h6" fontWeight='600' fontSize={16}>
              {selectedData?._id ? 'Update Color' : 'Add New Color'}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            {/* <CustomIcon icon ={X} size={18}/> */}
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
        {({values, isSubmitting, setFieldValue }) => {
            return (
                <Form>
                    <DialogContent sx={{maxHeight: '65vh', py: 2}}>
                        <Grid container spacing={2} sx={{}}>

                          <Grid size={12}>
                            <Stack spacing={1}>
                              <label>Key</label>
                              <Box
                                onClick={() => setShowPicker(!showPicker)}
                                sx={{
                                  width: '100%',
                                  height: 60,
                                  backgroundColor: values.key,
                                  border: '2px solid',
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  cursor: selectedData?._id ? "not-allowed" : 'pointer',
                                  position: 'relative'
                                }}
                              >
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    bottom: 4,
                                    right: 4,
                                    backgroundColor: 'background.paper',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 0.5,
                                    fontSize: 12,
                                    fontWeight: 600
                                  }}
                                >
                                  {values.key}
                                </Box>
                              </Box>
                              
                              {showPicker && !selectedData?._id && (
                                <Box sx={{ position: 'relative', zIndex: 2 }}>
                                  <Box
                                    sx={{
                                      position: 'fixed',
                                      top: 0,
                                      right: 0,
                                      bottom: 0,
                                      left: 0,
                                    }}
                                    onClick={() => setShowPicker(false)}
                                  />
                                  <SketchPicker
                                    color={values.key}
                                    onChange={(color) => setFieldValue('key', color.hex)}
                                  />
                                </Box>
                              )}
                            </Stack>
                          </Grid>

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
                        <LoadingButton 
                          type="submit" 
                          variant="contained" 
                          loading={isSubmitting} 
                          disabled={isSubmitting} 
                          sx={{mr: 2}}
                        >
                          {selectedData?._id ? "Update" : "Save"}
                        </LoadingButton>
                      </Stack>
                    </DialogActions>
                </Form>
                )} 
            }
        </Formik>
    </Dialog>
  );
};
