import React from 'react';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Dish(props) {
  const { dish } = props;
  console.log('data: ', dish.image);
  return (
    <Card className="Card">
      <CardHeader className="Card-header" title={dish.name} />
      <CardMedia
        className="Card-image"
        image={dish.image}
        title="Image title"
      />
      <CardContent>
        <Typography>{dish.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default Dish;
