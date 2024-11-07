import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link,
  Fade
} from '@mui/material';
import Logo from '/plantlogo.png';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = email ? (email.includes('@') ? '' : 'Invalid email address') : 'Email is required';
    tempErrors.password = password ? (password.length >= 6 ? '' : 'Password must be at least 6 characters') : 'Password is required';
    tempErrors.confirmPassword = confirmPassword ? (confirmPassword === password ? '' : 'Passwords do not match') : 'Please confirm your password';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(email, password);
        navigate('/home');
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ ...errors, submit: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Fade in={fadeIn} timeout={1000}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: "100vh"
          }}
        >
          <img src={Logo} alt="Plant ID Logo" width="80" style={{marginBottom: 29}}/>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.submit}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}

export default Register;