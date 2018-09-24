import React from 'react';
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
      error: undefined,
    };
  }

  componentDidMount() {
    let sushiMeals = JSON.parse(localStorage.getItem('data'));

    if (!sushiMeals) {
      fetch(ENDPOINT)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('data', JSON.stringify(data.recipes));
          this.setState({ data: data.recipes });
        })
        .catch(() => this.setState({ error: DEFAULT_ERROR }));
    } else {
      console.log('recipes: ', sushiMeals);
      sushiMeals = this.dishPriceSetter(sushiMeals);
      this.setState({ data: sushiMeals });
    }
  }

  dishPriceSetter = data => {
    const meals = data;

    meals.forEach((meal, index) => {
      const mealID = meal.recipe_id;

      if (isNaN(mealID)) {
        meals[index].recipe_id = '100.00';
      } else {
        meals[index].recipe_id = mealID / 100;
      }
    });

    return meals;
  };

  render() {
    const { route, data, error } = this.state;

    return (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path="/" render={() => <Home data={data} />} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/error" component={PageNotFound} />
        </div>
      </Router>
    );
  }
}

export default App;
