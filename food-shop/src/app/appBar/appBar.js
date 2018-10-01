import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// React Router
import { Link } from 'react-router-dom';

const APP_ICON =
  'http://travelpedia.com.br/wp-content/uploads/2018/01/icon-food-and-beverage.png';

const styles = () => ({
  appBar: {
    backgroundColor: '#162115',
  },
  font: {
    fontFamily: 'Shojumaru',
  },
  button: {
    fontFamily: 'Shojumaru',
    color: 'white',
    marginRight: '40px',
    '&:hover': {
      backgroundColor: 'orangered',
    },
  },
});

function NavigationBar(props) {
  const { classes } = props;
  console.log('classes: ', classes);
  return (
    <AppBar position="static" classes={{ root: classes.appBar }}>
      <Toolbar>
        <Link className="Navigation-link" to="/">
          <Button classes={{ root: classes.button }} size="large">
            Home
          </Button>
        </Link>

        <Link className="Navigation-link" to="/favorites">
          <Button classes={{ root: classes.button }} size="large">
            Favorites
          </Button>
        </Link>

        <Link className="Navigation-link" to="/checkout">
          <Button classes={{ root: classes.button }} size="large">
            Checkout
          </Button>
        </Link>

        <div className="Title-wrapper">
          <Typography
            variant="title"
            color="inherit"
            classes={{ root: classes.font }}
          >
            Greatest sushi&#39;s ever
          </Typography>
        </div>
        <img className="App-icon" src={APP_ICON} alt="App icon" />
      </Toolbar>
    </AppBar>
  );
}

NavigationBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

NavigationBar.defaultProps = {
  classes: undefined,
};

export default withStyles(styles)(NavigationBar);
