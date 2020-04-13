import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ConnectedToDoItem, {
  ToDoItem
} from '../src/components/ToDoList/components/ToDoItem';
import {
  updateToDoItem,
  deleteToDoItem,
  createToDoItem
} from '../src/redux/actions';

describe('ToDoItem', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders connected(SMART) component', () => {
    const container = mount(
      <Provider store={store}>
        <ConnectedToDoItem />
      </Provider>
    );
    expect(container.find(ConnectedToDoItem).exists()).toBe(true);
    expect(toJson(container)).toMatchSnapshot();
  });

  it('can CREATE a todo', () => {
    const container = mount(
      <Provider store={store}>
        <ConnectedToDoItem creation editable />
      </Provider>
    );
    const toDoItemContainer = container.find(ToDoItem);

    renderer.act(() => {
      toDoItemContainer.find('.todo-item__form__name').simulate('change', {
        target: { value: 'test name' }
      });
    });
    renderer.act(() => {
      toDoItemContainer
        .find('.todo-item__form__description')
        .simulate('change', {
          target: { value: 'test description' }
        });
    });
    renderer.act(() => {
      toDoItemContainer.find('.todo-item__form').simulate('submit');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      createToDoItem({
        itemId: expect.any(String),
        itemName: 'test name',
        itemDescription: 'test description',
        itemCreatedDate: new Date().toString()
      })
    );
  });

  it('can UPDATE a todo', () => {
    const container = mount(
      <Provider store={store}>
        <ConnectedToDoItem
          dispatch={store.dispatch}
          id="1"
          name="test name"
          description="test description"
          createdDate="today"
        />
      </Provider>
    );
    const toDoItemContainer = container.find(ToDoItem);

    renderer.act(() => {
      toDoItemContainer
        .find('.todo-item__form__button--edit')
        .simulate('click');
    });
    renderer.act(() => {
      toDoItemContainer
        .find('.todo-item__form__description')
        .simulate('change', {
          target: { value: 'description changed' }
        });
    });
    renderer.act(() => {
      toDoItemContainer.find('.todo-item__form').simulate('submit');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      updateToDoItem({
        itemId: '1',
        itemName: 'test name',
        itemDescription: 'description changed',
        itemCreatedDate: 'today'
      })
    );
  });

  it('can DELETE a todo', () => {
    const container = mount(
      <Provider store={store}>
        <ConnectedToDoItem
          dispatch={store.dispatch}
          id="1"
          name="test name"
          createdDate={new Date().toString()}
        />
      </Provider>
    );
    const toDoItemContainer = container.find(ToDoItem);

    renderer.act(() => {
      toDoItemContainer
        .find('.todo-item__form__button--delete')
        .simulate('click');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      deleteToDoItem({ itemId: '1' })
    );
  });
});
