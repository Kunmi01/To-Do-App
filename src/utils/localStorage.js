import { TODO_LIST_ITEMS, RECORDED_ACTIONS } from './constants';

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

export const initializeRecordedActions = () => {
  try {
    localStorage.setItem(RECORDED_ACTIONS, JSON.stringify([]));
    return [];
  } catch {
    return [];
  }
};

export const loadRecordedActions = () => {
  try {
    const storedActions =
      JSON.parse(localStorage.getItem(RECORDED_ACTIONS)) || undefined;
    return storedActions;
  } catch (err) {
    return undefined;
  }
};

export const saveRecordedActions = recordedActions => {
  try {
    const serializedActions = JSON.stringify(recordedActions);
    localStorage.setItem(RECORDED_ACTIONS, serializedActions);
  } catch {
    // ignore write errors
  }
};
