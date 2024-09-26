import React, { useRef, useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useLocation } from 'react-router-dom';
const Camera = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/plantapp/scan') {
      startCamera();
    } else {
      stopCamera();
      console.log('stop camera');
    }

    // Clean up function to stop camera when component unmounts
    return () => {
      stopCamera();
    };
  }, [location.pathname]);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported by your browser.');
      console.error('getUserMedia is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (err) {
      console.error('Error accessing camera: ', err);
      setError('Error accessing the camera. Please try again.');
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }}></video>
      <br />
      {isCameraOn &&
      <Fab onClick={startCamera} sx={{ position:'fixed', left:'43%',bottom:'9%'}} color="primary" aria-label="add">
      <CenterFocusStrongIcon/>
      </Fab>
       }
    </div>
  );
};

export default Camera;
