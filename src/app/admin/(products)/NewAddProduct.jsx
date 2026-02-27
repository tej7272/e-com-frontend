import React, { useState, useEffect } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
    Box, TextField, Button, Grid, Typography, Paper,
    MenuItem, IconButton, Chip, Card, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Divider, Alert, ToggleButton, ToggleButtonGroup,
    Avatar, Tooltip, Dialog, DialogTitle, DialogContent,
    DialogActions, Snackbar, LinearProgress, FormControlLabel,
    Switch, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
    Add, Delete, ContentCopy, ViewList, ViewModule,
    Upload, Download, Image as ImageIcon, ExpandMore,
    Save, Publish, Info
} from '@mui/icons-material';
import axios from 'axios';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Product name is required')
        .max(200, 'Product name cannot exceed 200 characters'),
    category: Yup.string().required('Category is required'),
    subcategory: Yup.string().required('Subcategory is required'),
    description: Yup.string().max(5000, 'Description cannot exceed 5000 characters'),
    variants: Yup.array()
        .min(1, 'At least one variant is required')
        .required('Variants are required')
});

const NewAddProduct = () => {
    // State management
    // const [categories, setCategories] = useState([]);
    // const [subcategories, setSubcategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [viewMode, setViewMode] = useState('matrix');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [csvDialogOpen, setCsvDialogOpen] = useState(false);
    const [csvImportData, setCsvImportData] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Predefined options
    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
    const colorPresets = [
        { name: 'Red', code: '#EF4444' },
        { name: 'Blue', code: '#3B82F6' },
        { name: 'Green', code: '#10B981' },
        { name: 'Black', code: '#000000' },
        { name: 'White', code: '#FFFFFF' },
        { name: 'Navy', code: '#1E3A8A' },
        { name: 'Gray', code: '#6B7280' },
        { name: 'Pink', code: '#EC4899' },
        { name: 'Yellow', code: '#FBBF24' },
        { name: 'Purple', code: '#A855F7' },
    ];

    // Fetch categories on mount
    // useEffect(() => {
    //     fetchCategories();
    // }, []);

    // const fetchCategories = async () => {
    //     try {
    //         const response = await axios.get('/api/categories');
    //         setCategories(response.data);
    //     } catch (error) {
    //         showSnackbar('Error fetching categories', 'error');
    //     }
    // };

    const categories = [
    {
        name: 'Apparel',
        description: 'Clothing and fashion items',
        image: '/images/categories/apparel.jpg',
        status: 'active',
        sortOrder: 1
    },
    {
        name: 'Footwear',
        description: 'Shoes and accessories',
        image: '/images/categories/footwear.jpg',
        status: 'active',
        sortOrder: 2
    },
    {
        name: 'Accessories',
        description: 'Fashion accessories',
        image: '/images/categories/accessories.jpg',
        status: 'active',
        sortOrder: 3
    }
];

const subcategories = [
    // Apparel subcategories
    {
        name: 'T-Shirts',
        categoryName: 'Apparel',
        description: 'Casual and formal t-shirts',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        status: 'active',
        sortOrder: 1
    },
    {
        name: 'Shirts',
        categoryName: 'Apparel',
        description: 'Formal and casual shirts',
        availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
        status: 'active',
        sortOrder: 2
    },
    {
        name: 'Jeans',
        categoryName: 'Apparel',
        description: 'Denim jeans',
        availableSizes: ['28', '30', '32', '34', '36', '38'],
        status: 'active',
        sortOrder: 3
    },
    // Footwear subcategories
    {
        name: 'Sneakers',
        categoryName: 'Footwear',
        description: 'Casual sneakers',
        availableSizes: ['6', '7', '8', '9', '10', '11', '12'],
        status: 'active',
        sortOrder: 1
    },
    {
        name: 'Formal Shoes',
        categoryName: 'Footwear',
        description: 'Formal footwear',
        availableSizes: ['6', '7', '8', '9', '10', '11', '12'],
        status: 'active',
        sortOrder: 2
    },
    // Accessories subcategories
    {
        name: 'Caps',
        categoryName: 'Accessories',
        description: 'Baseball caps and hats',
        availableSizes: ['One Size'],
        status: 'active',
        sortOrder: 1
    }
];

    const handleCategoryChange = async (categoryId, setFieldValue) => {
        setFieldValue('category', categoryId);
        setFieldValue('subcategory', '');
        
        // try {
        //     const response = await axios.get(`/api/categories/${categoryId}/subcategories`);
        //     setSubcategories(response.data);
        // } catch (error) {
        //     showSnackbar('Error fetching subcategories', 'error');
        // }
    };

    const generateVariants = (setFieldValue) => {
        if (selectedSizes.length === 0 || selectedColors.length === 0) {
            showSnackbar('Please select at least one size and one color', 'warning');
            return;
        }

        const variants = [];
        selectedSizes.forEach(size => {
            selectedColors.forEach(color => {
                variants.push({
                    size,
                    color: color.name,
                    colorCode: color.code,
                    price: 0,
                    quantity: 0,
                    sku: '',
                    images: []
                });
            });
        });
        
        setFieldValue('variants', variants);
        showSnackbar(`Generated ${variants.length} variants`, 'success');
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);
            
            const response = await axios.post('/api/products', values);
            
            showSnackbar('Product created successfully!', 'success');
            resetForm();
            setSelectedSizes([]);
            setSelectedColors([]);
            
            // Optionally redirect or perform other actions
        } catch (error) {
            showSnackbar(
                error.response?.data?.message || 'Error creating product',
                'error'
            );
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // CSV Import/Export functions
    const exportToCSV = (variants) => {
        const headers = ['Size', 'Color', 'Color Code', 'Price', 'Quantity'];
        const rows = [headers.join(',')];
        
        variants.forEach(variant => {
            const row = [
                variant.size,
                variant.color,
                variant.colorCode || '',
                variant.price || 0,
                variant.quantity || 0
            ];
            rows.push(row.join(','));
        });
        
        const csv = rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'product-variants.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        
        showSnackbar('CSV exported successfully', 'success');
    };

    const importFromCSV = (csvText, setFieldValue) => {
        try {
            const lines = csvText.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            
            const variants = [];
            
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                const variant = {};
                
                headers.forEach((header, index) => {
                    if (header === 'size') variant.size = values[index];
                    else if (header === 'color') variant.color = values[index];
                    else if (header === 'color code' || header === 'colorcode') 
                        variant.colorCode = values[index];
                    else if (header === 'price') 
                        variant.price = parseFloat(values[index]) || 0;
                    else if (header === 'quantity' || header === 'qty') 
                        variant.quantity = parseInt(values[index]) || 0;
                });
                
                if (variant.size && variant.color) {
                    variants.push({
                        ...variant,
                        sku: '',
                        images: []
                    });
                }
            }
            
            if (variants.length > 0) {
                setFieldValue('variants', variants);
                
                // Update selected sizes and colors
                const sizes = [...new Set(variants.map(v => v.size))];
                const colors = [...new Map(
                    variants.map(v => [v.color, { name: v.color, code: v.colorCode }])
                ).values()];
                
                setSelectedSizes(sizes);
                setSelectedColors(colors);
                
                setCsvDialogOpen(false);
                showSnackbar(`Imported ${variants.length} variants`, 'success');
            } else {
                showSnackbar('No valid variants found in CSV', 'error');
            }
        } catch (error) {
            showSnackbar('Error parsing CSV', 'error');
        }
    };

    // Matrix View Component
    const MatrixView = ({ values, setFieldValue }) => {
        if (values.variants.length === 0) {
            return (
                <Alert severity="info">
                    No variants generated yet. Select sizes and colors above, then click "Generate Variants".
                </Alert>
            );
        }

        // Organize variants by size and color
        const matrix = {};
        selectedSizes.forEach(size => {
            matrix[size] = {};
            selectedColors.forEach(color => {
                const variant = values.variants.find(
                    v => v.size === size && v.color === color.name
                );
                matrix[size][color.name] = variant;
            });
        });

        return (
            <Box>
                <TableContainer>
                    <Table size="small" sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell 
                                    sx={{ 
                                        fontWeight: 'bold', 
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 2
                                    }}
                                >
                                    Size / Color
                                </TableCell>
                                {selectedColors.map(color => (
                                    <TableCell 
                                        key={color.name} 
                                        align="center"
                                        sx={{ 
                                            fontWeight: 'bold', 
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            minWidth: 150
                                        }}
                                    >
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 1, 
                                            justifyContent: 'center' 
                                        }}>
                                            <Avatar
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    bgcolor: color.code,
                                                    border: color.name === 'White' ? '2px solid #ddd' : 'none'
                                                }}
                                            >
                                                {' '}
                                            </Avatar>
                                            {color.name}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedSizes.map((size, sizeIndex) => (
                                <TableRow 
                                    key={size}
                                    sx={{ '&:hover': { bgcolor: 'grey.50' } }}
                                >
                                    <TableCell 
                                        sx={{ 
                                            fontWeight: 'bold', 
                                            bgcolor: 'grey.100',
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 1
                                        }}
                                    >
                                        <Chip label={size} color="primary" variant="outlined" />
                                    </TableCell>
                                    {selectedColors.map((color, colorIndex) => {
                                        const variant = matrix[size][color.name];
                                        const variantIndex = values.variants.findIndex(
                                            v => v.size === size && v.color === color.name
                                        );

                                        return (
                                            <TableCell 
                                                key={`${size}-${color.name}`} 
                                                sx={{ p: 1, bgcolor: 'white' }}
                                            >
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    gap: 1 
                                                }}>
                                                    <TextField
                                                        size="small"
                                                        label="Price"
                                                        type="number"
                                                        value={variant?.price || 0}
                                                        onChange={(e) => 
                                                            setFieldValue(
                                                                `variants.${variantIndex}.price`, 
                                                                parseFloat(e.target.value) || 0
                                                            )
                                                        }
                                                        InputProps={{
                                                            startAdornment: (
                                                                <span style={{ marginRight: 4 }}>$</span>
                                                            ),
                                                        }}
                                                        inputProps={{ 
                                                            min: 0, 
                                                            step: 0.01,
                                                            style: { textAlign: 'right' }
                                                        }}
                                                        sx={{ 
                                                            '& .MuiInputBase-input': { 
                                                                fontSize: '0.875rem',
                                                                py: 0.75
                                                            }
                                                        }}
                                                    />
                                                    <TextField
                                                        size="small"
                                                        label="Qty"
                                                        type="number"
                                                        value={variant?.quantity || 0}
                                                        onChange={(e) => 
                                                            setFieldValue(
                                                                `variants.${variantIndex}.quantity`, 
                                                                parseInt(e.target.value) || 0
                                                            )
                                                        }
                                                        inputProps={{ 
                                                            min: 0,
                                                            style: { textAlign: 'right' }
                                                        }}
                                                        sx={{ 
                                                            '& .MuiInputBase-input': { 
                                                                fontSize: '0.875rem',
                                                                py: 0.75
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Bulk Actions */}
                <Paper sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Quick Bulk Actions
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Set all prices"
                                type="number"
                                placeholder="e.g., 29.99"
                                InputProps={{
                                    startAdornment: <span style={{ marginRight: 4 }}>$</span>,
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        const price = parseFloat(e.target.value);
                                        if (price >= 0) {
                                            values.variants.forEach((_, index) => {
                                                setFieldValue(`variants.${index}.price`, price);
                                            });
                                            e.target.value = '';
                                            showSnackbar('Applied price to all variants', 'success');
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Set all quantities"
                                type="number"
                                placeholder="e.g., 100"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        const qty = parseInt(e.target.value);
                                        if (qty >= 0) {
                                            values.variants.forEach((_, index) => {
                                                setFieldValue(`variants.${index}.quantity`, qty);
                                            });
                                            e.target.value = '';
                                            showSnackbar('Applied quantity to all variants', 'success');
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    if (values.variants.length > 0) {
                                        const firstPrice = values.variants[0]?.price || 0;
                                        const firstQty = values.variants[0]?.quantity || 0;
                                        values.variants.forEach((_, index) => {
                                            setFieldValue(`variants.${index}.price`, firstPrice);
                                            setFieldValue(`variants.${index}.quantity`, firstQty);
                                        });
                                        showSnackbar('Copied first variant to all', 'success');
                                    }
                                }}
                            >
                                Copy First Variant
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        💡 Press Enter after typing to apply bulk changes
                    </Typography>
                </Paper>
            </Box>
        );
    };

    // List View Component
    const ListView = ({ values, setFieldValue, remove }) => {
        if (values.variants.length === 0) {
            return (
                <Alert severity="info">
                    No variants generated yet. Select sizes and colors above, then click "Generate Variants".
                </Alert>
            );
        }

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Size</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Color</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price ($)</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.variants.map((variant, index) => (
                            <TableRow key={index} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Chip label={variant.size} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                bgcolor: variant.colorCode,
                                                border: variant.color === 'White' ? '1px solid #ddd' : 'none'
                                            }}
                                        >
                                            {' '}
                                        </Avatar>
                                        {variant.color}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={variant.price}
                                        onChange={(e) => 
                                            setFieldValue(
                                                `variants.${index}.price`, 
                                                parseFloat(e.target.value) || 0
                                            )
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
                                            setFieldValue(
                                                `variants.${index}.quantity`, 
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        inputProps={{ min: 0 }}
                                        sx={{ width: 100 }}
                                    />
                                </TableCell>
                                <TableCell>
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
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
            {loading && <LinearProgress />}
            
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">
                    Add New Product
                </Typography>
                <Chip 
                    icon={<Info />} 
                    label="Product Variant Manager" 
                    color="primary" 
                    variant="outlined"
                />
            </Box>

            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    category: '',
                    subcategory: '',
                    variants: [],
                    masterImages: [],
                    brand: '',
                    tags: [],
                    metaTitle: '',
                    metaDescription: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={3}>
                            {/* Basic Information */}
                            <Grid size={12}>
                                <Paper sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        📝 Basic Information
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <TextField
                                                fullWidth
                                                label="Product Name *"
                                                name="name"
                                                size='medium'
                                                value={values.name}
                                                onChange={(e) => {
                                                    setFieldValue('name', e.target.value);
                                                    if (!values.metaTitle) {
                                                        setFieldValue('metaTitle', e.target.value);
                                                    }
                                                }}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Category *"
                                                value={values.category}
                                                onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                                                error={touched.category && Boolean(errors.category)}
                                                helperText={touched.category && errors.category}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Category</em>
                                                </MenuItem>
                                                {categories.map((cat) => (
                                                    <MenuItem key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid size={3}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Subcategory *"
                                                value={values.subcategory}
                                                onChange={(e) => setFieldValue('subcategory', e.target.value)}
                                                disabled={!values.category}
                                                error={touched.subcategory && Boolean(errors.subcategory)}
                                                helperText={touched.subcategory && errors.subcategory}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Subcategory</em>
                                                </MenuItem>
                                                {subcategories.map((subcat) => (
                                                    <MenuItem key={subcat._id} value={subcat._id}>
                                                        {subcat.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid size={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                label="Description"
                                                value={values.description}
                                                onChange={(e) => setFieldValue('description', e.target.value)}
                                                error={touched.description && Boolean(errors.description)}
                                                helperText={touched.description && errors.description}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Size Selection */}
                            <Grid size={12}>
                                <Paper sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        📏 Select Sizes
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
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
                                                sx={{ 
                                                    fontSize: '1rem', 
                                                    py: 2.5,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    {selectedSizes.length > 0 && (
                                        <Alert severity="info" sx={{ mt: 2 }}>
                                            Selected: {selectedSizes.join(', ')}
                                        </Alert>
                                    )}
                                </Paper>
                            </Grid>

                            {/* Color Selection */}
                            <Grid size={12}>
                                <Paper sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        🎨 Select Colors
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {colorPresets.map(color => {
                                            const isSelected = selectedColors.find(c => c.name === color.name);
                                            return (
                                                <Tooltip key={color.name} title={color.code}>
                                                    <Chip
                                                        label={color.name}
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                setSelectedColors(
                                                                    selectedColors.filter(c => c.name !== color.name)
                                                                );
                                                            } else {
                                                                setSelectedColors([...selectedColors, color]);
                                                            }
                                                        }}
                                                        color={isSelected ? 'primary' : 'default'}
                                                        avatar={
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: color.code,
                                                                    border: color.name === 'White' ? '2px solid #ddd' : 'none'
                                                                }}
                                                            />
                                                        }
                                                        sx={{ 
                                                            fontSize: '0.95rem',
                                                            py: 2.5,
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            '&:hover': {
                                                                transform: 'scale(1.05)'
                                                            }
                                                        }}
                                                    />
                                                </Tooltip>
                                            );
                                        })}
                                    </Box>
                                    {selectedColors.length > 0 && (
                                        <Alert severity="info" sx={{ mt: 2 }}>
                                            Selected: {selectedColors.map(c => c.name).join(', ')}
                                        </Alert>
                                    )}
                                </Paper>
                            </Grid>

                            {/* Generate Variants Button */}
                            <Grid size={12}>
                                <Paper sx={{ p: 3, bgcolor: 'primary.light', color: 'white' }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={8}>
                                            <Typography variant="h6" fontWeight="bold">
                                                Generate Product Variants
                                            </Typography>
                                            <Typography variant="body2">
                                                {selectedSizes.length} sizes × {selectedColors.length} colors = {selectedSizes.length * selectedColors.length} variants
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                size="large"
                                                onClick={() => generateVariants(setFieldValue)}
                                                disabled={selectedSizes.length === 0 || selectedColors.length === 0}
                                                sx={{ 
                                                    bgcolor: 'white', 
                                                    color: 'primary.main',
                                                    '&:hover': {
                                                        bgcolor: 'grey.100'
                                                    }
                                                }}
                                                startIcon={<Add />}
                                            >
                                                Generate Variants
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Variants Display */}
                            {values.variants.length > 0 && (
                                <Grid size={12}>
                                    <Paper sx={{ p: 3 }}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            mb: 2 
                                        }}>
                                            <Typography variant="h6" fontWeight="bold">
                                                🏷️ Product Variants ({values.variants.length})
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    startIcon={<Download />}
                                                    onClick={() => exportToCSV(values.variants)}
                                                    variant="outlined"
                                                >
                                                    Export CSV
                                                </Button>
                                                <Button
                                                    size="small"
                                                    startIcon={<Upload />}
                                                    onClick={() => setCsvDialogOpen(true)}
                                                    variant="outlined"
                                                >
                                                    Import CSV
                                                </Button>
                                                <ToggleButtonGroup
                                                    value={viewMode}
                                                    exclusive
                                                    onChange={(e, newMode) => newMode && setViewMode(newMode)}
                                                    size="small"
                                                >
                                                    <ToggleButton value="matrix">
                                                        <ViewModule />
                                                    </ToggleButton>
                                                    <ToggleButton value="list">
                                                        <ViewList />
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </Box>
                                        </Box>
                                        <Divider sx={{ mb: 2 }} />
                                        
                                        <FieldArray name="variants">
                                            {({ remove }) => (
                                                viewMode === 'matrix' ? (
                                                    <MatrixView 
                                                        values={values} 
                                                        setFieldValue={setFieldValue} 
                                                    />
                                                ) : (
                                                    <ListView 
                                                        values={values} 
                                                        setFieldValue={setFieldValue}
                                                        remove={remove}
                                                    />
                                                )
                                            )}
                                        </FieldArray>
                                    </Paper>
                                </Grid>
                            )}

                            {/* Advanced Options (Collapsible) */}
                            <Grid size={12}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography variant="h6" fontWeight="bold">
                                            ⚙️ Advanced Options
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Brand"
                                                    value={values.brand}
                                                    onChange={(e) => setFieldValue('brand', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Tags (comma separated)"
                                                    placeholder="e.g., summer, casual, trending"
                                                    onChange={(e) => {
                                                        const tags = e.target.value
                                                            .split(',')
                                                            .map(tag => tag.trim())
                                                            .filter(tag => tag);
                                                        setFieldValue('tags', tags);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Meta Title (SEO)"
                                                    value={values.metaTitle}
                                                    onChange={(e) => setFieldValue('metaTitle', e.target.value)}
                                                    inputProps={{ maxLength: 60 }}
                                                    helperText={`${values.metaTitle.length}/60 characters`}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Meta Description (SEO)"
                                                    value={values.metaDescription}
                                                    onChange={(e) => setFieldValue('metaDescription', e.target.value)}
                                                    inputProps={{ maxLength: 160 }}
                                                    helperText={`${values.metaDescription.length}/160 characters`}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            {/* Submit Buttons */}
                            <Grid size={12}>
                                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                        <Button 
                                            variant="outlined" 
                                            size="large"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={isSubmitting || values.variants.length === 0}
                                            startIcon={<Save />}
                                            sx={{ minWidth: 150 }}
                                        >
                                            {isSubmitting ? 'Saving...' : 'Save as Draft'}
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            color="success"
                                            disabled={isSubmitting || values.variants.length === 0}
                                            startIcon={<Publish />}
                                            sx={{ minWidth: 150 }}
                                            onClick={() => setFieldValue('status', 'active')}
                                        >
                                            {isSubmitting ? 'Publishing...' : 'Publish Product'}
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

            {/* CSV Import Dialog */}
            <Dialog 
                open={csvDialogOpen} 
                onClose={() => setCsvDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Import Variants from CSV</DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        CSV should have columns: Size, Color, Color Code, Price, Quantity
                    </Alert>
                    <TextField
                        fullWidth
                        multiline
                        rows={10}
                        label="Paste CSV data here"
                        value={csvImportData}
                        onChange={(e) => setCsvImportData(e.target.value)}
                        placeholder="Size,Color,Color Code,Price,Quantity&#10;S,Red,#FF0000,29.99,100&#10;M,Blue,#0000FF,29.99,150"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCsvDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => {
                            // Access setFieldValue from Formik context
                            // In real implementation, you'd need to pass this from parent
                            setCsvDialogOpen(false);
                        }}
                        variant="contained"
                    >
                        Import
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default NewAddProduct;