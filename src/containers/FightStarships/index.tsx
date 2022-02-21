import React, { useCallback, useEffect, useState } from 'react';
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
  const [winner, setWinner] = useState<IStarship | undefined>(undefined);
  const [starships, setStarships] = useState<number[]>([]);

  const generateRandomStarships = useCallback(() => {
    if (data) {
      const randomStarships = generateRandomData(data.results.length);
      setStarships(randomStarships);
    }
  }, [data]);

  useEffect(() => {
    generateRandomStarships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data && starships.length > 0) {
      const _starships = [data.results[starships[0]], data.results[starships[1]]];

      const higherCrew = calculateHigherAttribute(_starships[0].crew, _starships[1].crew);
      const _winner = _starships.filter((starship) => starship.crew === higherCrew)[0];
      setWinner(_winner);
      // Two separate ifs because when it will be a tie, then no one will receive point
      if (_winner === _starships[0]) dispatch(givePointToLeftPlayer());
      if (_winner === _starships[1]) dispatch(givePointToRightPlayer());
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
          {winner === undefined ? 'A tie!' : `${winner?.name} wins!`}
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
      <PlayAgainOrSwitch onPlayAgainCallback={generateRandomStarships} />
    </Box>
  );
};

export default FightStarships;
