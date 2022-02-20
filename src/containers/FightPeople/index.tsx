import React, { useEffect, useState } from 'react';
import { useGetPeopleQuery } from '#store/api/peopleApi';
import { Box, CardContent, CircularProgress, Typography } from '@mui/material';
import Score from '#components/Score';
import Card from '@mui/material/Card';
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

const PeopleDataCard = ({ winner, data }: { winner: boolean; data?: IPeople }) => (
  <Box sx={{ minWidth: 275 }}>
    <Card
      variant="outlined"
      sx={{
        border: `1px solid ${winner ? 'green' : 'rgba(255, 255, 255, 0.12)'}`,
        background: `${winner ? 'rgba(0, 255, 0, 0.1)' : 'transparent'}`
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {data?.name}
        </Typography>
        <Typography sx={{ mt: 1.5 }} variant="h6">
          Mass: {data?.mass}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Gender: {data?.gender}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Height: {data?.height}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Eye color: {data?.eye_color}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export const calculateWinner = (leftPlayer: IPeople, rightPlayer: IPeople) => {
  const mass1 =
    leftPlayer.mass?.replace(',', '') === 'unknown'
      ? -1
      : Number(leftPlayer?.mass?.replace(',', ''));
  const mass2 =
    rightPlayer.mass?.replace(',', '') === 'unknown'
      ? -1
      : Number(rightPlayer?.mass?.replace(',', ''));

  if (mass1 > mass2) return leftPlayer;
  if (mass1 < mass2) return rightPlayer;

  return 'TIE';
};

const FightPeople = () => {
  const dispatch = useAppDispatch();
  const leftPlayerPoints = useSelector(selectLeftPlayerScore);
  const rightPlayerPoints = useSelector(selectRightPlayerScore);
  // Get first two pages for more data
  const {
    data: peopleFirstPage,
    error: peopleFirstPageError,
    isLoading: isLoadingPeopleFirstPage
  } = useGetPeopleQuery(1);
  const {
    data: peopleSecondPage,
    error: peopleSecondPageError,
    isLoading: isLoadingPeopleSecondPage
  } = useGetPeopleQuery(2);

  const [winner, setWinner] = useState<IPeople | 'TIE' | undefined>(undefined);
  const [data, setData] = useState<IPeople[] | null>(null);
  const [people, setPeople] = useState<number[]>([]);

  const generateRandomPeople = () => {
    if (data) {
      const randomPeople = [
        Math.floor(Math.random() * data.length - 1) + 1,
        Math.floor(Math.random() * data.length - 1) + 1
      ];

      setPeople(randomPeople);
    }
  };

  useEffect(() => {
    if (peopleFirstPage && peopleSecondPage) {
      setData([...peopleFirstPage.results, ...peopleSecondPage.results]);
    }
  }, [peopleFirstPage, peopleSecondPage]);

  useEffect(() => {
    generateRandomPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data && people.length > 0) {
      const leftPlayer = data[people[0]];
      const rightPlayer = data[people[1]];

      const result = calculateWinner(leftPlayer, rightPlayer);
      setWinner(result);
      // Two separate ifs because there can be a tie, and then no one will receive point
      if (result === leftPlayer) dispatch(givePointToLeftPlayer());
      if (result === rightPlayer) dispatch(givePointToRightPlayer());
    }
  }, [data, dispatch, people]);

  if (isLoadingPeopleFirstPage || isLoadingPeopleSecondPage)
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

  if (peopleFirstPageError || peopleSecondPageError)
    return (
      <Box
        display="flex"
        flexDirection="column"
        mt={10}
        justifyContent="center"
        alignItems="center"
      >
        Error fetching data!
        {peopleFirstPageError || peopleSecondPageError}
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
        <PeopleDataCard winner={data?.[people[0]] === winner} data={data?.[people[0]]} />
        vs.
        <PeopleDataCard winner={data?.[people[1]] === winner} data={data?.[people[1]]} />
      </Box>
      <Score leftPlayer={leftPlayerPoints} rightPlayer={rightPlayerPoints} />
      <PlayAgainOrSwitch onPlayAgainCallback={generateRandomPeople} />
    </Box>
  );
};

export default FightPeople;
