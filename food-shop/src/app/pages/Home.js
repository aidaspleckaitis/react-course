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
      cart: [],
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

    const interactedWithMeal = e;
    const mealCollection = data;
    const favoriteMealsLocalReference =
      JSON.parse(localStorage.getItem('favoriteMeals')) || [];

    // Check if meal already exists in local favorite meals reference
    const isAlreadyFavorite = favoriteMealsLocalReference.find(
      (currentValue, index) => {
        if (currentValue.title === interactedWithMeal.title) {
          favoriteMealsLocalReference.splice(index, 1); // Remove from favorites
          mealCollection[interactedWithMeal.id].favorite = false; // Unfavorite meal in main collection data

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
      interactedWithMeal.favorite = true; // Mark interacted meal as favorite
      mealCollection[interactedWithMeal.id].favorite = true; // Mark meal in main collection as favorite

      favoriteMealsLocalReference.push(interactedWithMeal);

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

  // Add meal to cart
  addToCart = meal => {
    const { updateCartState } = this.props;
    updateCartState(meal);
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
            addToCart={e => this.addToCart(e)}
          />
        ))}
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateCartState: PropTypes.func.isRequired,
};

export default Home;
