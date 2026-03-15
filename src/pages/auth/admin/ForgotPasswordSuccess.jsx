import {
    Box, Button, Card, Divider,
    Stack, Typography,
} from '@mui/material'
import Iconify         from 'components/base/Iconify'
import { useTheme }    from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { PATHS }       from 'routes/paths'

const STEPS = [
  'Open the email we sent you',
  'Click the reset link inside',
  'Create your new password',
]

const maskEmail = (email) => {
  if (!email) return ''
  const [user, domain] = email.split('@')
  return `${user.slice(0, 2)}****@${domain}`
}

const ForgotPasswordSuccess = ({ email, onResend }) => {
  const theme    = useTheme()
  const navigate = useNavigate()

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

          {/* Success icon */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{
              width: 64, height: 64, borderRadius: '50%',
              background: theme.palette.success.lighter,
              display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', mb: 2,
            }}>
              <Iconify icon="eva:checkmark-outline" width={32} color="success.main" />
            </Box>

            <Typography variant="h6" mb={0.5}>Check your email</Typography>
            <Typography variant="body2" color="text.secondary">
              We sent a reset link to{' '}
              <Typography component="span" variant="body2" fontWeight={500} color="text.primary">
                {maskEmail(email)}
              </Typography>
            </Typography>
          </Box>

          <Divider sx={{ mb: 2.5 }} />

          {/* Steps */}
          <Stack spacing={1.5} mb={2.5} direction="column">
            {STEPS.map((step, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: theme.palette.primary.lighter,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <Typography variant="caption" color="primary.main" fontWeight={600}>
                    {index + 1}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{step}</Typography>
              </Box>
            ))}
          </Stack>

          {/* Expiry warning */}
          <Box sx={{
            background: theme.palette.warning.lighter,
            border: '0.5px solid',
            borderColor: 'warning.light',
            borderRadius: 2,
            px: 2, py: 1.2,
            display: 'flex', alignItems: 'center', gap: 1,
            mb: 2.5,
          }}>
            <Iconify icon="eva:clock-outline" width={16} color="warning.main" />
            <Typography variant="caption" color="warning.main">
              Link expires in <strong>30 minutes</strong>
            </Typography>
          </Box>

          {/* Back to login */}
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(PATHS.admin.auth.login)}
            sx={{ mb: 1.5 }}
          >
            Back to login
          </Button>

          {/* Resend */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Didn't receive it?{' '}
            </Typography>
            <Typography
              component="span" variant="caption"
              color="primary" fontWeight={500}
              sx={{ cursor: 'pointer' }}
              onClick={onResend}
            >
              Resend email
            </Typography>
          </Box>

      </Card>
    </Box>
  )
}

export default ForgotPasswordSuccess
// ```

// ---

// ## Folder structure
// ```
// pages/
// └── auth/
//     └── admin/
//         ├── LoginForm.jsx
//         ├── ValidateOtp.jsx
//         ├── ForgotPassword.jsx         ← form + logic
//         ├── ForgotPasswordSuccess.jsx  ← success screen
//         └── ResetPassword.jsx
// ```