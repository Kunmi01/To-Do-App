import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ConnectedToDoList, { ToDoList } from '../src/components/ToDoList';
import { ToDoItem } from '../src/components/ToDoList/components/ToDoItem';

describe('ToDoList', () => {
  const initialState = {
    toDoList: []
  };
  const mockStore = configureStore();
  let store;
  let container;
  let toDoListContainer;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(
      <Provider store={store}>
        <ConnectedToDoList />
      </Provider>
    );
    toDoListContainer = container.find(ToDoList);
  });

  it('renders connected(SMART) component', () => {
    expect(container.find(ConnectedToDoList).exists()).toBe(true);
    expect(toJson(container)).toMatchSnapshot();
  });

  it('prop match with initialState', () => {
    expect(toDoListContainer.prop('toDoList')).toEqual(initialState.toDoList);
  });

  it('contains 1 creation ToDoItem', () => {
    expect(toDoListContainer.find(ToDoItem)).toHaveLength(1);
    expect(toDoListContainer.find(ToDoItem).prop('creation')).toBe(true);
    expect(toDoListContainer.find(ToDoItem).prop('editable')).toBe(true);
  });
});
