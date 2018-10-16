import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const mid = ({ getState, dispatch }) => next => action => {
  console.log('Middleware.');
  return next(action);
};

const store = createStore(reducers, applyMiddleware(mid));

export default store;
