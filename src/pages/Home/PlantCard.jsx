// PlantCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography ,Box} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
const PlantCard = ({ plant ,handlePlantDetails ,favorites}) => {
  const imageSrc = `data:image/jpeg;base64,${plant.thumbnail}`;
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        width="50"
        image={imageSrc}
        alt={plant.entity_name}
      />
      <CardContent
        sx={{ position: "relative", paddingBottom: "16px!important" }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            marginRight:3,
            height:"42px"
          }}
          component="div"
        >
          {plant.entity_name}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 8,
            boxShadow: 1,
            backgroundColor: "#71B04B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding:'5px',
            borderRadius: "100%",
            cursor: "pointer"
          }}
          disabled={favorites == null || []}
          onClick={() => handlePlantDetails(plant.access_token)}
        >
          <EastIcon fontSize="20px" sx={{ color: "white" }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
