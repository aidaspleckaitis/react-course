import React from 'react';
import PropTyoes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Dish from './components/Dish';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteDishes: JSON.parse(localStorage.getItem('favoriteMeals')),
    };
  }

  updateMainData = selectedMeal => {
    const data = JSON.parse(localStorage.getItem('data'));
    data[selectedMeal.id].favorite = false;
    localStorage.setItem('data', JSON.stringify(data));
  };

  removeFromFavorites = e => {
    const { favoriteDishes } = this.state;
    const mealToRemove = e;

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
            removeFromFavorites={e => this.removeFromFavorites(e)}
          />
        ))}
      </Grid>
    );
  }
}

export default Favorites;
