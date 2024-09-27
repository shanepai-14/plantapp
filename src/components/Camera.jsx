import React, { useRef, useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useLocation } from 'react-router-dom';

const Camera = ({ sendImageToApi }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Ref for the canvas to capture image
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();


  useEffect(() => {
    if (location.pathname === '/plantapp/scan') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [location.pathname]);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported by your browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (err) {
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

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Set canvas dimensions to match the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1]; // Get base64 image without the data header

    sendImageToApi(base64Image); // Send captured image to API
  };

 

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* Hidden canvas to capture image */}
      <br />
      {isCameraOn && (
        <Fab onClick={captureImage} sx={{ position: 'fixed', left: '43%', bottom: '9%' }} color="primary" aria-label="capture">
          <CenterFocusStrongIcon />
        </Fab>
      )}
    </div>
  );
};

export default Camera;
