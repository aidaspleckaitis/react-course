import React from 'react';
import PropTypes from 'prop-types';
// React Router

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Dish from './components/Home/Dish';

function Home(props) {
  const { data } = props;
  console.log('asdasd: ', data);

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <h3 className="Home-container-title">CHOOSE YOUR NINJA MEAL:</h3>
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
