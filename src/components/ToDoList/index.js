import React, { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import './styles.scss';

const dummyListItems = [
  {
    id: 1,
    name: 'List item name one',
    description: 'List item description one',
    created: new Date().toString()
  },
  {
    id: 2,
    name: 'List item name two',
    description: 'List item description two',
    created: new Date().toString()
  },
  {
    id: 3,
    name: 'List item name three',
    description: 'List item description three',
    created: new Date().toString()
  }
];

const ToDoList = () => {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    setListItems(dummyListItems);
  });

  return (
    <div className="todo-list">
      <div className="todo-list__wrapper">
        <h2 className="todo-list__header">To-do List</h2>
        <ul className="todo-list__inner-wrapper">
          <ListItem creationItem editable />
          {listItems.length &&
            listItems.map(item => (
              <ListItem
                key={item.id}
                name={item.name}
                description={item.description}
                created={item.created}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
