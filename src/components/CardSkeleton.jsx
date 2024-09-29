
import React from 'react';
import { Card, CardContent} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
const CardSkeleton = () => {

  return (
    <Card sx={{padding:0}}>
      <CardContent sx={{padding:"0!important"}}>
        <Skeleton variant="rectangular" width={'100%'} height={'140px'} />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
