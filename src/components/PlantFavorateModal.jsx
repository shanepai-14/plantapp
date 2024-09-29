import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { API_KEY, API_URL } from "../utils/endpoint";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { saveToFavorites } from "../data";


const DescriptionWithReadMore = ({ description }) => {
  const [showFullText, setShowFullText] = useState(false);
  const toggleShowText = () => setShowFullText(!showFullText);

  // Limit the number of characters shown when collapsed
  const textLimit = 215; // You can adjust this limit
  const isLongText = description.length > textLimit;
  const displayedText = showFullText
    ? description
    : `${description.slice(0, textLimit)}...`;

  return (
    <div>
      <Typography id="plant-details-description" sx={{ mt: 2 }}>
        {displayedText}
        {isLongText && (
          <Button onClick={toggleShowText}>
            {showFullText ? "Read Less" : "Read More"}
          </Button>
        )}
      </Typography>
    </div>
  );
};

const PlantTaxonomy = ({ plant }) => {
  const {
    class: plantClass,
    genus,
    order,
    family,
    phylum,
    kingdom,
  } = plant.taxonomy;

  const taxonomyString = `${kingdom}, ${phylum}, ${plantClass}, ${order}, ${family}, ${genus}`;

  return (
    <ListItemText
      primary="Taxonomy"
      primaryTypographyProps={{ fontWeight: "bold" }}
      secondary={taxonomyString}
    />
  );
};

const PlantFavoriteModal = ({ open, handleClose, plant  }) => {
   if(plant == []){
    return;
   }

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
          sx={{
            position: "fixed", // Fix position to the modal
            top: 10,
            left: 10,
            backgroundColor:"rgba(255, 255, 255, 0.5)"
          }}
        >

        <FavoriteIcon sx={{ color: "red" }} /> 
 
        </IconButton>
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
        {plant && (
          <>
            <img
              src={plant.image.value}
              alt={plant.name}
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
                {plant.name}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap" }}
                useFlexGap
              >
              {plant.common_names && plant.common_names.length > 0 ? (
              plant.common_names.map((name, index) => (
                <Chip key={index} label={name} />
              ))
            ) : (
              <p>No common names available</p> // Optional: Fallback when there are no common names
            )}
              </Stack>
              <DescriptionWithReadMore
                description={plant.description.value}
              />
              <List>

                <ListItem>
                  <PlantTaxonomy plant={plant} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Edible Parts"
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondary={
                      plant.edible_parts
                        ? plant.edible_parts.join(", ")
                        : "None"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Propagation Methods"
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondary={
                      plant.propagation_methods
                        ? plant.propagation_methods.join(", ")
                        : "None"
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PlantFavoriteModal;
