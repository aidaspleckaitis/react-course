import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from '../components/Card';

import shop from '../shop';

function Home(props) {
  const { cart, products, favorites, addToCart, addToFavorites } = props;
  console.log(products);
  return (
    <main className="App-home">
      {products.map((card, index) => (
        <Card
          data={card}
          key={index}
          cart={cart}
          favorites={favorites}
          sendData={() => {}}
          addToCart={addToCart}
          addToFavorites={addToFavorites}
        />
      ))}
    </main>
  );
}

Home.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addToCart: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

const enhance = connect(
  state => ({
    cart: shop.selectors.getCart(state),
    products: shop.selectors.getProducts(state),
    favorites: shop.selectors.getFavorites(state),
  }),
  dispatch =>
    bindActionCreators(
      {
        addToCart: shop.actions.addToCart,
        addToFavorites: shop.actions.addToFavorites,
      },
      dispatch
    )
);

export default enhance(Home);
