import React from 'react';
import PropTypes from 'prop-types';
// React Router

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Components
import Dish from './components/Dish';

function Home(props) {
  const { data } = props;

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <h3 className="Home-container-title">Available dishes:</h3>
      </Grid>
      {data.map((dish, index) => (
        <Dish key={index} dish={dish} />
      ))}
    </Grid>
  );
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
