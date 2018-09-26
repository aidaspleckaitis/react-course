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
    };
  }

  render() {
    const { data } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <h3 className="Home-container-title">Choose your ninja meal</h3>
        </Grid>
        {data.map((dish, index) => (
          <Dish key={index} dish={dish} />
        ))}
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
