import React from 'react';
import { Box, Button } from '@mui/material';
import { setResource } from '#store/slices/gameSlice';
import { useAppDispatch } from '#store';

interface IProps {
  onPlayAgainCallback: () => void;
}

const PlayAgainOrSwitch = ({ onPlayAgainCallback }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      mb={3}
      mt={{ xs: 5, md: 10 }}
      gap={{ xs: 2, md: 5 }}
      justifyContent="center"
      alignItems="center"
    >
      <Button variant="outlined" size="large" onClick={onPlayAgainCallback}>
        Play again
      </Button>
      <Button variant="outlined" size="large" onClick={() => dispatch(setResource(null))}>
        Switch resource
      </Button>
    </Box>
  );
};

export default PlayAgainOrSwitch;
