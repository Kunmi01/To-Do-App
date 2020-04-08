import React, { useState, useEffect } from 'react';

import { TODO_LIST_ITEMS } from '../../utils/constants';

import ListItem from './components/ListItem';
import './styles.scss';

const ToDoList = () => {
  const [listItems, setListItems] = useState([]);

  const checkPersistedItems = () => {
    const persistedItems = JSON.parse(localStorage.getItem(TODO_LIST_ITEMS));

    if (persistedItems) {
      setListItems(persistedItems);
    } else {
      localStorage.setItem(TODO_LIST_ITEMS, JSON.stringify([]));
    }
  };

  useEffect(() => {
    checkPersistedItems();
  }, []);

  return (
    <div className="todo-list">
      <div className="todo-list__wrapper">
        <h2 className="todo-list__header">To-do List</h2>
        <ul className="todo-list__inner-wrapper">
          <ListItem creation editable />
          {!!listItems.length &&
            listItems
              .reverse()
              .map(item => (
                <ListItem
                  key={item.itemId}
                  id={item.itemId}
                  name={item.itemName}
                  description={item.itemDescription}
                  createdDate={item.itemCreatedDate}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
