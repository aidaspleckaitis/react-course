import React from 'react';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/PageNotFound';

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
      .then(data => this.setState({ data }))
      .catch(() => this.setState({ error: DEFAULT_ERROR }));
  }

  render() {
    const { route, data, error } = this.state;
    console.log('TCL: App -> render -> data', data);

    if (error) {
      return <h1>{error}</h1>;
    }

    switch (route) {
      case 'home':
        return <Home />;
      case 'favorites':
        return <Favorites />;
      case 'checkout':
        return <Checkout />;

      default:
        return <PageNotFound />;
    }
  }
}

export default App;
