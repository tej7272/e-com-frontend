import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';

// import { X, Plus } from "lucide-react";
// import CustomIcon from "../../../components/Icons/Icon";
// import { Formik } from 'formik';

type Props = {
  open: boolean;
  onClose: () => void;
  selectedData?: any;
};

const AddProductModal = ({ open, onClose, selectedData }: Props) => {
  // const dispatch: any = useDispatch();
  const master: any = {
    "_id": "696ef3f511309808a08f78ef",
    "version": "1.0.0",
    "categories": [
        {
            "key": "clothing",
            "label": "Clothing",
            "_id": "697ad46fd5b2bf1dc5dd06fa"
        },
        {
            "key": "footwear",
            "label": "Footwear",
            "_id": "697b91a11836b6d11c497bc2"
        }
    ],
    "sizes": [
        {
            "categoryKey": "clothing",
            "key": "s",
            "label": "S",
            "_id": "697b9b59bfbd74972d013dfa"
        },
        {
            "categoryKey": "clothing",
            "key": "m",
            "label": "M",
            "_id": "697c287763b01cae95b9436b"
        },
        {
            "categoryKey": "footwear",
            "key": "6",
            "label": "6",
            "_id": "697c289f63b01cae95b94389"
        },
        {
            "categoryKey": "footwear",
            "key": "7",
            "label": "7",
            "_id": "697c28aa63b01cae95b94399"
        },
        {
            "categoryKey": "footwear",
            "key": "8",
            "label": "8",
            "_id": "697c28bc63b01cae95b943aa"
        },
        {
            "categoryKey": "footwear",
            "key": "9",
            "label": "9",
            "_id": "697c28c863b01cae95b943bc"
        },
        {
            "categoryKey": "clothing",
            "key": "l",
            "label": "L",
            "_id": "697c2b7763b01cae95b9449c"
        }
    ],
    "brands": [
        {
            "key": "nike",
            "label": "Nike",
            "_id": "697b7456d96a916e8a5fb83b"
        },
        {
            "key": "adidas",
            "label": "Adidas",
            "_id": "697b7467d96a916e8a5fb843"
        },
        {
            "key": "red_tape",
            "label": "Red Tape",
            "_id": "697c2b0663b01cae95b94451"
        }
    ],
    "colors": [
        {
            "key": "#d0021d",
            "label": "Mahroom",
            "_id": "697b9b23bfbd74972d013ddf"
        },
        {
            "key": "#0e0e0e",
            "label": "Black",
            "_id": "697c298463b01cae95b943cf"
        },
        {
            "key": "#feeb13",
            "label": "Yellow",
            "_id": "697c299663b01cae95b943e3"
        },
        {
            "key": "#4a90e2",
            "label": "Ocean Blue",
            "_id": "697c29ca63b01cae95b94420"
        },
        {
            "key": "#417505",
            "label": "Parrot Green",
            "_id": "697c2b3c63b01cae95b94469"
        }
    ],
    "orderStatus": [
        {
            "key": "pending",
            "label": "Pending",
            "_id": "697b85821836b6d11c497b79"
        },
        {
            "key": "order_placed",
            "label": "Order Placed",
            "_id": "697b85f41836b6d11c497b97"
        },
        {
            "key": "dispatch",
            "label": "Dispatched",
            "_id": "697c2b6163b01cae95b94482"
        }
    ],
    "gender": [
        {
            "key": "male",
            "label": "Male",
            "_id": "697ad68dd5b2bf1dc5dd071f"
        },
        {
            "key": "female",
            "label": "Female",
            "_id": "697ad69bd5b2bf1dc5dd0728"
        },
        {
            "key": "others",
            "label": "Others",
            "_id": "697c2ac863b01cae95b9443a"
        }
    ],
    "createdAt": "2026-01-20T03:18:13.746Z",
    "updatedAt": "2026-01-30T03:54:31.941Z",
    "__v": 37
}

  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={0.5}>
            {/* <CustomIcon icon={Plus} size={18} /> */}
            <Typography variant="h6" fontWeight="600">
              {selectedData?.id ? 'Update Product' : 'Add new product'}
            </Typography>
          </Box>

          <IconButton onClick={onClose}></IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <Formik
        initialValues={{
          title: selectedData?.title ?? '',
          price: selectedData?.price ?? '',
          category: selectedData?.category ?? '',
          slug: selectedData?.slug ?? '',
          sku: selectedData?.sku ?? '',
          brand: selectedData?.brand ?? '',
          stockStatus: selectedData?.stockStatus ?? false,
          quantity: selectedData?.quantity ?? '',
          itemPics: selectedData?.itemPics ?? [],
          colors: selectedData?.colors ?? [],
          sizes: selectedData?.sizes ?? [],
          description: selectedData?.description ?? '',
        }}
        validationSchema={null}
        onSubmit={(values: any, { setSubmitting }: any) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, isSubmitting, handleChange, setFieldValue }: any) => (
          <Form>
            <DialogContent sx={{ maxHeight: '65vh', py: 2 }} dividers>
              <Grid container spacing={2}>
                {/* ---------- TITLE ---------- */}
                <Grid size={4}>
                  <Field name="title">
                    {({ field }: any) => (
                      <TextField {...field} label="Title" size="small" fullWidth />
                    )}
                  </Field>
                </Grid>

                {/* ---------- BRAND ---------- */}
                <Grid size={4}>
                  <Field name="brand">
                    {({ field }: any) => (
                      <FormControl size="small" fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select {...field} label="Brand">
                          {master?.brands?.map((row: any) => (
                            <MenuItem key={row._id} value={row.key}>
                              {row.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                {/* ---------- CATEGORY ---------- */}
                <Grid size={4}>
                  <Field name="category">
                    {({ field }: any) => (
                      <FormControl size="small" fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                          {...field}
                          label="Category"
                          onChange={(e: any) => {
                            setFieldValue('category', e.target.value);
                            setFieldValue('sizes', []);
                          }}
                        >
                          {master?.categories?.map((row: any) => (
                            <MenuItem key={row._id} value={row.key}>
                              {row.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                {/* ---------- SIZES ---------- */}
                {values.category && (
                  <Grid size={4}>
                    <Field name="sizes">
                      {({ field }: any) => {
                        const sizes = master?.sizes?.filter(
                          (s: any) => s.categoryKey === values.category,
                        );

                        return (
                          <FormControl size="small" fullWidth>
                            <InputLabel>Sizes</InputLabel>
                            <Select
                              {...field}
                              multiple
                              value={field.value || []}
                              renderValue={(selected: any) =>
                                master?.sizes
                                  ?.filter((s: any) => selected.includes(s.key))
                                  .map((s: any) => s.label)
                                  .join(', ')
                              }
                            >
                              {sizes?.map((row: any) => (
                                <MenuItem key={row._id} value={row.key}>
                                  <Checkbox checked={values.sizes.includes(row.key)} />
                                  {row.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        );
                      }}
                    </Field>
                  </Grid>
                )}

                {/* ---------- COLORS ---------- */}
                <Grid size={4}>
                  <Field name="colors">
                    {({ field }: any) => (
                      <FormControl size="small" fullWidth>
                        <InputLabel>Colors</InputLabel>
                        <Select
                          {...field}
                          multiple
                          value={field.value || []}
                          renderValue={(selected: any) =>
                            master?.colors
                              ?.filter((c: any) => selected.includes(c.key))
                              .map((c: any) => c.label)
                              .join(', ')
                          }
                        >
                          {master?.colors?.map((row: any) => (
                            <MenuItem key={row._id} value={row.key}>
                              <Checkbox checked={values.colors.includes(row.key)} />
                              <Box
                                sx={{
                                  width: 13,
                                  height: 13,
                                  mr: 1,
                                  backgroundColor: row.key,
                                }}
                              />
                              {row.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                {/* ---------- TEXTFIELDS ---------- */}
                {['slug', 'sku', 'price', 'quantity'].map((name) => (
                  <Grid size={4} key={name}>
                    <Field name={name}>
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          label={name.toUpperCase()}
                          size="small"
                          type={name === 'price' || name === 'quantity' ? 'number' : 'text'}
                          fullWidth
                        />
                      )}
                    </Field>
                  </Grid>
                ))}

                {/* ---------- STOCK ---------- */}
                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.stockStatus}
                        onChange={handleChange}
                        name="stockStatus"
                      />
                    }
                    label="Stock Status"
                  />
                </Grid>

                {/* ---------- DESCRIPTION ---------- */}
                <Grid size={4}>
                  <Field name="description">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Description"
                        multiline
                        rows={2}
                        size="small"
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <LoadingButton loading={isSubmitting} type="submit" variant="contained">
                  {selectedData?._id ? 'Update' : 'Save'}
                </LoadingButton>
              </Stack>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddProductModal;
