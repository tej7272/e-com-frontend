// components/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
    Box, TextField, Button, Grid, Typography, Paper,
    MenuItem, IconButton, Chip, Card, CardContent,
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Divider, Alert
} from '@mui/material';
import { Add, Delete, ContentCopy } from '@mui/icons-material';
import { ChromePicker } from 'react-color';

const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    category: Yup.string().required('Category is required'),
    subcategory: Yup.string().required('Subcategory is required'),
    variants: Yup.array().min(1, 'At least one variant is required')
});

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState({});

    // Predefined options
    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
    const colorPresets = [
        { name: 'Red', code: '#FF0000' },
        { name: 'Blue', code: '#0000FF' },
        { name: 'Green', code: '#00FF00' },
        { name: 'Black', code: '#000000' },
        { name: 'White', code: '#FFFFFF' },
        { name: 'Yellow', code: '#FFFF00' },
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        // API call to get categories
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
    };

    const handleCategoryChange = async (categoryId, setFieldValue) => {
        setFieldValue('category', categoryId);
        setFieldValue('subcategory', '');
        
        // Fetch subcategories
        const response = await fetch(`/api/subcategories/${categoryId}`);
        const data = await response.json();
        setSubcategories(data);
    };

    const generateVariants = (setFieldValue) => {
        const variants = [];
        selectedSizes.forEach(size => {
            selectedColors.forEach(color => {
                variants.push({
                    size,
                    color: color.name,
                    colorCode: color.code,
                    price: 0,
                    quantity: 0,
                    sku: ''
                });
            });
        });
        setFieldValue('variants', variants);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            
            if (response.ok) {
                alert('Product created successfully!');
                // Reset form or redirect
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
        setSubmitting(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Add New Product
            </Typography>

            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    category: '',
                    subcategory: '',
                    variants: [],
                    masterImages: []
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={3}>
                            {/* Basic Information */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Basic Information
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Product Name"
                                                name="name"
                                                value={values.name}
                                                onChange={(e) => setFieldValue('name', e.target.value)}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Category"
                                                value={values.category}
                                                onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                                                error={touched.category && Boolean(errors.category)}
                                                helperText={touched.category && errors.category}
                                            >
                                                {categories.map((cat) => (
                                                    <MenuItem key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Subcategory"
                                                value={values.subcategory}
                                                onChange={(e) => setFieldValue('subcategory', e.target.value)}
                                                disabled={!values.category}
                                                error={touched.subcategory && Boolean(errors.subcategory)}
                                                helperText={touched.subcategory && errors.subcategory}
                                            >
                                                {subcategories.map((subcat) => (
                                                    <MenuItem key={subcat._id} value={subcat._id}>
                                                        {subcat.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                label="Description"
                                                value={values.description}
                                                onChange={(e) => setFieldValue('description', e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Size Selection */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Select Sizes
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {sizeOptions.map(size => (
                                            <Chip
                                                key={size}
                                                label={size}
                                                onClick={() => {
                                                    if (selectedSizes.includes(size)) {
                                                        setSelectedSizes(selectedSizes.filter(s => s !== size));
                                                    } else {
                                                        setSelectedSizes([...selectedSizes, size]);
                                                    }
                                                }}
                                                color={selectedSizes.includes(size) ? 'primary' : 'default'}
                                                variant={selectedSizes.includes(size) ? 'filled' : 'outlined'}
                                            />
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Color Selection */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Select Colors
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                        {colorPresets.map(color => (
                                            <Chip
                                                key={color.name}
                                                label={color.name}
                                                onClick={() => {
                                                    const exists = selectedColors.find(c => c.name === color.name);
                                                    if (exists) {
                                                        setSelectedColors(selectedColors.filter(c => c.name !== color.name));
                                                    } else {
                                                        setSelectedColors([...selectedColors, color]);
                                                    }
                                                }}
                                                color={selectedColors.find(c => c.name === color.name) ? 'primary' : 'default'}
                                                avatar={
                                                    <Box
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: '50%',
                                                            backgroundColor: color.code,
                                                            border: '1px solid #ccc'
                                                        }}
                                                    />
                                                }
                                            />
                                        ))}
                                    </Box>
                                    
                                    <Button
                                        variant="outlined"
                                        onClick={() => generateVariants(setFieldValue)}
                                        disabled={selectedSizes.length === 0 || selectedColors.length === 0}
                                    >
                                        Generate Variants ({selectedSizes.length} × {selectedColors.length} = {selectedSizes.length * selectedColors.length})
                                    </Button>
                                </Paper>
                            </Grid>

                            {/* Variants Table */}
                            {values.variants.length > 0 && (
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Product Variants
                                        </Typography>
                                        <Alert severity="info" sx={{ mb: 2 }}>
                                            Total Variants: {values.variants.length}
                                        </Alert>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Size</TableCell>
                                                        <TableCell>Color</TableCell>
                                                        <TableCell>Price ($)</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                        <TableCell>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <FieldArray name="variants">
                                                        {({ remove, push }) => (
                                                            <>
                                                                {values.variants.map((variant, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>
                                                                            <Chip label={variant.size} />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                <Box
                                                                                    sx={{
                                                                                        width: 24,
                                                                                        height: 24,
                                                                                        borderRadius: '50%',
                                                                                        backgroundColor: variant.colorCode,
                                                                                        border: '1px solid #ccc'
                                                                                    }}
                                                                                />
                                                                                {variant.color}
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField
                                                                                type="number"
                                                                                size="small"
                                                                                value={variant.price}
                                                                                onChange={(e) => 
                                                                                    setFieldValue(`variants.${index}.price`, parseFloat(e.target.value) || 0)
                                                                                }
                                                                                inputProps={{ min: 0, step: 0.01 }}
                                                                                sx={{ width: 100 }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField
                                                                                type="number"
                                                                                size="small"
                                                                                value={variant.quantity}
                                                                                onChange={(e) => 
                                                                                    setFieldValue(`variants.${index}.quantity`, parseInt(e.target.value) || 0)
                                                                                }
                                                                                inputProps={{ min: 0 }}
                                                                                sx={{ width: 100 }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() => {
                                                                                    const newVariant = { ...variant };
                                                                                    push(newVariant);
                                                                                }}
                                                                            >
                                                                                <ContentCopy fontSize="small" />
                                                                            </IconButton>
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() => remove(index)}
                                                                                color="error"
                                                                            >
                                                                                <Delete fontSize="small" />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </>
                                                        )}
                                                    </FieldArray>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        {/* Bulk Actions */}
                                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                            <TextField
                                                label="Apply Price to All"
                                                type="number"
                                                size="small"
                                                inputProps={{ min: 0, step: 0.01 }}
                                                onBlur={(e) => {
                                                    const price = parseFloat(e.target.value);
                                                    if (price > 0) {
                                                        values.variants.forEach((_, index) => {
                                                            setFieldValue(`variants.${index}.price`, price);
                                                        });
                                                    }
                                                }}
                                            />
                                            <TextField
                                                label="Apply Quantity to All"
                                                type="number"
                                                size="small"
                                                inputProps={{ min: 0 }}
                                                onBlur={(e) => {
                                                    const quantity = parseInt(e.target.value);
                                                    if (quantity >= 0) {
                                                        values.variants.forEach((_, index) => {
                                                            setFieldValue(`variants.${index}.quantity`, quantity);
                                                        });
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                            )}

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                    <Button variant="outlined" size="large">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={isSubmitting || values.variants.length === 0}
                                    >
                                        Create Product
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddProduct;