import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AuthComponent from './pages/Auth/AuthComponent';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AuthProvider } from './AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/Home/HomePage';
const theme = createTheme({
  palette: {
    primary: {
      main: '#569033', // Your specified green color
      light: '#7ab356',
      dark: '#3d6f14',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2c5530', // A darker green for contrast
      light: '#527b55',
      dark: '#0d3110',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f9f4', // A very light green for the background
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#34495e',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f39c12',
    },
    info: {
      main: '#3498db',
    },
    success: {
      main: '#2ecc71',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevents all-caps button text
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/plant-app/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <PrivateRoute><Layout /></PrivateRoute>,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      // {
      //   path: 'profile',
      //   element: <ProfilePage />,
      // },
      // {
      //   path: 'settings',
      //   element: <SettingsPage />,
      // },
    ],
  },
]);

function App() {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
     
    </ThemeProvider>
  );
}

export default App;