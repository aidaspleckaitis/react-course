const INITIAL_STATE = {
  products: [],
  favorites: [],
  cart: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, data } = action;

  switch (type) {
    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, data] };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, data] };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, products: [...state.products, data] };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, error: data };
    default:
      return state;
  }
};
