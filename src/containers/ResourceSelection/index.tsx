import React from 'react';
import { Box, Typography } from '@mui/material';
import PeopleImg from '#assets/images/people.jpg';
import StarshipsImg from '#assets/images/starships.jpg';
import ResourceCard from '#components/ResourceCard';
import { useAppDispatch } from '#store';
import { setResource } from '#store/slices/gameSlice';

const ResourceSelection = () => {
  const dispatch = useAppDispatch();

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={10}
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Typography variant="h2" color="text.primary">
          Who fights?
        </Typography>
      </Box>
      <Box display="flex" gap={5} mt={10}>
        <ResourceCard
          name="People"
          image={PeopleImg}
          onClick={() => dispatch(setResource('people'))}
        />
        <ResourceCard
          name="Starships"
          image={StarshipsImg}
          onClick={() => dispatch(setResource('starships'))}
        />
      </Box>
    </Box>
  );
};

export default ResourceSelection;
