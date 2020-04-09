/* eslint-disable no-case-declarations */
import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM
} from '../actions/action-types';
import {
  loadToDoItems,
  initializeToDoItems,
  saveToDoItems
} from '../../utils/localStorage';

const initialState = {
  toDoItems: loadToDoItems() || initializeToDoItems()
};

function rootReducer(state = initialState, action) {
  let newToDoItems = null;

  switch (action.type) {
    case CREATE_TODO_ITEM:
      newToDoItems = [...state.toDoItems, action.payload];
      saveToDoItems(newToDoItems);
      return { ...state, toDoItems: newToDoItems };
    case UPDATE_TODO_ITEM:
      newToDoItems = state.toDoItems;
      const index = newToDoItems.findIndex(
        item => item.itemId === action.payload.itemId
      );
      newToDoItems[index] = action.payload;
      saveToDoItems(newToDoItems);
      return { ...state, toDoItems: newToDoItems };
    case DELETE_TODO_ITEM:
      newToDoItems = state.toDoItems.filter(
        item => item.itemId !== action.payload.itemId
      );
      saveToDoItems(newToDoItems);
      return { ...state, toDoItems: newToDoItems };
    default:
      return state;
  }
}

export default rootReducer;
