import { TODO_LIST_ITEMS } from './constants';

export const initializeToDoList = () => {
  try {
    localStorage.setItem(TODO_LIST_ITEMS, JSON.stringify([]));
    return [];
  } catch {
    return [];
  }
};

export const loadToDoList = () => {
  try {
    const storedItems =
      JSON.parse(localStorage.getItem(TODO_LIST_ITEMS)) || undefined;
    return storedItems;
  } catch (err) {
    return undefined;
  }
};

export const saveToDoList = toDoList => {
  try {
    const serializedItems = JSON.stringify(toDoList);
    localStorage.setItem(TODO_LIST_ITEMS, serializedItems);
  } catch {
    // ignore write errors
  }
};
