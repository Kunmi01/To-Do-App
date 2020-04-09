import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM
} from './action-types';

export function createToDoItem(payload) {
  return { type: CREATE_TODO_ITEM, payload };
}

export function updateToDoItem(payload) {
  return { type: UPDATE_TODO_ITEM, payload };
}

export function deleteToDoItem(payload) {
  return { type: DELETE_TODO_ITEM, payload };
}
