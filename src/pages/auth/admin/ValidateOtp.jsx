import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Iconify from 'components/base/Iconify'
import { useTheme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const OTP_LENGTH = 6

const ValidateOtp = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(300)
  const [isSubmitting, setIsSubmitting] = useState(false) 
  const inputRefs = useRef([])

  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTimer = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const updated = [...otp]
    updated[index] = value.slice(-1)
    setOtp(updated)
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, OTP_LENGTH)
    if (!/^\d+$/.test(pasted)) return
    const updated = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((char, i) => { updated[i] = char })
    setOtp(updated)
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''))
    setTimer(300)
    inputRefs.current[0]?.focus()
  }

  // ✅ clean submit handler
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const otpValue = otp.join('');
      const payload = {
        email: "tej7272@gmail.com",
        otp: otpValue
      }
      const res = await axios.post("http://192.168.1.15:8080/api/v1/admin/auth/validate", payload);
      console.log("res otp", res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const otpValue = otp.join('')

  return (
    <Box className="animate-fadeSlideUp" sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Card elevation={0}>
        <Box sx={{ p: { xs: 3, sm: 4.5 } }}>

          {/* Back button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <IconButton
              onClick={() => navigate('/admin/auth/login')}
              size="small"
              sx={{ border: `1px solid ${theme.palette.divider}` }}
            >
              <Iconify icon="eva:arrow-left-fill" width={18} />
            </IconButton>
            <Typography variant="body2" color="text.secondary">Back</Typography>
          </Box>

          {/* Icon + title */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: theme.palette.primary.lighter,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
              }}
            >
              <Iconify icon="eva:email-outline" width={24} color="primary.main" />
            </Box>

            <Typography variant="h6">Check your email</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              We sent a 6-digit code to{' '}
              <Typography component="span" variant="body2" fontWeight={500} color="text.primary">
                tej7272@gmail.com
              </Typography>
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* OTP boxes */}
          <Stack direction="row" spacing={1.5} mb={2}>
            {otp.map((digit, index) => (
              <Box
                key={index}
                component="input"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                sx={{
                  width: '100%',
                  height: 52,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  borderRadius: 2,
                  border: '1.5px solid',
                  borderColor: digit ? 'primary.main' : 'divider',
                  background: digit ? theme.palette.primary.lighter : 'background.paper',
                  color: digit ? 'primary.main' : 'text.primary',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                  cursor: 'text',
                  '&:focus': {
                    borderColor: 'primary.main',
                    boxShadow: `0 0 0 3px ${theme.palette.primary.lighter}`,
                  },
                }}
              />
            ))}
          </Stack>

          {/* Timer */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
            <Typography variant="body2" color="text.secondary">
              Code expires in
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                color: timer <= 60 ? 'error.main' : 'warning.main',
                background: timer <= 60
                  ? theme.palette.error.lighter
                  : theme.palette.warning.lighter,
                px: 1.5,
                py: 0.3,
                borderRadius: 1,
              }}
            >
              {formatTimer(timer)}
            </Typography>
          </Stack>

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            disabled={isSubmitting || otpValue.length < OTP_LENGTH}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Verifying...' : 'Verify code'}
          </Button>

          {/* Resend */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Didn't receive it?{' '}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              color={timer > 0 ? 'text.disabled' : 'primary'}
              sx={{
                cursor: timer > 0 ? 'not-allowed' : 'pointer',
                fontWeight: 500,
                '&:hover': timer === 0 ? { textDecoration: 'underline' } : {},
              }}
              onClick={timer === 0 ? handleResend : undefined}
            >
              Resend code
            </Typography>
          </Box>

        </Box>
      </Card>
    </Box>
  )
}

export default ValidateOtp