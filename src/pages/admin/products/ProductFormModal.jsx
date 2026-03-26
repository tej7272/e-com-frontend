// components/admin/products/ProductFormModal.jsx
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Stepper, Step, StepLabel, Box, LinearProgress,
  Divider,
  Stack,
  Typography,
  IconButton,
} from '@mui/material'
import Iconify from 'components/base/Iconify'
import BasicInfoStep from './components/BasicInfoStep'
import MediaStep from './components/MediaStep'
import OrganisationStep from './components/OrganisationStep'
import VariantsStep from './components/VariantsStep'

const STEPS = ['Basic info', 'Media', 'Organisation', 'Variants']

const stepValidations = [
  Yup.object({
    name: Yup.string().required('Product name is required'),
    tags: Yup.array().min(1, 'At least one variant required'),
    isActive: Yup.boolean(),
    description: Yup.string().required('Description is required'),
  }),
  Yup.object({
    images: Yup.array().min(1, 'At least one image is required'),
  }),
  Yup.object({
    category: Yup.string().required('Category is required'),
    subCategory: Yup.string().required('Sub-category is required'),
    brand: Yup.string().required('Brand is required'),
    sizes: Yup.array().min(1, 'Select at least one size'),
    colors: Yup.array().min(1, 'Select at least one color'),
  }),
  Yup.object({
    variants: Yup.array().of(
      Yup.object({
        mrp:   Yup.number().typeError('Required').min(1, 'Must be at least 1').required('Required'),
        price: Yup.number().typeError('Required').min(1, 'Must be at least 1').required('Required'),
        stock: Yup.number().typeError('Required').min(0, 'Cannot be negative').required('Required'),
        sku:   Yup.string().required('SKU is required'),
      })
    ).min(1, 'At least one variant required'),
  }),
]

const initialValues = {
  name: '',
  tags: [],
  isActive: true,
  description: '',
  images: [],
  category: '',
  subCategory: '',
  brand: '',
  sizes: [],
  colors: [],
  variants: [],
}

const ProductFormModal = ({ open, onClose, selectedData }) => {
  const dispatch  = useDispatch()
  const [step, setStep] = useState(0)

  const isFirst = step === 0
  const isLast  = step === STEPS.length - 1

  const handleClose = (resetForm) => {
    resetForm(initialValues)
    setStep(0)
    onClose()
  }

  const handleNext = async (validateForm, setTouched, values) => {
    const currentSchema = stepValidations[step]
    const fields = Object.keys(currentSchema.fields)
    const touched = fields.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(touched)

    console.log("vaues", values)

    try {
      await currentSchema.validate(values, { abortEarly: false })
      setStep(s => s + 1)
    } catch (err) {
    }
  }

  const handleBack = () => setStep(s => s - 1)

  const handleSubmit = (values, { setSubmitting }) => {
     console.log("vaues", values)
    
  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <LinearProgress
        variant="determinate"
        value={((step + 1) / STEPS.length) * 100}
        sx={{ height: 2 }}
      />

      <DialogTitle sx={{ pb: 1, pr: 6 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          
          <Iconify
            icon={selectedData?._id ? "solar:pen-bold" : "solar:add-circle-bold"}
            width={22}
          />

          <Typography variant="h6" fontWeight={600}>
            {selectedData?._id ? 'Update Product' : 'Add Product'}
          </Typography>

        </Stack>

        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
          }}
        >
          <Iconify icon="solar:close-circle-linear" />
        </IconButton>
      </DialogTitle>
      <Divider />

      <Box sx={{ px: 3, py: 3 }}>
        <Stepper activeStep={step} nonLinear>
          {STEPS.map((label, index) => (
            <Step key={label} completed={index < step}> 
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Formik
        initialValues={{
          name: '',
          tags: [],
          description: '',
          isActive: true,
          images: [],
          category: '',
          subCategory: '',
          brand: '',
          sizes: [],
          colors: [],
          variants: [],
        }}
        validationSchema={stepValidations[step]}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, validateForm, setTouched, isSubmitting, resetForm }) => (
          <Form>
            <DialogContent dividers sx={{ maxHeight: '55vh' }}>
              {step === 0 && <BasicInfoStep  />}
              {step === 1 && <MediaStep />}
              {step === 2 && <OrganisationStep />}
              {step === 3 && <VariantsStep />}
            </DialogContent>

            <DialogActions>
              <Stack direction='row' spacing={1} justifyContent='flex-end'>
                  {isFirst && (
                    <Button variant="outlined" onClick={onClose}>
                      <Iconify icon='solar:undo-left-round-linear' sx={{ mr: .5 }} />
                      Cancel
                    </Button>
                  )}
                    {!isFirst && (
                        <Button onClick={handleBack}>
                          <Iconify icon='solar:arrow-left-outline' sx={{ mr: 0.5 }} />
                           Back
                          </Button>
                      )}
                    {!isLast ? (
                        <Button
                          variant="contained"
                          onClick={() => handleNext(validateForm, setTouched, values)}
                          sx={{ mr: 2 }}
                        >
                          Next
                          <Iconify icon='solar:arrow-right-outline' sx={{ ml: 0.5 }} />
                        </Button>
                      ) : (
                        <Button variant="contained"  type="submit" disabled={isSubmitting} sx={{ mr: 2 }}>
                          <Iconify icon='eva:save-outline' sx={{mr: .5}}/>
                          {isSubmitting
                            ? 'Saving...'
                            : selectedData?._id ? 'Update product' : 'Create product'
                          }
                        </Button>
                    )}
              </Stack>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default ProductFormModal