import {
  Box, Button, Card, Divider,
  IconButton, InputAdornment,
  TextField, Typography,
} from '@mui/material'
import { useState } from 'react'
import Iconify from 'components/base/Iconify'
import { useTheme } from '@emotion/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PATHS } from 'routes/paths'
import ResetPasswordSuccess from './ResetPasswordSuccess'
import { useDispatch } from 'react-redux'
import { resetAdminPassword } from 'store/slices/auth/adminAuthSlice'

const ResetPassword = () => {
  const theme = useTheme()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({
    newPassword:     '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  // ─── redirect if no token ─────────────────────────────────
  if (!token) {
    navigate(PATHS.admin.auth.login)
    return null
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })  // clear error on change
  }

  const validate = () => {
    const newErrors = {}
    if (!values.newPassword)
      newErrors.newPassword = 'Password is required'
    else if (values.newPassword.length < 8)
      newErrors.newPassword = 'Password must be at least 8 characters'
    if (!values.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password'
    else if (values.newPassword !== values.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    return newErrors
  }

  const handleSubmit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    try {
      setIsSubmitting(true)
      const res = await dispatch(resetAdminPassword({ token, newPassword: values.newPassword })).unwrap();
      if(res.success) setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) return <ResetPasswordSuccess />

  return (
    <Box className="animate-fadeSlideUp" sx={{ width: '100%', maxWidth: 380, mx: 'auto' }}>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <IconButton
              size="small"
              onClick={() => navigate(PATHS.admin.auth.login)}
              sx={{ border: `1px solid ${theme.palette.divider}` }}
            >
              <Iconify icon="eva:arrow-left-fill" width={18} />
            </IconButton>
            <Typography variant="body2" color="text.secondary">Back to login</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: 2,
              background: theme.palette.primary.lighter,
              display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', mb: 1.5,
            }}>
              <Iconify icon="eva:lock-outline" width={24} color="primary.main" />
            </Box>
            <Typography variant="h6">Set new password</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Must be at least 8 characters.
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <TextField
            fullWidth
            name="newPassword"
            placeholder="New password"
            type={showPassword ? 'text' : 'password'}
            value={values.newPassword}
            onChange={handleChange}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:lock-outline" width={18} color="primary.main" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small" edge="end"
                    onClick={() => setShowPassword((p) => !p)}
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

          {/* Confirm password */}
          <TextField
            fullWidth
            name="confirmPassword"
            placeholder="Confirm password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:lock-outline" width={18} color="primary.main" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small" edge="end"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                  >
                    <Iconify
                      icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      width={18}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            disabled={isSubmitting || !values.newPassword || !values.confirmPassword}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Resetting...' : 'Reset password'}
          </Button>
      </Card>
    </Box>
  )
}

export default ResetPassword