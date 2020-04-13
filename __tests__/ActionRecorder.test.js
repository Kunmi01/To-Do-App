import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ConnectedActionRecorder, {
  ActionRecorder
} from '../src/components/ActionRecorder';
import {
  startRecordingActions,
  stopRecordingActions,
  playRecordedActions,
  clearRecordedActions
} from '../src/redux/actions';

describe('ActionRecorder', () => {
  const initialState = {
    isRecording: false,
    isPlaying: false,
    recordedActions: []
  };
  const mockStore = configureStore();
  let store;
  let container;
  let actionRecorderContainer;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    container = mount(
      <Provider store={store}>
        <ConnectedActionRecorder />
      </Provider>
    );
    actionRecorderContainer = container.find(ActionRecorder);
  });

  it('renders connected(SMART) component', () => {
    expect(container.find(ConnectedActionRecorder).exists()).toBe(true);
    expect(toJson(container)).toMatchSnapshot();
  });

  it('props match with initialState', () => {
    expect(actionRecorderContainer.prop('isRecording')).toEqual(
      initialState.isRecording
    );
    expect(actionRecorderContainer.prop('isPlaying')).toEqual(
      initialState.isPlaying
    );
    expect(actionRecorderContainer.prop('recordedActions')).toEqual(
      initialState.recordedActions
    );
  });

  it('can RECORD actions', () => {
    renderer.act(() => {
      actionRecorderContainer
        .find('.action-recorder__button--record')
        .simulate('click');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(startRecordingActions());
  });

  it('can STOP recording actions', () => {
    store = mockStore({
      isRecording: true,
      isPlaying: false,
      recordedActions: []
    });
    store.dispatch = jest.fn();
    container = mount(
      <Provider store={store}>
        <ConnectedActionRecorder />
      </Provider>
    );
    actionRecorderContainer = container.find(ActionRecorder);

    renderer.act(() => {
      actionRecorderContainer
        .find('.action-recorder__button--stop')
        .simulate('click');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(stopRecordingActions());
  });

  it('can PLAY recorded actions', () => {
    store = mockStore({
      isRecording: false,
      isPlaying: false,
      recordedActions: [{ type: 'test type', payload: { itemId: 'test id' } }]
    });
    store.dispatch = jest.fn();
    container = mount(
      <Provider store={store}>
        <ConnectedActionRecorder />
      </Provider>
    );
    actionRecorderContainer = container.find(ActionRecorder);

    renderer.act(() => {
      actionRecorderContainer
        .find('.action-recorder__button--play')
        .simulate('click');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(playRecordedActions());
  });

  it('can CLEAR recorded actions', () => {
    store = mockStore({
      isRecording: false,
      isPlaying: false,
      recordedActions: [{ type: 'test type', payload: { itemId: 'test id' } }]
    });
    store.dispatch = jest.fn();
    container = mount(
      <Provider store={store}>
        <ConnectedActionRecorder />
      </Provider>
    );
    actionRecorderContainer = container.find(ActionRecorder);

    renderer.act(() => {
      actionRecorderContainer
        .find('.action-recorder__button--clear')
        .simulate('click');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(clearRecordedActions());
  });
});
