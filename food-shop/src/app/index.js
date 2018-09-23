import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';
import NavigationBar from './appBar/appBar';

const DEFAULT_ERROR = 'Failed to fetch data.';
const ENDPOINT =
  'https://boiling-reaches-93648.herokuapp.com/food-shop/products';

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
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const dishes = this.dishDescriptionClipper(data);

        this.setState({ data: dishes });
      })
      .catch(() => this.setState({ error: DEFAULT_ERROR }));
  }

  dishDescriptionClipper = data => {
    const maxLength = 120;
    const ending = '...';
    const dishes = data;

    dishes.forEach((dish, index) => {
      const dishDescription = dish.description;

      if (dishDescription.length > maxLength) {
        dishes[index].description =
          dishDescription.substring(0, maxLength - ending.length) + ending;
      }
    });
    return dishes;
  };

  render() {
    const { route, data, error } = this.state;
    console.log('data: ', data);

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
