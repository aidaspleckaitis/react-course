import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  cardContainer: {
    borderRadius: 10,
    // backgroundColor: '#93C178',
  },
  cardHeader: {
    paddingLeft: 8,
  },
  cardActionBar: {
    paddingRight: 0,
  },
  iconButton: {
    padding: 2,
  },
});

function Dish(props) {
  const {
    dish,
    addToFavorites,
    removeFromFavorites,
    onAddMealToCart,
    classes,
  } = props;
  return (
    <Card className="Card" classes={{ root: classes.cardContainer }}>
      <CardHeader
        style={{ fontWeight: 900 }}
        className="Card-header"
        title={dish.title}
        classes={{ root: classes.cardHeader }}
      />
      <CardMedia
        className="Card-image"
        image={dish.image_url}
        title={dish.title}
      />
      <div className="Card-action-container">
        <CardActions
          disableActionSpacing
          classes={{ root: classes.cardActionBar }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {addToFavorites ? (
              <IconButton
                aria-label="Add to favorites"
                onClick={() => addToFavorites(dish)}
                classes={{ root: classes.iconButton }}
              >
                <FavoriteIcon
                  className="Favorite-icon"
                  style={dish.favorite ? { fill: 'hotpink' } : null}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => removeFromFavorites(dish)}
                aria-label="Remove from favorites"
                classes={{ root: classes.iconButton }}
              >
                <DeleteRounded />
              </IconButton>
            )}
            <IconButton
              aria-label="Add to favorites"
              onClick={() => onAddMealToCart(dish)}
              classes={{ root: classes.iconButton }}
            >
              <ShoppingBasket style={dish.count ? { fill: '#1a2930' } : null} />
            </IconButton>
            {dish.count > 0 ? dish.count : null}
          </div>

          <div className="Card-price">€ {dish.recipe_id}</div>
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
  onAddMealToCart: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

Dish.defaultProps = {
  addToFavorites: undefined,
  removeFromFavorites: undefined,
  classes: undefined,
};

export default withStyles(styles)(Dish);
