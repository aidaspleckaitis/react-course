import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import CancelIcon from '@material-ui/icons/Cancel';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  badge: {
    top: -2,
  },
});

function CartItem(props) {
  const { dish, updateCart, classes } = props;
  return (
    <li className="Checkout-item">
      <div className="Checkout-left-snippet">
        {dish.count > 0 ? (
          <Badge
            color="primary"
            badgeContent={`x${dish.count}`}
            classes={{ badge: classes.badge }}
          >
            <div className="Checkout-item-title">{dish.title}</div>
          </Badge>
        ) : (
          <div className="Checkout-item-title">{dish.title}</div>
        )}
      </div>

      <div className="Checkout-right-snippet">
        <div>{dish.recipe_id * dish.count}</div>
        <CancelIcon
          onClick={() => updateCart(dish.id, dish.recipe_id * dish.count)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </li>
  );
}

CartItem.propTypes = {
  dish: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ),
  updateCart: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

CartItem.defaultProps = {
  dish: undefined,
  classes: undefined,
};

export default withStyles(styles)(CartItem);
