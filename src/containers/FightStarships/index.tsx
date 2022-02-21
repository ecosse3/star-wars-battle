import React, { useEffect, useState } from 'react';
import { useGetStarshipsQuery } from '#store/api/starshipsApi';
import { Box, CircularProgress, Typography } from '@mui/material';
import Score from '#components/Score';
import PlayAgainOrSwitch from '#components/PlayAgainOrSwitch';
import { IStarship } from '#interfaces/starship';
import { useAppDispatch } from '#store';
import { useSelector } from 'react-redux';
import {
  givePointToLeftPlayer,
  givePointToRightPlayer,
  selectLeftPlayerScore,
  selectRightPlayerScore
} from '#store/slices/starshipsSlice';
import { calculateHigherAttribute, generateRandomData } from '#utils/functions';
import DataCard from '#components/DataCard';

const FightStarships = () => {
  const dispatch = useAppDispatch();
  const leftPlayerPoints = useSelector(selectLeftPlayerScore);
  const rightPlayerPoints = useSelector(selectRightPlayerScore);
  const { data, error, isLoading } = useGetStarshipsQuery();
  const [winner, setWinner] = useState<IStarship | 'TIE' | undefined>(undefined);
  const [starships, setStarships] = useState<number[]>([]);

  const generateStarshipsData = () => {
    if (data) {
      const randomStarships = generateRandomData(data.results.length);
      setStarships(randomStarships);
    }
  };

  useEffect(() => {
    generateStarshipsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data && starships.length > 0) {
      const leftPlayer = data.results[starships[0]];
      const rightPlayer = data.results[starships[1]];

      const result = calculateHigherAttribute(leftPlayer.crew, rightPlayer.crew);
      const r = [leftPlayer, rightPlayer].filter((p) => p.crew === result)[0];
      setWinner(r);
      // Two separate ifs because there can be a tie, and then no one will receive point
      if (r === leftPlayer) dispatch(givePointToLeftPlayer());
      if (r === rightPlayer) dispatch(givePointToRightPlayer());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starships]);

  if (isLoading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        mt={10}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size="large" />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        flexDirection="column"
        mt={10}
        justifyContent="center"
        alignItems="center"
      >
        Error fetching data!
        {error}
      </Box>
    );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex" alignItems="center" mt={10}>
        <Typography variant="h4">
          {winner === 'TIE' ? 'A tie!' : `${winner?.name} wins!`}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="center"
        gap={5}
        mt={{ xs: 5, md: 10 }}
      >
        <DataCard isWinner={data?.results?.[starships[0]] === winner}>
          <Typography variant="h5" component="div">
            {data?.results?.[starships[0]]?.name}
          </Typography>
          <Typography sx={{ mt: 1.5 }} variant="h6">
            Crew: {data?.results?.[starships[0]]?.crew}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Model: {data?.results?.[starships[0]]?.model}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Cargo capacity: {data?.results?.[starships[0]]?.cargo_capacity}
          </Typography>
        </DataCard>
        vs.
        <DataCard isWinner={data?.results?.[starships[1]] === winner}>
          <Typography variant="h5" component="div">
            {data?.results?.[starships[1]]?.name}
          </Typography>
          <Typography sx={{ mt: 1.5 }} variant="h6">
            Crew: {data?.results?.[starships[1]]?.crew}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Model: {data?.results?.[starships[1]]?.model}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Cargo capacity: {data?.results?.[starships[1]]?.cargo_capacity}
          </Typography>
        </DataCard>
      </Box>
      <Score leftPlayer={leftPlayerPoints} rightPlayer={rightPlayerPoints} />
      <PlayAgainOrSwitch onPlayAgainCallback={generateStarshipsData} />
    </Box>
  );
};

export default FightStarships;
