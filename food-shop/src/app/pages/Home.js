import React from 'react';
import PropTypes from 'prop-types';
// React Router

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Dish from './components/Home/Dish';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      favoriteDishes: [],
    };
  }

  addToFavorites = e => {
    console.log('item: ', e);

    const { favoriteDishes } = this.state;
    const favoriteMealsLocalReference = JSON.parse(
      localStorage.getItem('favoriteMeals')
    );

    console.log('favorite_dishes: ', favoriteDishes);

    /** Add meal to local favorite meals reference
     * Else create local reference if one is not present */
    if (favoriteMealsLocalReference) {
      // Check if meal already exists in local favorite meals reference
      const isAlreadyFavorite = favoriteMealsLocalReference.find(
        i => i.title === e.title
      );

      // Push meal to local reference if it doesn't exist already
      if (!isAlreadyFavorite) {
        this.setState({ favoriteDishes: [...favoriteDishes, e] });

        favoriteMealsLocalReference.push(e);

        localStorage.setItem(
          'favoriteMeals',
          JSON.stringify(favoriteMealsLocalReference)
        );
      }
    } else {
      this.setState({ favoriteDishes: [...favoriteDishes, e] });

      localStorage.setItem('favoriteMeals', JSON.stringify([e]));
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
