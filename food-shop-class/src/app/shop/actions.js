const DEFAULT_ERROR = 'Failed to fetch data';
const ENDPOINT =
  'https://boiling-reaches-93648.herokuapp.com/food-shop/products';

const addToCart = data => ({ type: 'ADD_TO_CART', data });
const addToFavorites = data => ({ type: 'ADD_TO_FAVORITES', data });
const getProducts = async () => {
  const action = await fetch(ENDPOINT)
    .then(response => response.json())
    .then(all => ({ type: 'FETCH_PRODUCTS_SUCCESS', data: all }))
    .catch(() => ({ type: 'FETCH_PRODUCTS_FAILURE', data: DEFAULT_ERROR }));

  return action;
};

const actions = { addToCart, addToFavorites, getProducts };

export default actions;
