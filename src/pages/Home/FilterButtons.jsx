// FilterButtons.js
import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const FilterButtons = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Houseplants', 'Evergreen Trees', 'Palm Trees'];

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => setSelectedCategory(category)}
          color={selectedCategory === category ? 'primary' : 'default'}
        >
          {category}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FilterButtons;
