const DEFAULT_ERROR = 'Failed to fetch data';

const addToCart = data => ({ type: 'ADD_TO_CART', data });
const setCart = data => ({ type: 'SET_CART', data });
const addToFavorites = data => ({ type: 'ADD_TO_FAVORITES', data });
const setProducts = data => ({ type: 'SET_PRODUCTS', data });
const setFavorites = data => ({ type: 'SET_FAVORITES', data });
const setProductsError = () => ({
  type: 'SET_PRODUCTS_ERROR',
  data: DEFAULT_ERROR,
});

const actions = {
  addToCart,
  setCart,
  addToFavorites,
  setProducts,
  setFavorites,
  setProductsError,
};

export default actions;
