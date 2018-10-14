import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import shop from '../shop';

import CartItem from './components/CartItem';

class Checkout extends React.Component {
  // Handles price calculations
  calculatePrice = () => {
    const { cart } = this.props;
    let fullPrice = 0;

    cart.forEach(cartItem => {
      fullPrice += Number(cartItem.recipe_id) * cartItem.count;
    });

    return fullPrice.toFixed(2);
  };

  // Recalculates cart value when meal is removed
  // recalculateCartValue = removedMealPrice => {
  //   const { cartValue } = this.state;

  //   const newCartValue = (cartValue - removedMealPrice).toFixed(2);

  //   this.setState({ cartValue: newCartValue });
  // };

  updateFavoriteMealsCartData = () => {};

  // Handles cart updates
  updateCart = mealID => {
    const { cart, setCart, products } = this.props;

    const dishID = mealID;

    // Remove selected meal from cart
    const newCart = cart.filter(meal => meal.id !== dishID);

    products[dishID].count = 0;

    setCart(newCart);
    // Update parent state's mainData
    // updateDataStateOnRemoveFromCheckout(null, dishID);

    // // Update parent state's cart
    // updateCartState(null, newCart);

    // // Update common state's cart
    // this.setState({ cart: newCart });

    // // Update cart value when meal is removed
    // this.recalculateCartValue(removedMealPrice);

    // // Update favorites data
    // updateFavoriteMeals(dishID, true);
  };

  render() {
    const { cart } = this.props;

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
                label={`Cart value: €${this.calculatePrice()}`}
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
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.shop.products,
  cart: state.shop.cart,
});

const mapDispatchToProps = dispatch => ({
  setCart: data => dispatch(shop.actions.setCart(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
