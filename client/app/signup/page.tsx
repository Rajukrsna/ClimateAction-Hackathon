'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Link,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { signup } from '@/api/signup'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState('/profile-picture-placeholder.svg')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setProfilePicture(reader.result as string)
      }
    }
  }

  const handleSignUp = async () => {
    try {
      await signup(name, email, password, profilePicture)
      alert("successfull signin");
      //router.push('/homepage')
    } catch (error) {
      console.error('Sign-up failed', error)
      setError('Sign-up failed. Please check your details and try again.')
    }
  }

  const handleNavigation = () => {
    router.push('/')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      {/* Navigation */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={1}
        borderColor="divider"
        px={2}
        py={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Climate
        </Typography>
        <Button onClick={handleNavigation} variant="text">
          Login
        </Button>
      </Box>

      {/* Form Section */}
      <Box display="flex" justifyContent="center" mt={8} px={2}>
        <Card sx={{ width: '100%', maxWidth: 480 }}>
          <CardHeader
            title={<Typography variant="h5">Sign Up to your Account</Typography>}
            subheader="Enter in your name, email and password to Sign Up"
          />

          <CardContent>
            <Box component="form" display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Name"
                type="text"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={previewUrl} sx={{ width: 64, height: 64 }} />
                <label htmlFor="profile-picture">
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Button variant="outlined" component="span">
                    Upload Profile Picture
                  </Button>
                </label>
              </Box>

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
            </Box>
          </CardContent>

          <CardActions sx={{ flexDirection: 'column', px: 2, pb: 3 }}>
            <Button onClick={handleSignUp} variant="contained" fullWidth>
              Sign Up
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}
