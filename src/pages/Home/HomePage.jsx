import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
const Home = () => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    };
    return (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
                width: window.innerWidth, // Dynamic width based on screen size
                height: window.innerHeight, // Dynamic height based on screen size
                facingMode: 'user', // Front camera
            }}
          />
          <button onClick={capture}>Capture Photo</button>
    
          {image && (
            <div>
              <h2>Captured Image:</h2>
              <img src={image} alt="Captured" />
            </div>
          )}
        </div>
      );
}

export default Home