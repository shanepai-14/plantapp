import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Button,
  IconButton,
  Tabs,
  Tab,
  LinearProgress
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from "@mui/icons-material/Close";
import PlantList from "./PlantList";
import YardIcon from "@mui/icons-material/Yard";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { API_KEY,API_HEALTH_DIAGNOSES_URL } from "../utils/endpoint";
import PlantDiagnosis from "./PlantDiagnosis";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PlantDiagnosisDetails from "./PlantDiagnosisDetails";
const PlantIdentifyModal = ({
  open,
  handleClose,
  PlantDetails,
  handleOpenPlantDetails,
  plantListLoading
}) => {
  const [value, setValue] = useState(0);
  const [plantDiagnosis, setPlantDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDiagnosis ,setSelectedDiagnosis] = useState(null);
  const [back, setBack] = useState(true);
  const handleChange = (event, newValue) => {
    if (newValue === 1 && !plantDiagnosis) {

      diagnosePlant();
  
    }

    setValue(newValue);
  };
  const handleSelectedDiagnosis = (diagnosis) => {
    setBack(false);
    setSelectedDiagnosis(diagnosis);
    console.log(diagnosis)
  };

  const handleBack = () => {
    setBack(true);
    setSelectedDiagnosis(null);
  };

  useEffect(() => {
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

  const diagnosePlant = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_HEALTH_DIAGNOSES_URL, {
        images: PlantDetails.input.images,
        latitude: 49.207, // You might want to replace these with actual values if available
        longitude: 16.608,
        similar_images: true,
      }, {
        headers: {
          'Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        params: {
          language: 'en',
          details: 'local_name,description,url,treatment,classification,common_names,cause',
        },
      });

      setPlantDiagnosis(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error diagnosing plant:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="plant-details-modal"
      aria-describedby="plant-details-description"
    >
   
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          height: "100vh",
          overflowY: "auto",
        }}
      >
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
            <Typography variant="body1" sx={{  }}>
              Diagnosing plant...
            </Typography>
        </Box>
      )}
        <IconButton
          color="default"
          onClick={handleClose}
          disabled={isLoading}
          sx={{
            position: "fixed", // Fix position to the modal
            top: 10,
            right: 10,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <CloseIcon sx={{ color: "black" }} />
        </IconButton>
        <img
          src={PlantDetails.input.images[0]}
          alt={PlantDetails.access_token}
          style={{ width: "100%", zIndex: -1, position: "relative" }}
        />

        <Box
          sx={{
            p: 4,
            pt: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "white",
            marginTop: "-20px",
            zIndex: 999,
            position: "relative"
          }}
        >
             <Button
            size="large"
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={value == 0 ? <YardIcon fontSize="20px" /> : <MonitorHeartIcon />}
            sx={{ position: 'absolute',top: -50,left: 10}}
          >
            {value == 0
              ? PlantDetails?.result?.is_plant 
                ? (PlantDetails.result.is_plant.probability * 100).toFixed(0) + '% Plant'
                : "Loading..."
              : plantDiagnosis?.result?.is_healthy 
                ? (plantDiagnosis.result.is_healthy.probability * 100).toFixed(0) + "% Healthy"
                : "Loading..."}
            
          </Button>
          <Box display="flex" justifyContent="center">
            {/* <Typography
                id="plant-details-modal"
                variant="h4"
                sx={{ fontWeight: "bold" }}
                component="h2"
              >
               Suggestions
              </Typography> */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon label tabs example"
              disabled={isLoading}
              variant="fullWidth"
            >
              <Tab icon={<CenterFocusWeakIcon />} label="Suggestions" />
              <Tab icon={<HealthAndSafetyIcon />} label="Diagnose" />
            </Tabs>
          
          </Box>

          {value === 0 && (
            <PlantList
              handleOpenPlantDetails={handleOpenPlantDetails}
              plants={PlantDetails.result.classification.suggestions}
              loading={plantListLoading} 
            />
          )}

            {value === 1 && plantDiagnosis && (
            <div>
                {!back && (
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    variant="outlined"
                    sx={{ marginBottom: 2,marginTop:2 }}
                  >
                    Back to List
                  </Button>
                )}
             {back && selectedDiagnosis == null && <PlantDiagnosis plants={plantDiagnosis.result.disease.suggestions} handleSelectedDiagnosis={handleSelectedDiagnosis}/>}

             {selectedDiagnosis != null && !back && <PlantDiagnosisDetails plantDetails={selectedDiagnosis} />}

            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PlantIdentifyModal;
