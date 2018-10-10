import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import CartItem from './components/CartItem';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: props.cart,
      cartValue: 0,
    };
  }

  componentDidMount() {
    const { cart } = this.state;

    this.calculatePrice(cart);
  }

  // Handles price calculations
  calculatePrice = cart => {
    const { cartValue } = this.state;
    let fullPrice = Number(cartValue);

    cart.forEach(cartItem => {
      fullPrice += Number(cartItem.recipe_id * cartItem.count);
    });

    this.setState({ cartValue: fullPrice.toFixed(2) });
  };

  // Recalculates cart value when meal is removed
  recalculateCartValue = removedMealPrice => {
    const { cartValue } = this.state;

    const newCartValue = (cartValue - removedMealPrice).toFixed(2);

    this.setState({ cartValue: newCartValue });
  };

  updateFavoriteMealsCartData = () => {};

  // Handles cart updates
  updateCart = (mealID, removedMealPrice) => {
    const { cart } = this.state;
    const {
      updateCartState,
      updateDataStateOnRemoveFromCheckout,
      updateFavoriteMeals,
    } = this.props;
    const dishID = mealID;

    // Remove selected meal from cart
    const newCart = cart.filter(meal => meal.id !== dishID);

    localStorage.setItem('cart', JSON.stringify(newCart));

    // Update parent state's mainData
    updateDataStateOnRemoveFromCheckout(null, dishID);

    // Update parent state's cart
    updateCartState(null, newCart);

    // Update common state's cart
    this.setState({ cart: newCart });

    // Update cart value when meal is removed
    this.recalculateCartValue(removedMealPrice);

    // Update favorites data
    updateFavoriteMeals(dishID, true);
  };

  render() {
    const { cart, cartValue } = this.state;

    return cart.length > 0 ? (
      <div className="Checkout-container">
        <h3 className="Checkout-title">Meals in cart</h3>
        <div className="Checkout-cart-container">
          <ul className="Checkout-list-container">
            <section>
              {cart.map((dish, index) => (
                <CartItem
                  key={index}
                  dish={dish}
                  updateCart={this.updateCart}
                />
              ))}
              <Chip
                style={{ marginLeft: '78%', marginTop: '3%' }}
                label={`Cart value: €${cartValue}`}
              />
            </section>
          </ul>
          <Button
            style={{
              backgroundColor: '#ff3b3f',
              color: 'white',
              borderRadius: '0 3px 3px 0',
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    ) : (
      <h2
        className="Checkout-title"
        style={{
          textAlign: 'center',
          marginTop: '2%',
        }}
      >
        Cart is empty
      </h2>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object,
    ])
  ),
  updateCartState: PropTypes.func.isRequired,
  updateDataStateOnRemoveFromCheckout: PropTypes.func.isRequired,
  updateFavoriteMeals: PropTypes.func.isRequired,
};

Checkout.defaultProps = {
  cart: undefined,
};

export default Checkout;
