import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Dish from './components/Dish';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteDishes: JSON.parse(localStorage.getItem('favoriteMeals')) || [],
    };
  }

  updateCart = meal => {
    const { updateCartState } = this.props;
    const { favoriteDishes } = this.state;
    const mealToAddToCart = meal;

    favoriteDishes.forEach((item, index) => {
      if (item.id === mealToAddToCart.id) {
        favoriteDishes[index].count += 1;
        this.setState({ favoriteDishes });
        localStorage.setItem('favoriteMeals', JSON.stringify(favoriteDishes));
      }
    });

    updateCartState(mealToAddToCart);
  };

  updateMainData = selectedMeal => {
    const { updateDataStateOnRemoveFromFavorites } = this.props;

    const data = JSON.parse(localStorage.getItem('data'));

    data[selectedMeal.id].favorite = false;

    localStorage.setItem('data', JSON.stringify(data));

    // Update parent state data
    updateDataStateOnRemoveFromFavorites(data);
  };

  removeFromFavorites = mealToBeRemoved => {
    const { favoriteDishes } = this.state;
    const mealToRemove = mealToBeRemoved;

    // Remove selected meal from favorites
    const newFavoriteMealsArray = favoriteDishes.filter(
      meal => meal.id !== mealToRemove.id
    );

    // Remove selected meal from main data and update local reference
    this.updateMainData(mealToRemove);

    // Update local favorite meals reference
    localStorage.setItem(
      'favoriteMeals',
      JSON.stringify(newFavoriteMealsArray)
    );

    // Update State
    this.setState({ favoriteDishes: newFavoriteMealsArray });
  };

  render() {
    const { favoriteDishes } = this.state;

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <h3 className="Home-container-title">Your favorite meals:</h3>
        </Grid>
        {favoriteDishes.map((dish, index) => (
          <Dish
            key={index}
            dish={dish}
            removeFromFavorites={meal => this.removeFromFavorites(meal)}
            addToCart={meal => this.updateCart(meal)}
          />
        ))}
      </Grid>
    );
  }
}

Favorites.propTypes = {
  updateCartState: PropTypes.func.isRequired,
};

export default Favorites;
