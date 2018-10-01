import React from 'react';
import PropTypes from 'prop-types';
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
import Button from '@material-ui/core/Button';

function Dish(props) {
  const { dish, addToFavorites, removeFromFavorites, addToCart } = props;
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
        title={dish.title}
      />
      <div className="Card-price">€ {dish.recipe_id}</div>
      <div className="Card-action-container">
        <CardActions
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          disableActionSpacing
        >
          {addToFavorites ? (
            <IconButton
              aria-label="Add to favorites"
              onClick={() => addToFavorites(dish)}
            >
              <FavoriteIcon
                className="Favorite-icon"
                style={dish.favorite ? { fill: 'hotpink' } : null}
              />
            </IconButton>
          ) : (
            <Button onClick={() => removeFromFavorites(dish)}>Remove</Button>
          )}
          <IconButton
            aria-label="Add to favorites"
            onClick={() => addToCart(dish)}
          >
            <ShoppingBasket />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
}

Dish.propTypes = {
  dish: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  addToCart: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  addToFavorites: undefined,
  removeFromFavorites: undefined,
};

export default Dish;
