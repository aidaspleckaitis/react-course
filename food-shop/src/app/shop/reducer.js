const INITIAL_STATE = {
  products: JSON.parse(localStorage.getItem('productsReference')) || [],
  favorites: JSON.parse(localStorage.getItem('favoritesReference')) || [],
  cart: JSON.parse(localStorage.getItem('cartReference')) || [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, data } = action;

  switch (type) {
    case 'ADD_TO_FAVORITES':
      localStorage.setItem(
        'favoritesReference',
        JSON.stringify([...state.favorites, data])
      );
      return { ...state, favorites: [...state.favorites, data] };
    case 'ADD_TO_CART':
      localStorage.setItem(
        'cartReference',
        JSON.stringify([...state.cart, data])
      );
      return { ...state, cart: [...state.cart, data] };
    case 'REMOVE_FROM_FAVORITES':
      localStorage.setItem('favoritesReference', JSON.stringify(data));
      return { ...state, favorites: [...state.favorites, data] };
    case 'SET_CART':
      localStorage.setItem('cartReference', JSON.stringify(data));
      return { ...state, cart: data };
    case 'SET_PRODUCTS':
      localStorage.setItem('productsReference', JSON.stringify(data));
      return { ...state, products: data };
    case 'SET_FAVORITES':
      localStorage.setItem('favoritesReference', JSON.stringify(data));
      return { ...state, favorites: data };
    case 'SET_PRODUCTS_ERROR':
      return { ...state, error: data };
    default:
      return state;
  }
};
