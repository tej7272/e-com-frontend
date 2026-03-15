import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, FormControlLabel, FormHelperText,
    IconButton, InputLabel, MenuItem, Select,
    Stack, Switch, Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Iconify from 'components/base/Iconify';
import RenderTextField from 'components/textField/RenderTextField';
import { updateSubCategory, addSubCategory } from 'store/slices/admin/configuration/subCategory';

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    category: yup.string().required('Category is required'),
    sizeGroup: yup.string().nullable().optional(),
    isActive: yup.boolean(),
    description: yup.string(),
});

function AddUpdateModal({ open, onClose, selectedData }) {
    const dispatch   = useDispatch();
    const formConfig = useSelector((state) => state.formConfig.data);

    const handleSubmit = async (values, { setErrors, setSubmitting }) => {
        try {
            const res = selectedData?._id
                ? await dispatch(updateSubCategory({ id: selectedData._id, payload: values })).unwrap()
                : await dispatch(addSubCategory(values)).unwrap();

            if (res.success) onClose();
        } catch(err) {
            if (err.errors) {
                setErrors(
                    Object.fromEntries(
                        Object.entries(err.errors).map(([field, messages]) => [field, messages[0]])
                    )
                );
            }
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <Dialog fullWidth open={open} onClose={onClose} maxWidth='sm'>
            <DialogTitle>
                <Stack direction='row' alignItems='center' gap={1}>
                    <Iconify icon="eva:plus-fill" />
                    <Typography variant="h6" fontWeight='600'>
                        {selectedData?._id ? 'Update' : 'Add'} sub category
                    </Typography>
                </Stack>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 17, right: 13 }}>
                    <Iconify icon="solar:close-circle-broken" />
                </IconButton>
            </DialogTitle>

            <Formik
                enableReinitialize                     
                initialValues={{
                    name: selectedData?.name ?? "",
                    description: selectedData?.description ?? "",
                    category: selectedData?.category._id ?? "",
                    sizeGroup: selectedData?.sizeGroup._id ?? "",
                    isActive: selectedData?.isActive ?? true
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <DialogContent sx={{ maxHeight: '65vh', py: 3 }} dividers>
                            <Grid container spacing={2}>

                                <RenderTextField
                                    name="name"
                                    label="Name"
                                    size={6}
                                    required
                                />

                                {/* Category */}
                                <Grid size={6}>
                                    <Field name="category">
                                        {({ field, form }) => {
                                            const error = Boolean(form.touched.category && form.errors.category);
                                            return (
                                                <FormControl required fullWidth error={error}>
                                                    <InputLabel>Category</InputLabel>
                                                    <Select {...field} label="Category" value={field.value || ''}>
                                                        {formConfig?.categories?.length > 0 ? (
                                                            formConfig.categories.map((cat) => (
                                                                <MenuItem value={cat._id} key={cat._id}>
                                                                    {cat.name}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem disabled>No item found</MenuItem>
                                                        )}
                                                    </Select>
                                                    {error && <FormHelperText>{form.errors.category}</FormHelperText>}
                                                </FormControl>
                                            );
                                        }}
                                    </Field>
                                </Grid>

                                {/* SizeGroup */}
                                <Grid size={6}>
                                    <Field name="sizeGroup">
                                        {({ field, form }) => {
                                            const error = Boolean(form.touched.sizeGroup && form.errors.sizeGroup);
                                            return (
                                                <FormControl fullWidth error={error}>
                                                    <InputLabel>Size Group</InputLabel>
                                                    <Select {...field} label="Size Group" value={field.value || ''}>
                                                        <MenuItem value=''>None</MenuItem> 
                                                        {formConfig?.sizeGroups?.map((group) => ( 
                                                            <MenuItem value={group._id} key={group._id}>
                                                                {group.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {error && <FormHelperText>{form.errors.sizeGroup}</FormHelperText>}
                                                </FormControl>
                                            );
                                        }}
                                    </Field>
                                </Grid>

                                {/* isActive */}
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

                                <RenderTextField
                                    name="description"
                                    label="Description"
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
            </Formik>
        </Dialog>
    );
}

export default AddUpdateModal;