import { TODO_LIST_ITEMS } from './constants';

export const initializeToDoItems = () => {
  try {
    localStorage.setItem(TODO_LIST_ITEMS, JSON.stringify([]));
    return [];
  } catch {
    return [];
  }
};

export const loadToDoItems = () => {
  try {
    const storedItems =
      JSON.parse(localStorage.getItem(TODO_LIST_ITEMS)) || undefined;
    return storedItems;
  } catch (err) {
    return undefined;
  }
};

export const saveToDoItems = toDoItems => {
  try {
    const serializedItems = JSON.stringify(toDoItems);
    localStorage.setItem(TODO_LIST_ITEMS, serializedItems);
  } catch {
    // ignore write errors
  }
};
