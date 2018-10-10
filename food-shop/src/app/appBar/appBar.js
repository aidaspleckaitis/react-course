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

const styles = () => ({
  appBar: {
    backgroundColor: 'white',
  },
  font: {
    fontFamily: 'Cookie',
  },
  button: {
    fontFamily: 'Bree Serif',
    fontSize: 15,
    color: 'dark',
    marginRight: 40,
    '&:hover': {
      backgroundColor: '#a9a9a9',
    },
  },
});

function NavigationBar(props) {
  const { classes } = props;

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
        {/* <img className="App-icon" src={APP_ICON} alt="App icon" /> */}
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
