import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';

import shop from '../shop';
// React Router

// Components
import Dish from './components/Dish';

function Home(props) {
  // Update props because data param is collected from props which doesn't re-render. ANTI-PATERN
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ data: nextProps.data });
  // }

  // updateFavoriteMealsLocalReference = reference => {
  //   localStorage.setItem('favoriteMeals', JSON.stringify(reference));
  // };

  // updateMealCollection = data => {
  //   localStorage.setItem('data', JSON.stringify(data));
  // };

  const toggleFavorite = e => {
    const {
      addToFavorites,
      favorites,
      products,
      setProducts,
      setFavorites,
    } = props;

    const selectedMeal = e;

    // Check if meal already exists in local favorite meals reference
    const isAlreadyFavorite = favorites.find((currentValue, index) => {
      if (currentValue.title === selectedMeal.title) {
        favorites.splice(index, 1); // Remove from favorites
        products[selectedMeal.id].favorite = false; // Unfavorite meal in main collection data

        setFavorites(favorites.slice());
        setProducts(products.slice());

        return true;
      }

      return false;
    });

    /** Push meal to local reference if it doesn't exist already
     * Update main meals data */
    if (!isAlreadyFavorite) {
      selectedMeal.favorite = true; // Mark interacted meal as favorite
      products[selectedMeal.id].favorite = true; // Mark meal in main collection as favorite

      addToFavorites(selectedMeal);
      setProducts(products.slice());
    }
  };

  // Handles favorite meals updates
  const updateFavoriteMeals = (mealID, remove = false) => {
    const { products, setFavorites } = props;

    // favorites.forEach((item, index) => {
    //   if (item.id === mealID) {
    //     // Set count to if remove param is manually set to true
    //     if (remove) {
    //       favorites[index].count = 0;

    //       setFavorites(favorites.slice());
    //     } else {
    //       favorites[index].count += 1;

    //       setFavorites(favorites.slice());
    //     }
    //   }
    // });
  };

  const updateCart = meal => {
    const { cart, products, setProducts, addToCart } = props;
    const selectedMeal = meal;

    // Check if meal exists in cart
    if (cart.filter(i => i.id === selectedMeal.id).length > 0) {
      // Update meals count
      console.log('BEFORE cart: ', cart);
      // cart.forEach((item, index) => {
      //   if (item.id === selectedMeal.id) {
      //     cart[index].count += 1;
      //   }
      // });

      console.log('cart: ', cart);

      products[selectedMeal.id].count += 1;

      // setCart(cart.slice());
      setProducts(products.slice());
    } else {
      products[selectedMeal.id].count = 1;

      // Increase count
      selectedMeal.count = 1;

      // setProducts(products.slice());
      addToCart(selectedMeal);
    }
  };

  // Add meal to cart
  const onAddMealToCart = meal => {
    const mealToAddToCart = meal;

    // Update cart state for favorited meals (to display correct number of times that are in cart)
    updateFavoriteMeals(mealToAddToCart.id);
    updateCart(mealToAddToCart);
  };

  const { products } = props;

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <h3 className="Home-container-title">Choose your ninja meal</h3>
      </Grid>
      {products.map((dish, index) => (
        <Dish
          key={index}
          dish={dish}
          addToFavorites={e => toggleFavorite(e)}
          onAddMealToCart={e => onAddMealToCart(e)}
        />
      ))}
    </Grid>
  );
}

Home.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setCart: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.shop.cart,
  products: state.shop.products,
  favorites: state.shop.favorites,
});

const mapDispatchToProps = dispatch => ({
  addToCart: product => dispatch(shop.actions.addToCart(product)),
  addToFavorites: product => dispatch(shop.actions.addToFavorites(product)),
  setCart: data => dispatch(shop.actions.setCart(data)),
  setProducts: data => dispatch(shop.actions.setProducts(data)),
  setFavorites: data => dispatch(shop.actions.setFavorites(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
