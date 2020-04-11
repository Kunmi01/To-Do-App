import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  START_RECORDING_ACTIONS,
  STOP_RECORDING_ACTIONS
} from '../actions/action-types';
import {
  initializeToDoList,
  loadToDoList,
  initializeRecordedActions,
  loadRecordedActions
} from '../../utils/localStorage';

const initialState = {
  isRecording: false,
  toDoList: loadToDoList() || initializeToDoList(),
  recordedActions: loadRecordedActions() || initializeRecordedActions()
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO_ITEM:
    case UPDATE_TODO_ITEM:
    case DELETE_TODO_ITEM:
      return { ...state, toDoList: action.newToDoList };
    case START_RECORDING_ACTIONS:
      return { ...state, isRecording: true };
    case STOP_RECORDING_ACTIONS:
      return { ...state, isRecording: false };
    default:
      return state;
  }
}

export default rootReducer;
