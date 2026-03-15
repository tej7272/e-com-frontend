import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Iconify from 'components/base/Iconify';
import { useDispatch } from 'react-redux';
import { adminUserLogin } from 'store/slices/auth/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'routes/paths';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
  email:    Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, {isSubmitting}) => {
    const res = await dispatch(adminUserLogin(values)).unwrap();
    if(res.success){
      navigate(PATHS.admin.auth.validate);
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 380,
        mx: 'auto',
        animation: 'fadeSlideUp 0.5s ease both',
        '@keyframes fadeSlideUp': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Card
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4.5 },
          borderRadius: 4,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(99,102,241,0.10), 0 1.5px 8px rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -1,
            left: '15%',
            right: '15%',
            height: '3px',
            borderRadius: '0 0 8px 8px',
            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
          },
        }}
      >
        {/* Brand / Icon */}
        <Box sx={{ textAlign: 'center', mb: 3.5 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            }}
          >
            <Iconify icon="eva:lock-outline" width={25} sx={{ color: '#fff'}} />
          </Box>

          <Typography variant="h5">
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: 'text.secondary' }}
          >
            Sign in to continue to your dashboard
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                
                <Grid size={12}>
                    <Field name="email">
                        {({ field, meta }) => (
                            <TextField
                                {...field}
                                fullWidth
                                // label="Email address"
                                placeholder="Email address"
                                required
                                error={Boolean(meta.touched && meta.error)}
                                helperText={meta.touched && meta.error}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Iconify icon="eva:email-outline" width={18} color="primary.main" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    </Field>
                </Grid>

                {/* Password */}
                <Grid size={12}>
                    <Field name="password">
                        {({ field, meta }) => (
                            <TextField
                                {...field}
                                fullWidth
                                // label="Password"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                error={Boolean(meta.touched && meta.error)}
                                helperText={meta.touched && meta.error}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon="eva:lock-outline" width={18} color="primary.main" />
                                    </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                edge="end"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                <Iconify
                                                    icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                                    width={18}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    </Field>
                </Grid>
              </Grid>

              {/* Forgot password */}
              <Box sx={{ textAlign: 'right', mt: 1, mb: 3 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#6366f1',
                    cursor: 'pointer',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  <Link to={PATHS.admin.auth.forgotPassword}>
                    Forgot password?
                  </Link>
                </Typography>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f52e0 0%, #9333ea 100%)',
                  },
                }}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  )
}

export default LoginForm