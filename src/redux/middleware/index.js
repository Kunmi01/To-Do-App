import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM
} from '../actions/action-types';
import { saveToDoList } from '../../utils/localStorage';

// eslint-disable-next-line import/prefer-default-export
export const toDoListMiddleware = ({ getState }) => {
  return next => {
    return action => {
      const { toDoList } = getState();
      const newAction = { ...action };
      const newToDoList = [...toDoList];

      switch (action.type) {
        case CREATE_TODO_ITEM:
          newToDoList.push(action.payload);
          newAction.newToDoList = newToDoList;
          saveToDoList(newToDoList);
          return next(newAction);
        case UPDATE_TODO_ITEM: {
          const index = newToDoList.findIndex(
            item => item.itemId === action.payload.itemId
          );
          newToDoList[index] = action.payload;
          newAction.newToDoList = newToDoList;
          saveToDoList(newToDoList);
          return next(newAction);
        }
        case DELETE_TODO_ITEM: {
          newAction.newToDoList = newToDoList.filter(
            item => item.itemId !== action.payload.itemId
          );
          saveToDoList(newAction.newToDoList);
          return next(newAction);
        }
        default:
          return next(action);
      }
    };
  };
};

// export function toDoActionsMiddleware({ getState, dispatch }) {
//   return function (next) {
//     return function (action) {
//       return next(action);
//     };
//   };
// }
