import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon, Settings as SettingsIcon ,CameraAlt } from '@mui/icons-material';
import SpaIcon from '@mui/icons-material/Spa';
function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Outlet />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={location.pathname}
          onChange={(event, newValue) => {
            navigate(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value="/home" />
          <BottomNavigationAction label="Scan" icon={<CameraAlt />} value="/scan" />
          <BottomNavigationAction label="My Plants"  icon={<SpaIcon />} value="/myplants" />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Layout;