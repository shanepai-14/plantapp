import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Fade, Typography,Button,Stack } from "@mui/material";
import Logo from "/plantlogo.png";
import Bg from "/plantbg1.jpg";
import { Link } from 'react-router-dom';
const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating a 3-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
      }}
    >
      <Fade in={loading} timeout={1000}>
        <Box
          sx={{
            marginTop: 3,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            height: "100vh",
            position: "relative",
            display: loading ? "flex" : "none"
          }}
        >
          <img src={Logo} alt="Plant ID Logo" width={150} />
          <Box sx={{ position: "absolute", bottom: 50 }}>
            <CircularProgress size={60} />
          </Box>
        </Box>
      </Fade>
      <Fade in={!loading} timeout={1000}>
        <Box
          sx={{
            textAlign: "center",
            backgroundImage: `url(${Bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: " cover",
            height: "100vh",
            width:'100%',
            display: !loading ? "flex" : "none",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
            flexDirection: "column"
          }}
        >
         <Box mt={3}>
         <img src={Logo} alt="Plant ID Logo" width={100} />
          <Typography variant="h5" sx={{fontWeight:'bold',marginBottom:2}}>PLANT ID</Typography>
          <Typography variant="body1">
            Best app for your plants
          </Typography>
         </Box>
         <Stack spacing={2} sx={{ width: 150, marginBottom: 15 }}>
      <Button
        component={Link}
        to="/login" // Route for Log in
        variant="contained"
        size="large"
        sx={{ boxShadow: 10 }}
        color="primary"
      >
        Log in
      </Button>

      <Button
        component={Link}
        to="/signup" // Route for Sign up
        variant="contained"
        size="large"
        sx={{ boxShadow: 10 }}
        color="secondary"
      >
        Sign up
      </Button>
    </Stack>
        </Box>
      </Fade>
    </Box>
  );
};

export default LoadingScreen;
