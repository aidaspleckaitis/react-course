import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';
import NavigationBar from './appBar/appBar';

const DEFAULT_ERROR = 'Failed to fetch data.';
const API_KEY = '5e788b7fd657d76b78aade1b81481c6b';
const ENDPOINT = `https://www.food2fork.com/api/search?key=${API_KEY}&q=sushi`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: 'home',
      data: [],
      cart: [],
      error: undefined,
    };
  }

  componentDidMount() {
    const sushiMeals = JSON.parse(localStorage.getItem('data'));
    console.log('sushiMeals: ', sushiMeals);

    if (!sushiMeals) {
      fetch(ENDPOINT)
        .then(response => response.json())
        .then(data => {
          const sushis = this.dishPriceSetter(data.recipes);

          localStorage.setItem('data', JSON.stringify(sushis));
          this.setState({ data: sushis });
        })
        .catch(() => this.setState({ error: DEFAULT_ERROR }));
    } else {
      this.setState({ data: sushiMeals });
    }
  }

  dishPriceSetter = data => {
    const meals = data;

    meals.forEach((meal, index) => {
      const mealID = meal.recipe_id;

      meals[index].favorite = false;
      meals[index].id = index;

      if (isNaN(mealID)) {
        meals[index].recipe_id = 100;
      } else {
        meals[index].recipe_id = (mealID / 100).toFixed(2);
      }
    });

    return meals;
  };

  updateCartState = (meal, newCart) => {
    const { cart } = this.state;

    // Add meal to state
    if (meal) {
      const nextCart = cart;

      // Check if meal exists in cart
      if (nextCart.filter(i => i.id === meal.id).length > 0) {
        // Update meals count
        cart.forEach((item, index) => {
          if (item.id === meal.id) {
            if (nextCart[index].count) {
              nextCart[index].count += 1;
            } else {
              nextCart[index].count = 1;
            }
          }
        });
        // Update cart
        this.setState({ cart: nextCart });
      } else {
        // Add new meal to state
        this.setState({ cart: [...cart, meal] });
      }
    }

    // Set new cart in state with removed meal
    if (newCart) this.setState({ cart: newCart });
  };

  render() {
    const { data, cart } = this.state;

    if (data.length > 0) {
      return (
        <Router>
          <div>
            <NavigationBar />
            <Route
              exact
              path="/"
              render={() => (
                <Home data={data} updateCartState={this.updateCartState} />
              )}
            />
            <Route path="/favorites" component={Favorites} />
            <Route
              path="/checkout"
              render={() => (
                <Checkout cart={cart} updateCartState={this.updateCartState} />
              )}
            />
            <Route path="/error" component={PageNotFound} />
          </div>
        </Router>
      );
    }
    return <PageNotFound />;
  }
}

export default App;
