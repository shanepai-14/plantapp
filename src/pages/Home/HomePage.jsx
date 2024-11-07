import React, { useState, useCallback } from 'react';
import { Grid, TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import PlantCard from './PlantCard';
import PlantDetailsModal from '../../components/PlantDetailsModal';
import CardSkeleton from '../../components/CardSkeleton';
import { API_KEY, API_URL } from '../../utils/endpoint';
import { fetchFavorites } from '../../data';

// API function to fetch plants
const fetchPlants = async (query) => {
  const response = await fetch(
    `${API_URL}/name_search?q=${encodeURIComponent(query)}&thumbnails=true`,
    {
      headers: {
        'Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data.entities;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlantToken, setSelectedPlantToken] = useState(null);
  const queryClient = useQueryClient();

  // Query for favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    initialData: []
  });

  // Query for plants search
  const { 
    data: plants = [], 
    isLoading,
    refetch: searchPlants 
  } = useQuery({
    queryKey: ['plants', searchQuery],
    queryFn: () => fetchPlants(searchQuery),
    enabled: true, // Don't fetch automatically on mount
    initialData: []
  });

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchPlants();
    }
  };

  const handlePlantDetails = useCallback((accessToken) => {
    setSelectedPlantToken(accessToken);
    setModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlantToken(null);
  };

  return (
    <div>
      <Box sx={{
        padding: 2,
        position: 'fixed',
        top: 0,
        backgroundColor: 'white',
        width: "100%",
        zIndex: 99
      }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search plants"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => searchPlants()}
                  disabled={isLoading || !searchQuery.trim()}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {isLoading ? (
        <Grid container spacing={2} style={{ marginTop: 76, paddingLeft: 10, paddingRight: 10 }}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <CardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2} style={{ marginTop: 76, paddingLeft: 10, paddingRight: 10 }}>
          {plants.map((plant) => (
            <Grid item xs={6} sm={6} md={4} key={plant.access_token}>
              <PlantCard
                plant={plant}
                favorites={favorites}
                handlePlantDetails={handlePlantDetails}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <PlantDetailsModal
        open={modalOpen}
        handleClose={handleCloseModal}
        accessToken={selectedPlantToken}
        favorites={favorites}
      />
    </div>
  );
};

export default Home;