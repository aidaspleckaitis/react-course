import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';
import NavigationBar from './appBar/appBar';

const API_KEY = '5e788b7fd657d76b78aade1b81481c6b';
const ENDPOINT = `https://www.food2fork.com/api/search?key=${API_KEY}&q=sushi`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      cart: [],
    };
  }

  componentDidMount() {
    const sushiMeals = JSON.parse(localStorage.getItem('data'));
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!sushiMeals) {
      fetch(ENDPOINT)
        .then(response => response.json())
        .then(data => {
          const sushis = this.dishPriceSetter(data.recipes);

          localStorage.setItem('data', JSON.stringify(sushis));
          localStorage.setItem('cart', JSON.stringify(localCart));

          this.setState({ data: sushis, cart: localCart });
        })
        .catch(() => alert('Error while fetching data.'));
    } else {
      this.setState({ data: sushiMeals, cart: localCart });
    }
  }

  dishPriceSetter = data => {
    const meals = data;

    meals.forEach((meal, index) => {
      const mealID = meal.recipe_id;
      const i = index;

      meals[i].favorite = false;
      meals[i].id = i;

      if (isNaN(mealID)) {
        meals[i].recipe_id = 100;
      } else {
        meals[i].recipe_id = (mealID / 100).toFixed(2);
      }
    });

    return meals;
  };

  updateDataStateOnRemoveFromCheckout = (newData, mealID = false) => {
    const { data } = this.state;

    if (mealID || mealID === 0) {
      data[mealID].count = 0;

      this.setState({ data });

      localStorage.setItem('data', JSON.stringify(data));
    } else if (newData) {
      this.setState({ data: newData });
      localStorage.setItem('data', JSON.stringify(data));
    }
  };

  updateDataStateOnRemoveFromFavorites = newData => {
    this.setState({ data: newData });
  };

  updateCartState = (meal, newCart) => {
    const selectedMeal = meal;
    const localDataReference = JSON.parse(localStorage.getItem('data'));
    const localCartReference = JSON.parse(localStorage.getItem('cart'));

    // Add meal to state
    if (selectedMeal) {
      // Check if meal exists in cart
      if (localCartReference.filter(i => i.id === selectedMeal.id).length > 0) {
        // Update meals count
        localCartReference.forEach((item, index) => {
          if (item.id === selectedMeal.id) {
            localCartReference[index].count += 1;
          }
        });

        localDataReference[selectedMeal.id].count += Number(1);

        localStorage.setItem('data', JSON.stringify(localDataReference));

        localStorage.setItem('cart', JSON.stringify(localCartReference));

        // Update cart and data
        this.setState({ data: localDataReference, cart: localCartReference });
      } else {
        localDataReference[selectedMeal.id].count = Number(1);

        // Increase count
        selectedMeal.count = Number(1);

        localStorage.setItem('data', JSON.stringify(localDataReference));

        localStorage.setItem(
          'cart',
          JSON.stringify([...localCartReference, selectedMeal])
        );

        // Add new meal to state
        this.setState({
          data: localDataReference,
          cart: [...localCartReference, selectedMeal],
        });
      }
    }

    // Set new cart in state with removed meal
    if (newCart) {
      this.setState({ cart: newCart });
    }
  };

  // Handles favorite meals updates
  updateFavoriteMeals = (mealID, remove = false) => {
    const localFavoriteMealsReference =
      JSON.parse(localStorage.getItem('favoriteMeals')) || false;

    if (localFavoriteMealsReference) {
      localFavoriteMealsReference.forEach((item, index) => {
        if (item.id === mealID) {
          // Set count to if remove param is manually set to true
          if (remove) {
            localFavoriteMealsReference[index].count = 0;
            localStorage.setItem(
              'favoriteMeals',
              JSON.stringify(localFavoriteMealsReference)
            );
            return;
          }
          // Set count regarding if count param exists or not
          if (localFavoriteMealsReference[index].count)
            localFavoriteMealsReference[index].count += 1;
          else localFavoriteMealsReference[index].count = 1;

          localStorage.setItem(
            'favoriteMeals',
            JSON.stringify(localFavoriteMealsReference)
          );
        }
      });
    }
  };

  render() {
    const { data, cart } = this.state;

    return data.length > 0 ? (
      <Router>
        <div>
          <NavigationBar />
          <Route
            exact
            path="/"
            render={() => (
              <Home
                data={data}
                cart={cart}
                updateCartState={this.updateCartState}
                updateDataStateOnRemoveFromCheckout={
                  this.updateDataStateOnRemoveFromCheckout
                }
                updateFavoriteMeals={this.updateFavoriteMeals}
              />
            )}
          />
          <Route
            path="/favorites"
            render={() => (
              <Favorites
                cart={cart}
                updateCartState={this.updateCartState}
                updateDataStateOnRemoveFromFavorites={
                  this.updateDataStateOnRemoveFromFavorites
                }
              />
            )}
          />
          <Route
            path="/checkout"
            render={() => (
              <Checkout
                cart={cart}
                updateCartState={this.updateCartState}
                updateDataStateOnRemoveFromCheckout={
                  this.updateDataStateOnRemoveFromCheckout
                }
                updateFavoriteMeals={this.updateFavoriteMeals}
              />
            )}
          />
          <Route path="/error" component={PageNotFound} />
        </div>
      </Router>
    ) : (
      <PageNotFound />
    );
  }
}

export default App;
