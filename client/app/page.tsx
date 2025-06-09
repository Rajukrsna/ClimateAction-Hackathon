'use client'

import { Button, Box, AppBar, Toolbar, Typography, Container, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/ui/login-form'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/signup')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleNavigation} color="primary">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ flexGrow: 1, mt: { xs: 8, sm: 12 } }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Left Section - Branding/Image */}
          <Grid item xs={12} sm={6} textAlign="center">
            {/* You can add your logo or illustration here */}
            
          </Grid>

          {/* Right Section - Login Form */}
          <Grid item xs={12} sm={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
