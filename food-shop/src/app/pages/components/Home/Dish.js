import React from 'react';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import CardActions from '@material-ui/core/CardActions';

const addToFavorites = e => {
  console.log('item: ', e);
};

function Dish(props) {
  const { dish } = props;
  return (
    <Card className="Card">
      <CardHeader
        style={{ fontWeight: 900 }}
        className="Card-header"
        title={dish.title}
      />
      <CardMedia
        className="Card-image"
        image={dish.image_url}
        title="Image title"
      />
      <div className="Card-price">€ {dish.recipe_id}</div>
      <div className="Card-action-container">
        <CardActions
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          disableActionSpacing
        >
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon
              className="Favorite-icon"
              onClick={() => addToFavorites(dish)}
            />
          </IconButton>
          <IconButton aria-label="Add to favorites">
            <ShoppingBasket />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
}

export default Dish;
