import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import shop from './shop';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';
import NavigationBar from './appBar/appBar';

const API_KEY = '5e788b7fd657d76b78aade1b81481c6b';
const ENDPOINT = `https://www.food2fork.com/api/search?key=${API_KEY}&q=sushi`;

class App extends React.Component {
  componentDidMount() {
    const { products, setProducts } = this.props;

    if (!products.length) {
      fetch(ENDPOINT)
        .then(response => response.json())
        .then(data => {
          const sushis = this.dishPriceSetter(data.recipes);
          setProducts(sushis);
        })
        .catch(() => alert('Error while fetching data.'));
    }
  }

  dishPriceSetter = data => {
    const meals = data;

    meals.forEach((meal, index) => {
      const mealID = meal.recipe_id;
      const i = index;

      meals[i].favorite = false;
      meals[i].count = 0;
      meals[i].id = i;

      if (isNaN(mealID)) {
        meals[i].recipe_id = 100;
      } else {
        meals[i].recipe_id = (mealID / 100).toFixed(2);
      }
    });

    return meals;
  };

  // updateDataStateOnRemoveFromCheckout = (newData, mealID = false) => {
  //   const { data } = this.state;

  //   if (mealID || mealID === 0) {
  //     data[mealID].count = 0;

  //     this.setState({ data });

  //     localStorage.setItem('data', JSON.stringify(data));
  //   } else if (newData) {
  //     this.setState({ data: newData });
  //     localStorage.setItem('data', JSON.stringify(data));
  //   }
  // };

  // updateDataStateOnRemoveFromFavorites = newData => {
  //   this.setState({ data: newData });
  // };

  render() {
    const { products } = this.props;

    return products.length ? (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/error" component={PageNotFound} />
        </div>
      </Router>
    ) : (
      <PageNotFound />
    );
  }
}

App.propTypes = {
  setProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  cart: state.shop.cart,
  products: state.shop.products,
  favorites: state.shop.favorites,
});

const mapDispatchToProps = dispatch => ({
  setProducts: data => dispatch(shop.actions.setProducts(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
