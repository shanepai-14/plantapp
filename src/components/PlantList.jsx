import React from 'react';
import { List, ListItem, ListItemText, IconButton, Divider, Typography,Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
const PlantList = ({ plants,handleOpenPlantDetails }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p:0,mt:3}}>
      {plants.map((plant, index) => (
        <React.Fragment key={plant.id}>
          <ListItem alignItems="flex-start" sx={{p:0}}  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleOpenPlantDetails(plant.id)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  }>
            <Box>
            <img
                alt={plant.name}
                src={plant.similar_images[0].url} // Display the first image from similar_images
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
          
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'inline',textAlign: 'start' }}
                  >
                    Probability
                  </Typography>
                   <Gauge
                   width={100}
                   height={100}
                   value={(plant.probability * 100).toFixed(0)}
                   cornerRadius="50%"
                   text={
                    ({value}) => `${value}%`
                 }
                   sx={(theme) => ({
                     [`& .${gaugeClasses.valueText}`]: {
                       fontSize: 22,
                     },
                     [`& .${gaugeClasses.valueArc}`]: {
                       fill: '#52b202',
                     },
                     [`& .${gaugeClasses.referenceArc}`]: {
                       fill: theme.palette.text.disabled,
                     },
                   })}
                 />
                 </>
              }
            />
          </ListItem>
          {index < plants.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default PlantList;
