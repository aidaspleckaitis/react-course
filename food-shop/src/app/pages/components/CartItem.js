import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import CancelIcon from '@material-ui/icons/Cancel';
import Badge from '@material-ui/core/Badge';

function CartItem(props) {
  const { dish, updateCart } = props;
  return (
    <li className="Checkout-item">
      <div className="Checkout-left-snippet">
        {dish.count > 0 ? (
          <Badge color="primary" badgeContent={dish.count}>
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
};

CartItem.defaultProps = {
  dish: undefined,
};

export default CartItem;
