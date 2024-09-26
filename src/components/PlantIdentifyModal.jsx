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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlantList from "./PlantList";





const PlantIdentifyModal = ({ open, handleClose, PlantDetails,handleOpenPlantDetails }) => {

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
        <IconButton
            color="default"
          onClick={handleClose}
          sx={{
            position: "fixed", // Fix position to the modal
            top: 10,
            right: 10,
            backgroundColor:"rgba(255, 255, 255, 0.5)"
          }}
        >
          <CloseIcon sx={{color:'black'}}/>
        </IconButton>
    
            <img
              src={PlantDetails.input.images[0]}
              alt={PlantDetails.access_token}
              style={{ width: "100%", zIndex: -1, position: "relative" }}
            />

            <Box
              sx={{
                p: 4,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "white",
                marginTop: "-20px",
                zIndex: 999,
              }}
            >
              <Typography
                id="plant-details-modal"
                variant="h4"
                sx={{ fontWeight: "bold" }}
                component="h2"
              >
               Suggestions
              </Typography>
              
              <PlantList handleOpenPlantDetails={handleOpenPlantDetails} plants={PlantDetails.result.classification.suggestions}/>
         
            </Box>
  
      </Box>
    </Modal>
  );
};

export default PlantIdentifyModal;
