import React from 'react';
import { List, ListItem, ListItemText,  Divider, Typography,Box } from '@mui/material';
const PlantList = ({ plants,handleOpenPlantDetails }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, p:0,mt:3}}>
      {plants.map((plant, index) => (
        <React.Fragment key={plant.name}>
          <ListItem alignItems="flex-start" sx={{p:0,pt:2}} onClick={() => handleOpenPlantDetails(plant)}>
            <Box>
            <img
                alt={plant.inaturalist_id}
                src={plant.image.value} // Display the first image from similar_images
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: '5%',
                  marginRight:16
                }}
              />
            </Box>
 
            <ListItemText
              primary={plant.name}
              primaryTypographyProps={{ fontWeight: "bold",fontSize:18}}
              sx={{ height: 130, overflow: "hidden",textOverflow:'ellipsis' }}
              secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'inline',textAlign: 'start' }}
                  >
                  {plant.description.value}
                  </Typography>
              }
            />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default PlantList;
