import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const logging = ({ getState, dispatch }) => next => action => {
  console.log(action.type);
  return next(action);
};

export default applyMiddleware(ReduxThunk, logging);
