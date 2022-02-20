import React from 'react';
import { Box, Typography } from '@mui/material';

interface IProps {
  leftPlayer: number;
  rightPlayer: number;
}

const FightPeople = ({ leftPlayer, rightPlayer }: IProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={{ xs: 5, md: 10 }}
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex" alignItems="center" gap={{ xs: 5, md: 15 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1">Player 1</Typography>
          <Typography variant="h4">
            <strong>{leftPlayer}</strong> points
          </Typography>
        </Box>
        <div />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1">Player 2</Typography>
          <Typography variant="h4">
            <strong>{rightPlayer}</strong> points
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FightPeople;
