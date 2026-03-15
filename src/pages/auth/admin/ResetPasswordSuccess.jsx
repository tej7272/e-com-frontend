import {
  Box, Button, Card,
  Divider, Typography,
} from '@mui/material'
import Iconify         from 'components/base/Iconify'
import { useTheme }    from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { PATHS }       from 'routes/paths'

const ResetPasswordSuccess = () => {
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
          <Box sx={{
            width: 64, height: 64, borderRadius: '50%',
            background: theme.palette.success.lighter,
            display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', mb: 2,
          }}>
            <Iconify icon="eva:checkmark-outline" width={32} color="success.main" />
          </Box>

          <Typography variant="h6" mb={0.5}>Password reset!</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Your password has been reset successfully.
            You can now sign in with your new password.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Back to login */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate(PATHS.admin.auth.login)}
          >
            Back to login
          </Button>

      </Card>
    </Box>
  )
}

export default ResetPasswordSuccess