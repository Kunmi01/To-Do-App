import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import shortid from 'shortid';

import {
  startRecordingActions,
  stopRecordingActions,
  playRecordedActions,
  clearRecordedActions
} from '../../redux/actions';

import ActionCapture from './components/ActionCapture';
import './styles.scss';

const mapStateToProps = ({ isRecording, isPlaying, recordedActions }) => {
  return { isRecording, isPlaying, recordedActions };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export const ActionRecorder = ({
  isRecording,
  isPlaying,
  recordedActions,
  dispatch
}) => {
  const handleOnRecordClicked = () => {
    dispatch(startRecordingActions());
  };

  const handleOnStopClicked = () => {
    dispatch(stopRecordingActions());
  };

  const handleOnPlayClicked = () => {
    dispatch(playRecordedActions());
  };

  const handleOnClearClicked = () => {
    dispatch(clearRecordedActions());
  };

  const getRecorderState = () => {
    let recorderState = 'Stopped';
    if (isRecording) {
      recorderState = 'Recording...';
    } else if (isPlaying) {
      recorderState = 'Playing...';
    }
    return recorderState;
  };

  const feedbackWrapperClassName = classNames(
    'action-recorder__feedback-wrapper',
    !!recordedActions.length && 'action-recorder__feedback-wrapper--expanded'
  );

  return (
    <div className="action-recorder">
      <div className="action-recorder__wrapper">
        <h3 className="action-recorder__header">Action Recorder</h3>
        <div className="action-recorder__inner-wrapper">
          <div className="action-recorder__buttons-wrapper">
            <button
              className="action-recorder__button action-recorder__button--record"
              type="button"
              onClick={handleOnRecordClicked}
              disabled={isRecording || isPlaying}
            >
              Record
            </button>
            <button
              className="action-recorder__button action-recorder__button--stop"
              type="button"
              onClick={handleOnStopClicked}
              disabled={!isRecording || isPlaying}
            >
              Stop
            </button>
            <button
              className="action-recorder__button action-recorder__button--play"
              type="button"
              onClick={handleOnPlayClicked}
              disabled={isRecording || isPlaying || !recordedActions.length}
            >
              Play
            </button>
            <button
              className="action-recorder__button action-recorder__button--clear"
              type="button"
              onClick={handleOnClearClicked}
              disabled={isRecording || isPlaying}
            >
              Clear
            </button>
          </div>
          <p className="action-recorder__status">
            <span>status: </span>
            {getRecorderState()}
          </p>
          <div className={feedbackWrapperClassName}>
            {!!recordedActions.length &&
              recordedActions
                .map(action => (
                  <ActionCapture
                    key={shortid.generate()}
                    type={action.type}
                    payload={action.payload}
                  />
                ))
                .reverse()}
          </div>
        </div>
      </div>
    </div>
  );
};

ActionRecorder.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  recordedActions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      payload: PropTypes.shape({})
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionRecorder);
