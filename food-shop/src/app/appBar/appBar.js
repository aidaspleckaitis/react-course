import React from 'react';
// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// React Router
import { Link } from 'react-router-dom';

const APP_ICON =
  'http://travelpedia.com.br/wp-content/uploads/2018/01/icon-food-and-beverage.png';

function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button>
          <Link className="Navigation-link" to="/">
            Home
          </Link>
        </Button>
        <Button>
          <Link className="Navigation-link" to="/favorites">
            Favorites
          </Link>
        </Button>
        <Button>
          <Link className="Navigation-link" to="/checkout">
            Checkout
          </Link>
        </Button>
        <div className="Title-wrapper">
          <Typography variant="title" color="inherit">
            Greatest food shop ever
          </Typography>
        </div>
        <img className="App-icon" src={APP_ICON} alt="App icon" />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
