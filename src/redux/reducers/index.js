import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  CLEAR_TODO_LIST,
  START_RECORDING_ACTIONS,
  STOP_RECORDING_ACTIONS,
  START_PLAYBACK,
  STOP_PLAYBACK,
  CLEAR_RECORDED_ACTIONS
} from '../actions/action-types';
import {
  initializeToDoList,
  loadToDoList,
  initializeRecordedActions,
  loadRecordedActions
} from '../../utils/localStorage';

const initialState = {
  isRecording: false,
  isPlaying: false,
  recordedActions: loadRecordedActions() || initializeRecordedActions(),
  toDoList: loadToDoList() || initializeToDoList()
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO_ITEM:
    case UPDATE_TODO_ITEM:
    case DELETE_TODO_ITEM:
      return {
        ...state,
        toDoList: action.newToDoList,
        recordedActions: action.newRecordedActions || state.recordedActions
      };
    case CLEAR_TODO_LIST:
      return { ...state, toDoList: initializeToDoList() };
    case START_RECORDING_ACTIONS:
      return { ...state, isRecording: true };
    case STOP_RECORDING_ACTIONS:
      return { ...state, isRecording: false };
    case START_PLAYBACK:
      return { ...state, isPlaying: true };
    case STOP_PLAYBACK:
      return { ...state, isPlaying: false };
    case CLEAR_RECORDED_ACTIONS:
      return { ...state, recordedActions: initializeRecordedActions() };
    default:
      return state;
  }
}

export default rootReducer;
