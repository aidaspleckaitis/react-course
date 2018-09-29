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

function Dish(props) {
  const { dish, addToFavorites, removeFromFavorites } = props;
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
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon
              className="Favorite-icon"
              style={dish.favorite ? { fill: 'hotpink' } : null}
              onClick={() =>
                addToFavorites
                  ? addToFavorites(dish)
                  : removeFromFavorites(dish)
              }
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

Dish.propTypes = {
  dish: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  addToFavorites: PropTypes.func,
};

Dish.defaultProps = {
  addToFavorites: undefined,
};

export default Dish;