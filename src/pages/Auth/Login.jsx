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
import Logo from '../../../public/plantlogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = email ? (email.includes('@') ? '' : 'Invalid email address') : 'Email is required';
    tempErrors.password = password ? '' : 'Password is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(email, password);
        navigate('/plantapp/home');
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ ...errors, submit: 'Invalid email or password. Please try again.' });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Fade in={fadeIn} timeout={1000}>
        <Box
          bgcolor="background.default"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: "100vh",
          }}
        >
          <img src={Logo} alt="Plant ID Logo" width="80" style={{marginBottom: 29}}/>
          <Typography component="h1" variant="h5">
            Login
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
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
              Sign In
            </Button>
            <Link component={RouterLink} to="/plantapp/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}

export default Login;