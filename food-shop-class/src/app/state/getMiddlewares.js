import { applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import ReduxThunk from 'redux-thunk';

const logging = ({ getState, dispatch }) => next => action => {
  console.log(action.type);
  return next(action);
};

export default applyMiddleware(ReduxThunk, apiMiddleware, logging);
