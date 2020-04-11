import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  START_RECORDING_ACTIONS,
  STOP_RECORDING_ACTIONS,
  PLAY_RECORDED_ACTIONS,
  CLEAR_RECORDED_ACTIONS
} from './action-types';

export const createToDoItem = payload => {
  return { type: CREATE_TODO_ITEM, payload };
};

export const updateToDoItem = payload => {
  return { type: UPDATE_TODO_ITEM, payload };
};

export const deleteToDoItem = payload => {
  return { type: DELETE_TODO_ITEM, payload };
};

export const startRecordingActions = () => {
  return { type: START_RECORDING_ACTIONS };
};

export const stopRecordingActions = () => {
  return { type: STOP_RECORDING_ACTIONS };
};

export const playRecordedActions = () => {
  return { type: PLAY_RECORDED_ACTIONS };
};

export const clearRecordedActions = () => {
  return { type: CLEAR_RECORDED_ACTIONS };
};
