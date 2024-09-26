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
import { API_KEY, API_URL } from "../utils/endpoint";
import CloseIcon from "@mui/icons-material/Close";

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

const PlantTaxonomy = ({ plantDetails }) => {
  const {
    class: plantClass,
    genus,
    order,
    family,
    phylum,
    kingdom,
  } = plantDetails.taxonomy;

  const taxonomyString = `${kingdom}, ${phylum}, ${plantClass}, ${order}, ${family}, ${genus}`;

  return (
    <ListItemText
      primary="Taxonomy"
      primaryTypographyProps={{ fontWeight: "bold" }}
      secondary={taxonomyString}
    />
  );
};

const PlantDetailsModal = ({ open, handleClose, accessToken }) => {
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/${accessToken}`, {
          params: {
            details:
              "common_names,url,description,taxonomy,rank,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods",
            language: "en",
          },
          headers: {
            "Content-Type": "application/json",
            "Api-Key": API_KEY,
          },
        });
        console.log(response.data);
        setPlantDetails(response.data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
        setError("Failed to fetch plant details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchPlantDetails();
    }
  }, [open, accessToken]);

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
        {plantDetails && (
          <>
            <img
              src={plantDetails.image.value}
              alt={plantDetails.name}
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
                {plantDetails.name}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap" }}
                useFlexGap
              >
                {plantDetails.common_names.map((name, index) => (
                  <Chip key={index} label={name} />
                ))}
              </Stack>
              <DescriptionWithReadMore
                description={plantDetails.description.value}
              />
              <List>

                <ListItem>
                  <PlantTaxonomy plantDetails={plantDetails} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Edible Parts"
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondary={
                      plantDetails.edible_parts
                        ? plantDetails.edible_parts.join(", ")
                        : "None"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Propagation Methods"
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondary={
                      plantDetails.propagation_methods
                        ? plantDetails.propagation_methods.join(", ")
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

export default PlantDetailsModal;
