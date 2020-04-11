import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  startRecordingActions,
  stopRecordingActions,
  playRecordedActions,
  clearRecordedActions
} from '../../redux/actions';

import './styles.scss';

const mapStateToProps = state => {
  const { isRecording, recordedActions } = state;
  return { isRecording, recordedActions };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

const ActionRecorder = ({ isRecording, recordedActions, dispatch }) => {
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

  return (
    <div className="action-recorder">
      <div className="action-recorder__wrapper">
        <h2 className="action-recorder__header">Action Recorder</h2>
        <div className="action-recorder__inner-wrapper">
          <div className="action-recorder__buttons-wrapper">
            <button
              className="action-recorder__button action-recorder__button--record"
              type="button"
              onClick={handleOnRecordClicked}
              disabled={isRecording}
            >
              Record
            </button>
            <button
              className="action-recorder__button action-recorder__button--stop"
              type="button"
              onClick={handleOnStopClicked}
              disabled={!isRecording}
            >
              Stop
            </button>
            <button
              className="action-recorder__button action-recorder__button--play"
              type="button"
              onClick={handleOnPlayClicked}
              disabled={isRecording || !recordedActions.length}
            >
              Play
            </button>
            <button
              className="action-recorder__button action-recorder__button--clear"
              type="button"
              onClick={handleOnClearClicked}
              disabled={isRecording}
            >
              Clear
            </button>
          </div>
          <div className="action-recorder__feedback-wrapper">
            <h4>Recorded actions</h4>
            <div className="action-recorder__feedback">
              lorem ipsum dolor set impa lorem ipsum dolor set impa lorem ipsum
              dolor set impa lorem ipsum dolor set impa lorem ipsum dolor set
              impa lorem ipsum dolor set impa lorem ipsum dolor set impa lorem
              ipsum dolor set impa lorem ipsum dolor set impa lorem ipsum dolor
              set impa lorem ipsum dolor set impa lorem ipsum dolor set impa
              {/* {!!recordedActions.length &&
                recordedActions.map(action => (
                  <div className="action-recorder__feedback">{action}</div>
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ActionRecorder.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  recordedActions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      payload: PropTypes.shape({})
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionRecorder);
