import React, { useCallback, useEffect, useState } from 'react';
import { useGetPeopleQuery } from '#store/api/peopleApi';
import { Box, CircularProgress, Typography } from '@mui/material';
import Score from '#components/Score';
import PlayAgainOrSwitch from '#components/PlayAgainOrSwitch';
import { IPeople } from '#interfaces/people';
import { useAppDispatch } from '#store';
import { useSelector } from 'react-redux';
import {
  givePointToLeftPlayer,
  givePointToRightPlayer,
  selectLeftPlayerScore,
  selectRightPlayerScore
} from '#store/slices/peopleSlice';
import { calculateHigherAttribute, generateRandomData } from '#utils/functions';
import DataCard from '#components/DataCard';

const FightPeople = () => {
  const dispatch = useAppDispatch();
  const leftPlayerPoints = useSelector(selectLeftPlayerScore);
  const rightPlayerPoints = useSelector(selectRightPlayerScore);
  const { data, error, isLoading } = useGetPeopleQuery();
  const [winner, setWinner] = useState<IPeople | undefined>(undefined);
  const [people, setPeople] = useState<number[]>([]);

  const generateRandomPeople = useCallback(() => {
    if (data) {
      const randomPeople = generateRandomData(data.results.length);
      setPeople(randomPeople);
    }
  }, [data]);

  useEffect(() => {
    generateRandomPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data && people.length > 0) {
      const players = [data.results[people[0]], data.results[people[1]]];

      const higherMass = calculateHigherAttribute(players[0].mass, players[1].mass);
      const _winner = players.filter((player) => player.mass === higherMass)[0];
      setWinner(_winner);
      // Two separate ifs because when it will be a tie, then no one will receive point
      if (_winner === players[0]) dispatch(givePointToLeftPlayer());
      if (_winner === players[1]) dispatch(givePointToRightPlayer());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people]);

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
        <DataCard isWinner={data?.results?.[people[0]] === winner}>
          <Typography variant="h5" component="div">
            {data?.results?.[people[0]]?.name}
          </Typography>
          <Typography sx={{ mt: 1.5 }} variant="h6">
            Mass: {data?.results?.[people[0]]?.mass}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Gender: {data?.results?.[people[0]]?.gender}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Height: {data?.results?.[people[0]]?.height}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Eye color: {data?.results?.[people[0]]?.eye_color}
          </Typography>
        </DataCard>
        vs.
        <DataCard isWinner={data?.results?.[people[1]] === winner}>
          <Typography variant="h5" component="div">
            {data?.results?.[people[1]]?.name}
          </Typography>
          <Typography sx={{ mt: 1.5 }} variant="h6">
            Mass: {data?.results?.[people[1]]?.mass}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Gender: {data?.results?.[people[1]]?.gender}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Height: {data?.results?.[people[1]]?.height}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Eye color: {data?.results?.[people[1]]?.eye_color}
          </Typography>
        </DataCard>
      </Box>
      <Score leftPlayer={leftPlayerPoints} rightPlayer={rightPlayerPoints} />
      <PlayAgainOrSwitch onPlayAgainCallback={generateRandomPeople} />
    </Box>
  );
};

export default FightPeople;
