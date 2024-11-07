import React, { useRef, useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useLocation } from 'react-router-dom';

const Camera = ({ sendImageToApi }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // Keep track of the stream
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported by your browser.');
      return;
    }

    // Stop any existing stream before starting a new one
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          facingMode: 'environment' // Prefer back camera on mobile devices
        }
      });
      
      // Store the stream reference
      streamRef.current = stream;
      
      // Only set the video source if the video element exists and we're still on the scan page
      if (videoRef.current && location.pathname === '/scan') {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
        setError(null);
      } else {
        // If we're not on the scan page anymore, cleanup immediately
        stopCamera();
      }
    } catch (err) {
      setError('Error accessing the camera. Please try again.');
      console.error('Camera error:', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const handleCamera = async () => {
      if (location.pathname === '/scan' && mounted) {
        await startCamera();
      } else {
        stopCamera();
      }
    };

    handleCamera();

    // Cleanup function
    return () => {
      mounted = false;
      stopCamera();
    };
  }, [location.pathname]);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Only capture if video is actually playing
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.warn('Video not ready for capture');
      return;
    }

    // Set canvas dimensions to match the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
      sendImageToApi(base64Image);
    } catch (err) {
      console.error('Error capturing image:', err);
      setError('Failed to capture image. Please try again.');
    }
  };

  return (
    <div>
      {error && (
        <p style={{ 
          color: 'red', 
          textAlign: 'center', 
          padding: '10px',
          backgroundColor: 'rgba(255,0,0,0.1)',
          borderRadius: '4px',
          margin: '10px'
        }}>
          {error}
        </p>
      )}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{ 
          width: '100%', 
          height: '100vh',
          maxHeight: '100vh',
          objectFit: 'cover'
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {isCameraOn && (
        <Fab 
          onClick={captureImage} 
          sx={{ 
            position: 'fixed', 
            left: '50%', 
            bottom: '9%',
            transform: 'translateX(-50%)'
          }} 
          color="primary" 
          aria-label="capture"
        >
          <CenterFocusStrongIcon />
        </Fab>
      )}
    </div>
  );
};

export default Camera;