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
  Select,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field } from 'formik';
import RenderTextField from "../../../../components/textField/RenderTextField";
import { X, Plus } from 'lucide-react';
// import CustomIcon from "../../../../components/Icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { addNewSize, updateSize } from "../../../../redux/admin/settings/masterSlice";



export default function SizeModal({ open, onClose, selectedData }){

  const master = useSelector((state) => state.master.data);

  const dispatch = useDispatch();

  const handleSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    if(selectedData?._id){
      const res = await dispatch(updateSize(values)).unwrap();
      if(res.status){
        onClose();
      }
    }else{
      const res = await dispatch(addNewSize(values)).unwrap();
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
              {selectedData?._id ? 'Update Size' : 'Add New Size'}
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
        label: selectedData?.label ?? "",
        categoryId: selectedData?.categoryId ?? ""
      }}
       validationSchema={null}
       onSubmit={handleSubmit}
     >
        {({ isSubmitting }) => {
            return (
                <Form>
                    <DialogContent sx={{maxHeight: '65vh', py: 2}}>
                      <Grid container spacing={2} sx={{}}>
                        <Grid size={6}>
                          <Field name="categoryId">
                            {({ field, form }) => (
                              <FormControl required size="small" fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>

                                <Select
                                  {...field}
                                  labelId="category-label"
                                  label="Category"
                                  value={field.value || ''}
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
                            )}
                          </Field>
                        </Grid>

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
