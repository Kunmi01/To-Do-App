import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  CLEAR_TODO_LIST,
  START_RECORDING_ACTIONS,
  STOP_RECORDING_ACTIONS,
  PLAY_RECORDED_ACTIONS,
  START_PLAYBACK,
  STOP_PLAYBACK,
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

export const clearToDoList = () => {
  return { type: CLEAR_TODO_LIST };
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

export const startPlayback = () => {
  return { type: START_PLAYBACK };
};

export const stopPlayback = () => {
  return { type: STOP_PLAYBACK };
};

export const clearRecordedActions = () => {
  return { type: CLEAR_RECORDED_ACTIONS };
};
