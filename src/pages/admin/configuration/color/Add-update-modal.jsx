import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControlLabel, IconButton, Stack, Switch, Typography, Box,
    TextField
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { HexColorPicker } from 'react-colorful';
import Iconify from 'components/base/Iconify';
import RenderTextField from 'components/textField/RenderTextField';
import { addNewColor, updateColor } from 'store/slices/admin/configuration/colorSlice';

const validationSchema = yup.object({
  name: yup.string().trim().min(2, 'Name must be at least 2 characters').required('Name is required'),
  hex: yup.string().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color').required('Color is required'),
  isActive: yup.boolean(),
  description: yup.string(),
});

function AddUpdateModal({ open, onClose, selectedData }) {
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setErrors, setSubmitting }) => {
        try {
            const res = selectedData?._id
                ? await dispatch(updateColor({ id: selectedData._id, payload: values })).unwrap()
                : await dispatch(addNewColor(values)).unwrap();

            if (res.status) onClose();
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
                    <Iconify icon="solar:pallete-2-bold-duotone" />
                    <Typography variant="h6" fontWeight='600'>
                        {selectedData?._id ? 'Update' : 'Add'} color
                    </Typography>
                </Stack>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 17, right: 13 }}>
                    <Iconify icon="solar:close-circle-broken" />
                </IconButton>
            </DialogTitle>

            <Formik
                enableReinitialize
                initialValues={{
                    name: selectedData?.name ?? '',
                    hex: selectedData?.hex ?? '#000000',
                    isActive: selectedData?.isActive ?? true,
                    description: selectedData?.description ?? '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting, errors, touched }) => (
                    <Form>
                        <DialogContent sx={{ py: 3 }} dividers>
                            <Grid container spacing={2}>

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
                                    <Stack spacing={2} alignItems='center'>

                                        <HexColorPicker
                                            color={values.hex}
                                            onChange={(color) => setFieldValue('hex', color)}
                                            style={{ width: '100%', height: 180 }}
                                        />

                                        <Stack direction='row' spacing={1} alignItems='center' width='100%'>

                                            <Box
                                              sx={{
                                                  width: 40,
                                                  height: 40,
                                                  borderRadius: 1,
                                                  bgcolor: values.hex,
                                                  border: '1px solid',
                                                  borderColor: 'divider',
                                                  flexShrink: 0,
                                              }}
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Hex Code"
                                                value={values.hex}
                                                onChange={(e) => {
                                                    let val = e.target.value;
                                                    if (val && !val.startsWith('#')) {
                                                        val = `#${val}`;
                                                    }
                                                    setFieldValue('hex', val);
                                                }}
                                                error={touched.hex && Boolean(errors.hex)}
                                                helperText={touched.hex && errors.hex}
                                                inputProps={{ maxLength: 7 }}
                                            />
                                        </Stack>
                                    </Stack>
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