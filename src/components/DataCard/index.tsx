import { Box, Card, CardContent } from '@mui/material';
import React from 'react';

interface IProps {
  children: React.ReactElement | React.ReactElement[];
  isWinner: boolean;
}

const DataCard = ({ children, isWinner }: IProps) => (
  <Box sx={{ minWidth: 275 }}>
    <Card
      variant="outlined"
      sx={{
        border: `1px solid ${isWinner ? 'green' : 'rgba(255, 255, 255, 0.12)'}`,
        background: `${isWinner ? 'rgba(0, 255, 0, 0.1)' : 'transparent'}`
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  </Box>
);

export default DataCard;
