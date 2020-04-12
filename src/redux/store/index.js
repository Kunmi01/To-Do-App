/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import {
  toDoListMiddleware,
  playRecordedActionsMiddleware
} from '../middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(toDoListMiddleware, playRecordedActionsMiddleware)
  )
);

export default store;
