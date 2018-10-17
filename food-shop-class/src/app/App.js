import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { AtomSpinner } from 'react-epic-spinners';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';

import shop from './shop';

import './style/index.css';

const ROUTES = ['home', 'favorites', 'checkout'];

class App extends React.Component {
  componentDidMount() {
    const { getProducts } = this.props;

    getProducts();
  }

  render() {
    const { error, fetching } = this.props;

    if (fetching) {
      return (
        <div className="Spinner">
          <AtomSpinner color="red" />
        </div>
      );
    } else {
      return (
        <div className="App-container">
          <Navbar routes={ROUTES} />
          {error && <h1>{error}</h1>}
          <div>
            <Switch>
              <Route exact path="/home" component={Home} />
              {/* <Redirect exact from="*" to="/home" /> */}
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/checkout" component={Checkout} />
              <Route path="/404" component={PageNotFound} />
              <Redirect from="*" to="/404" />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  getProducts: PropTypes.func.isRequired,
  error: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
};

App.defaultProps = {
  error: undefined,
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      error: shop.selectors.getError(state),
      fetching: shop.selectors.isFetching(state),
    }),
    dispatch =>
      bindActionCreators({ getProducts: shop.actions.getProducts }, dispatch)
  )
);

export default enhance(App);
