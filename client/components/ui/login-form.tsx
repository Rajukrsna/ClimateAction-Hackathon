'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from '@mui/material'
import { login } from '@/api/login'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await login(email, password)

      if (!response.success) {
        setError('Invalid credentials. Please try again.')
        return
      }
      alert("succesful login")
      //router.push('/homepage')
    } catch (error) {
      console.error('Login failed', error)
      setError('Login failed. Please check your credentials and try again.')
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Card sx={{ maxWidth: 480, width: '100%', p: 3 }}>
        <CardHeader
          title={<Typography variant="h5">Login</Typography>}
          subheader="Enter your email below to login to your account"
        />

        <CardContent>
          <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              required
              fullWidth
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={
                <Link href="#" underline="hover" variant="body2" sx={{ float: 'right' }}>
                  Forgot your password?
                </Link>
              }
            />

            {error && (
              <Typography variant="body2" color="error" mt={1}>
                {error}
              </Typography>
            )}
          </Box>
        </CardContent>

        <CardActions sx={{ flexDirection: 'column', gap: 2, px: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={handleLogin}>
            Login with Google
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
