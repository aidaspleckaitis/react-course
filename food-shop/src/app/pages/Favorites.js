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

  removeFromFavorites = e => {
    console.log('e:', e);
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
            addToFavorites={e => this.removeFromFavorites(e)}
          />
        ))}
      </Grid>
    );
  }
}

export default Favorites;
