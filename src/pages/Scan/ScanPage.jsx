import React, { useEffect, useState } from 'react';
import Camera from '../../components/Camera'
import { Button, Modal, CircularProgress, Box, Typography ,LinearProgress} from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_IDENTIFICATION_URL,API_KEY , API_URL} from '../../utils/endpoint';
import PlantIdentifyModal from '../../components/PlantIdentifyModal';
import PlantDetailsModal from '../../components/PlantDetailsModal';
import { fetchFavorites } from '../../data';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const ScanPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlantToken, setSelectedPlantToken] = useState(null);
  const [progress, setProgress] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [plantListLoading,setPlantListLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleError = () => {
    setOpen(true);  // Open the Snackbar with the error message
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return; // Prevents closing on clickaway if needed
    setOpen(false);  // Close the Snackbar
  };

  useEffect(() => {

    loadFavorites();

    let timer;
    if (isLoading) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isLoading]);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        const response = await axios.post(
          API_IDENTIFICATION_URL,
          {
            images: [base64Image],
            latitude: 7.061504,
            longitude: 125.5899136,
            similar_images: true
          },
          {
            headers: {
              'Api-Key': API_KEY,
              'Content-Type': 'application/json'
            }
          }
        );

        setResult(response.data);
        console.log(response.data);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error identifying plant:', error);
        handleError();
    
      } finally {
        setIsLoading(false);
        setProgress(100);
      }
    };
  };

  const loadFavorites = async () => {
    const favors = await fetchFavorites();
    console.log(favors)
    setFavorites(favors);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setResult(null);
  };
  const handleCloseModalPlantDetails = () => {
      setModalOpen(false);
      console.log(modalOpen,false);
      setSelectedPlantToken(null);
  };

  const handleOpenPlantDetails = async (name) => {
    setPlantListLoading(true)
    try {
      const response = await fetch(`${API_URL}/name_search?q=${encodeURIComponent(name)}&thumbnails=true`, {
        headers: {
          'Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.entities && data.entities.length > 0) {
        console.log(name,data.entities);
        setSelectedPlantToken(data.entities[0].access_token);
      } else {
        console.warn('No plant data found for:', name);
      }
  
    } catch (error) {
      console.error('Error fetching plant details:', error);
      handleError();
    } finally {
      setModalOpen(true);
      setPlantListLoading(false)
    }
  };
  const sendImageToApi = async (base64Image) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        API_IDENTIFICATION_URL,
        {
          images: [base64Image],
          latitude: 7.061504,
          longitude: 125.5899136,
          similar_images: true
        },
        {
          headers: {
            'Api-Key': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      setResult(response.data);
      console.log(response.data);
      setIsModalOpen(true);
      // Handle response as needed
    } catch (error) {
      console.error('Error identifying plant:', error);
      handleError();
    } finally {
      setIsLoading(false);
    }
  };
 
    return (
        <div style={{ height:'100%'}}>
                 {isLoading && (
                  <Box sx={{
                    position: "fixed", // Fix position to the modal
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "rgba(192,192,192,0.6)",
                    zIndex:99999
                  }}>
                    <LinearProgress sx={{width:'80%'}} variant="determinate" value={progress} />
                    <Typography variant="h2" sx={{  }}>
                    {progress.toFixed(0)}%
                    </Typography>
                      <Typography variant="body1" >
                        Identifying plant...
                      </Typography>
                  </Box>
                )}
         <Camera sendImageToApi={sendImageToApi}/>
     <Box sx={{ position:'fixed', left:'15%',bottom:'10%'}}>
     <input
        accept="image/*"
        style={{ display: 'none',zIndex:999 }}
        id="plant-image-upload"
        type="file"
        onChange={handleFileChange}
      />
       <label htmlFor="plant-image-upload">
        <Button disabled={isLoading}  component="span">
         {isLoading ? <CircularProgress size={24} /> : <FolderIcon size={24}  color="primary"/>}
        </Button>
        </label>
     </Box>
   {result && <PlantIdentifyModal plantListLoading={plantListLoading} handleOpenPlantDetails={handleOpenPlantDetails} open={isModalOpen} PlantDetails={result} handleClose={handleCloseModal}/>}

   <PlantDetailsModal
        open={modalOpen}
        handleClose={handleCloseModalPlantDetails}
        accessToken={selectedPlantToken}
        favorites={favorites}
      />
          <Snackbar   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error identifying plant. Please try again.
        </MuiAlert>
      </Snackbar>
     
        </div>
      );
}

export default ScanPage