import { saveToDoList, saveRecordedActions } from '../../utils/localStorage';
import {
  clearToDoList,
  createToDoItem,
  updateToDoItem,
  deleteToDoItem
} from '../actions';
import {
  CREATE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  PLAY_RECORDED_ACTIONS
} from '../actions/action-types';

export const toDoListMiddleware = ({ getState }) => {
  return next => {
    return action => {
      const { toDoList, isRecording, recordedActions } = getState();
      const newAction = { ...action };
      const newToDoList = [...toDoList];
      const newRecordedActions = [...recordedActions];

      const recordAction = () => {
        if (isRecording) {
          newRecordedActions.push(action);
          newAction.newRecordedActions = newRecordedActions;
          saveRecordedActions(newRecordedActions);
        }
      };

      switch (action.type) {
        case CREATE_TODO_ITEM:
          newToDoList.push(action.payload);
          newAction.newToDoList = newToDoList;
          recordAction();
          saveToDoList(newToDoList);
          return next(newAction);
        case UPDATE_TODO_ITEM: {
          const index = newToDoList.findIndex(
            item => item.itemId === action.payload.itemId
          );
          newToDoList[index] = action.payload;
          newAction.newToDoList = newToDoList;
          recordAction();
          saveToDoList(newToDoList);
          return next(newAction);
        }
        case DELETE_TODO_ITEM: {
          newAction.newToDoList = newToDoList.filter(
            item => item.itemId !== action.payload.itemId
          );
          recordAction();
          saveToDoList(newAction.newToDoList);
          return next(newAction);
        }
        default:
          return next(action);
      }
    };
  };
};

export const playRecordedActionsMiddleware = ({ getState, dispatch }) => {
  return next => {
    return action => {
      const { isRecording, recordedActions } = getState();

      let waitMultiplier = 0;
      const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
      const waitToExecute = async func => {
        await wait(1000 * waitMultiplier);
        func();
      };

      if (!isRecording && action.type === PLAY_RECORDED_ACTIONS) {
        dispatch(clearToDoList());

        recordedActions.forEach(actionRecorded => {
          waitMultiplier += 1;
          switch (actionRecorded.type) {
            case CREATE_TODO_ITEM:
              waitToExecute(() =>
                dispatch(createToDoItem(actionRecorded.payload))
              );
              break;
            case UPDATE_TODO_ITEM:
              waitToExecute(() =>
                dispatch(updateToDoItem(actionRecorded.payload))
              );
              break;
            case DELETE_TODO_ITEM:
              waitToExecute(() =>
                dispatch(deleteToDoItem(actionRecorded.payload))
              );
              break;
            default:
              break;
          }
        });
      }
      return next(action);
    };
  };
};
