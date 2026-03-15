import {
  Box, Button, Card, Divider,
  IconButton, InputAdornment,
  TextField, Typography,
} from '@mui/material';
import { useState } from 'react';
import Iconify from 'components/base/Iconify';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATHS } from 'routes/paths';
import ForgotPasswordSuccess from './ForgotPasswordSuccess';
import { useDispatch } from 'react-redux';
import { forgotAdminPassword } from 'store/slices/auth/adminAuthSlice';

const ForgotPassword = () => {
  const theme = useTheme()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    try {
      setIsSubmitting(true)
        const res = await dispatch(forgotAdminPassword({email})).unwrap();
        if(res.success) setIsSubmitted(true)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    try {
        dispatch(forgotAdminPassword({ email }))
        toast.success('Reset link resent!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend')
    }
  }

  if (isSubmitted) {
    return <ForgotPasswordSuccess email={email} onResend={handleResend} />
  }

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
        {/* <Box sx={{ p: { xs: 3, sm: 4.5 } }}> */}

          {/* Back button */}
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

          {/* Icon + title */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: 2,
              background: theme.palette.primary.lighter,
              display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', mb: 1.5,
            }}>
              <Iconify icon="eva:lock-outline" width={24} color="primary.main" />
            </Box>
            <Typography variant="h6">Forgot password?</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              No worries! Enter your email and we'll send you a reset link.
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Email input */}
          <TextField
            fullWidth
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:email-outline" width={18} color="primary.main" />
                </InputAdornment>
              ),
            }}
          />

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            disabled={isSubmitting || !email}
            onClick={handleSubmit}
            
          >
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>

        {/* </Box> */}
      </Card>
    </Box>
  )
}

export default ForgotPassword