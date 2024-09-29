import React,{useEffect,useState} from 'react';
import { fetchFavorites } from '../../data';
import PlantList from './PlantListFavorate';
import { Tabs, Tab, Box, Container} from '@mui/material';
import PlantFavoriteModal from '../../components/PlantFavorateModal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SpaIcon from '@mui/icons-material/Spa';
 function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <SpaIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Plants
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }



const MyPlantsPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [activeTab, setActiveTab] = useState(0); 

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
      };

    useEffect(() => {
        loadFavorites();
     }, []);

     const loadFavorites = async () => {
        const favors = await fetchFavorites();
        console.log(favors)
        setFavorites(favors);
      };

      const handleOpenPlantDetails = (plants) => {
        setSelectedPlant(plants);
        console.log(plants);
        setModalOpen(true);
      };

      const handleCloseModal = () => {
        setModalOpen(false);
      };
    return (
      <Box sx={{
        height: "100%",
      }}>
        <ButtonAppBar />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Favorites"  component="button"/>
          <Tab label="History" component="button"/>
        </Tabs>
      </Box>
         <Box sx={{paddingX:4}}>
        {activeTab == 0 && <PlantList plants={favorites} handleOpenPlantDetails={handleOpenPlantDetails} />}

         {selectedPlant &&
          <PlantFavoriteModal
        open={modalOpen}
        handleClose={handleCloseModal}
        plant={selectedPlant}
      />}       
       </Box>
      </Box>
    )
}

export default MyPlantsPage