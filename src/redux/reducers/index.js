import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM
} from '../actions/action-types';
import { initializeToDoList, loadToDoList } from '../../utils/localStorage';

const initialState = {
  toDoList: loadToDoList() || initializeToDoList()
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO_ITEM:
    case UPDATE_TODO_ITEM:
    case DELETE_TODO_ITEM:
      return { ...state, toDoList: action.newToDoList };
    default:
      return state;
  }
}

export default rootReducer;
