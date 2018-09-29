import React from 'react';
import PropTypes from 'prop-types';
// React Router

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Dish from './components/Dish';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: JSON.parse(localStorage.getItem('data')),
      favoriteDishes: [],
    };
  }

  updateFavoriteMealsLocalReference = reference => {
    localStorage.setItem('favoriteMeals', JSON.stringify(reference));
  };

  updateMealCollection = data => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  addToFavorites = e => {
    const { favoriteDishes, data } = this.state;

    const interacteWithMeal = e;
    const mealCollection = data;
    const favoriteMealsLocalReference =
      JSON.parse(localStorage.getItem('favoriteMeals')) || [];

    // Check if meal already exists in local favorite meals reference
    const isAlreadyFavorite = favoriteMealsLocalReference.find(
      (currentValue, index) => {
        if (currentValue.title === interacteWithMeal.title) {
          favoriteMealsLocalReference.splice(index, 1); // Remove from favorites
          mealCollection[interacteWithMeal.id].favorite = false; // Unfavorite meal in main collection data

          // Update local reference
          this.updateFavoriteMealsLocalReference(favoriteMealsLocalReference);
          this.updateMealCollection(mealCollection);

          // Update state
          this.setState({
            favoriteDishes: favoriteMealsLocalReference,
            data: mealCollection,
          });

          return true;
        }

        return false;
      }
    );

    /** Push meal to local reference if it doesn't exist already
     * Update main meals data */
    if (!isAlreadyFavorite) {
      interacteWithMeal.favorite = true; // Mark interacted meal as favorite
      mealCollection[interacteWithMeal.id].favorite = true; // Mark meal in main collection as favorite

      favoriteMealsLocalReference.push(interacteWithMeal);

      // Update local references
      this.updateFavoriteMealsLocalReference(favoriteMealsLocalReference);
      this.updateMealCollection(mealCollection);

      // Update state
      this.setState({
        favoriteDishes: favoriteMealsLocalReference,
        data: mealCollection,
      });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <h3 className="Home-container-title">Choose your ninja meal</h3>
        </Grid>
        {data.map((dish, index) => (
          <Dish
            key={index}
            dish={dish}
            addToFavorites={e => this.addToFavorites(e)}
          />
        ))}
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
