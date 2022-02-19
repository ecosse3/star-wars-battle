import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface IProps {
  image: string;
  name: string;
  onClick: () => void;
}

const ResourceCard = ({ image, name, onClick }: IProps) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" alt={name} height="500" image={image} />
        <CardActions>
          <Typography variant="h6">{name}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ResourceCard;
