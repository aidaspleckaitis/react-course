import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

import shop from '../shop';

import Dish from './components/Dish';

function Favorites(props) {
  const updateCart = meal => {
    const { products } = props;
    const mealToAddToCart = meal;

    // favoriteDishes.forEach((item, index) => {
    //   if (item.id === mealToAddToCart.id) {
    //     favoriteDishes[index].count += 1;
    //     this.setState({ favoriteDishes });
    //     localStorage.setItem('favoriteMeals', JSON.stringify(favoriteDishes));
    //   }
    // });

    products[mealToAddToCart.id].count += 1;

    // updateCartState(mealToAddToCart);
  };

  // updateMainData = selectedMeal => {
  //   const { updateDataStateOnRemoveFromFavorites } = this.props;

  //   const data = JSON.parse(localStorage.getItem('data'));

  //   data[selectedMeal.id].favorite = false;

  //   localStorage.setItem('data', JSON.stringify(data));

  //   // Update parent state data
  //   updateDataStateOnRemoveFromFavorites(data);
  // };

  const removeFromFavorites = mealToBeRemoved => {
    const { favorites, products, setFavorites } = props;

    const mealToRemove = mealToBeRemoved;

    // Remove selected meal from favorites
    const newFavoriteMealsArray = favorites.filter(
      meal => meal.id !== mealToRemove.id
    );

    console.log('products: ', products);
    products[mealToRemove.id].favorite = false;

    // Update State
    setFavorites(newFavoriteMealsArray);
  };

  const { favorites, onAddMealToCart } = props;
  console.log('onAddMealToCart: ', onAddMealToCart);

  return favorites.length ? (
    <Grid container justify="center">
      <Grid item xs={12}>
        <h3 className="Home-container-title">Your favorite meals</h3>
      </Grid>
      {favorites.map((dish, index) => (
        <Dish
          key={index}
          dish={dish}
          removeFromFavorites={meal => removeFromFavorites(meal)}
          addToCart={meal => updateCart(meal)}
        />
      ))}
    </Grid>
  ) : (
    <h3
      className="Home-container-title"
      style={{
        textAlign: 'center',
        marginTop: '2%',
        marginLeft: 0,
      }}
    >
      No favourite meals added
    </h3>
  );
}

Favorites.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setFavorites: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.shop.products,
  favorites: state.shop.favorites,
});

const mapDispatchToProps = dispatch => ({
  addToCart: product => dispatch(shop.actions.addToCart(product)),
  setFavorites: data => dispatch(shop.actions.setFavorites(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
