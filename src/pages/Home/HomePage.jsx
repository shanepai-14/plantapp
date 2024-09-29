import React, {useEffect, useState ,useCallback} from 'react';
import { Grid ,TextField ,IconButton, InputAdornment, Box} from '@mui/material';
import PlantCard from './PlantCard';
import SearchIcon from '@mui/icons-material/Search';
import { API_KEY,API_URL } from '../../utils/endpoint';
import PlantDetailsModal from '../../components/PlantDetailsModal';
import CardSkeleton from '../../components/CardSkeleton';
import { fetchFavorites } from '../../data';

const Home = () => {
 
      const [searchQuery, setSearchQuery] = useState('');
      const [plants, setPlants] = useState([]);
      const [loading, setLoading] = useState(false);
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedPlantToken, setSelectedPlantToken] = useState(null);
      const [favorites, setFavorites] = useState([]);

      useEffect(() => {

         loadFavorites();
          searchPlants();

      }, []);

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          searchPlants();
        }
      };
 
      const handlePlantDetails = useCallback((accessToken) => {
        setSelectedPlantToken(accessToken);
        setModalOpen(true);
      }, []);



      const loadFavorites = async () => {
        const favors = await fetchFavorites();
        console.log(favors)
        setFavorites(favors);
      };

        const searchPlants = async () => {
          setLoading(true);
          try {
            const response = await fetch(`${API_URL}/name_search?q=${encodeURIComponent(searchQuery)}&thumbnails=true`, {
              headers: {
                'Api-Key': API_KEY,
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json();
            
            setPlants(data.entities);

            console.log(data);
          } catch (error) {
            console.error('Error fetching plants:', error);
          } finally {
            setLoading(false);
          }
        };
        const handleCloseModal = () => {
          setModalOpen(false);
          setSelectedPlantToken(null);
        };
    
      return (
        <div>
          {/* <FilterButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> */}
          <Box sx={{padding:2 ,position:'fixed',top:0 , backgroundColor:'white',width:"100%",zIndex:99}}>
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
                onClick={searchPlants}
                disabled={loading || !searchQuery.trim()}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
          </Box>
                  {loading ? (
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
                <PlantCard plant={plant} favorites={favorites} handlePlantDetails={handlePlantDetails} />
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
}

export default Home