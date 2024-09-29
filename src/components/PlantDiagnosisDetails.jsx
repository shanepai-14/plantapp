import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    Typography,
    Link,
    Divider,
    Paper,
    ImageList,
    ImageListItem,
    ImageListItemBar
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const BulletItem = ({ text }) => (
    <ListItem sx={{ alignItems: 'start' }}>
      <ListItemIcon sx={{ minWidth: '20px', mt: '10px' }}>
        <FiberManualRecordIcon style={{ fontSize: 12 }} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
);

const PlantDetailsList = ({ plantDetails }) => {
  // Helper function to check if an array is empty or null
  const isEmptyOrNull = (arr) => !arr || arr.length === 0;

  // Helper function to render a section if it's not empty
  const renderSection = (title, content, renderFunc) => {
    if (content && !isEmptyOrNull(content)) {
      return (
        <>
          <ListItem>
            <ListItemText
              primary={title}
              secondary={renderFunc(content)}
              secondaryTypographyProps={{ fontSize: '17px', marginTop: 1 }}
              primaryTypographyProps={{ fontWeight: "bold", fontSize: 18 }}
            />
          </ListItem>
          <Divider component="li" />
        </>
      );
    }
    return null;
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {plantDetails.name || 'Unknown Plant'}
      </Typography>
      {plantDetails.similar_images && plantDetails.similar_images.length > 0 && (
        <>
          <ImageList sx={{ width: '100%', height: 220,mb:0 }} cols={3} rowHeight={164}>
            {plantDetails.similar_images.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  srcSet={`${item.url_small}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.url_small}?w=164&h=164&fit=crop&auto=format`}
                  alt={`Similar plant ${item.similarity.toFixed(2)}`}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={`Similarity: ${(item.similarity * 100).toFixed(0)}%`}
                  subtitle={<span>Source: {item.citation}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Divider />
        </>
      )}
      
      <List>
        {renderSection("Overview", plantDetails.details?.description, 
          (description) => description
        )}

        {renderSection("Common Names", plantDetails.details?.common_names, 
          (names) => names.map((name, index) => (
            <BulletItem key={index} text={name} />
          ))
        )}

        {renderSection("Classification", plantDetails.details?.classification, 
          (classification) => classification.map((item, index) => (
            <BulletItem key={index} text={item} />
          ))
        )}

        {(plantDetails.details?.treatment?.biological || plantDetails.details?.treatment?.prevention) && (
          <>
            <ListSubheader sx={{ fontWeight: "bold", fontSize: 18 }}>Treatment</ListSubheader>
            <ListItem>
              <List>
                {plantDetails.details.treatment.biological && (
                  <>
                    <ListSubheader sx={{ fontWeight: "bold", fontSize: 18 }}>Biological</ListSubheader>
                    {plantDetails.details.treatment.biological.map((item, index) => (
                      <BulletItem key={index} text={item} />
                    ))}
                  </>
                )}
                {plantDetails.details.treatment.prevention && (
                  <>
                    <ListSubheader sx={{ fontWeight: "bold", fontSize: 18 }}>Prevention</ListSubheader>
                    {plantDetails.details.treatment.prevention.map((item, index) => (
                      <BulletItem key={index} text={item} />
                    ))}
                  </>
                )}
              </List>
            </ListItem>
            <Divider component="li" />
          </>
        )}

        {plantDetails.details?.url && (
          <ListItem>
            <ListItemText
              primary="More Information..."
              primaryTypographyProps={{ color: 'primary' }}
              secondaryTypographyProps={{
                overflow: 'hidden',
                textOverflow:'ellipsis'
              }}
              secondary={
                <Link href={plantDetails.details.url} 
                target="_blank" rel="noopener noreferrer">
                  {plantDetails.details.url}
                </Link>
              }
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default PlantDetailsList;