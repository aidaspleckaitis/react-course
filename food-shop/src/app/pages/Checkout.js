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
    console.log('cart: ', cart);
    this.calculatePrice(cart);
  }

  // Handles price calculations
  calculatePrice = cart => {
    const { cartValue } = this.state;
    let fullPrice = cartValue;

    cart.forEach(cartItem => {
      fullPrice += Number(cartItem.recipe_id);
    });

    this.setState({ cartValue: fullPrice.toFixed(2) });
  };

  // Handles cart updates
  updateCart = mealID => {
    const { cart } = this.state;
    const { updateCartState } = this.props;

    // Remove selected meal from cart
    const newCart = cart.filter(meal => meal.id !== mealID);

    // Update common state's cart
    this.setState({ cart: newCart });

    // Update parent state's cart
    updateCartState(null, newCart);
  };

  render() {
    const { cart, cartValue } = this.state;

    return cart.length > 0 ? (
      <div className="Checkout-container">
        <h2>Checkout stage</h2>
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
          <Button>Checkout</Button>
        </div>
      </div>
    ) : (
      <h2>Cart is empty.</h2>
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
    ])
  ),
  updateCartState: PropTypes.func.isRequired,
};

Checkout.defaultProps = {
  cart: undefined,
};

export default Checkout;
