import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { TODO_LIST_ITEMS } from '../../../../utils/constants';

const shortid = require('shortid');

const ToDoItem = ({
  editable,
  creation,
  id,
  name,
  description,
  createdDate
}) => {
  const [itemEditable, setItemEditable] = useState(false);
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCreatedDate, setItemCreatedDate] = useState('');

  useEffect(() => {
    if (editable) {
      setItemEditable(true);
    } else {
      setItemId(id);
      setItemName(name);
      setItemDescription(description);
      setItemCreatedDate(createdDate);
    }
  }, []);

  const resetForm = () => {
    setItemId('');
    setItemName('');
    setItemDescription('');
    setItemCreatedDate('');
  };

  const createItem = (data, items) => {
    const newToDoItems = JSON.stringify([...items, data]);

    localStorage.setItem(TODO_LIST_ITEMS, newToDoItems);

    resetForm();
  };

  const updateItem = (index, data, items) => {
    const newItems = items;

    newItems[index] = data;

    const newToDoItems = JSON.stringify(newItems);

    localStorage.setItem(TODO_LIST_ITEMS, newToDoItems);

    // TODO: might be able to remove after redux implementation
    setItemEditable(false);
  };

  const deleteItem = (todoId, items) => {
    const newToDoItems = JSON.stringify(
      items.filter(item => item.itemId !== todoId)
    );

    localStorage.setItem(TODO_LIST_ITEMS, newToDoItems);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const persistedItems = JSON.parse(localStorage.getItem(TODO_LIST_ITEMS));
    const existingIndex = persistedItems.findIndex(
      item => item.itemId === itemId
    );

    const formData = {
      itemId: itemId || shortid.generate(),
      itemName,
      itemDescription,
      itemCreatedDate: itemCreatedDate || new Date().toString()
    };

    if (existingIndex >= 0) {
      updateItem(existingIndex, formData, persistedItems);
    } else {
      createItem(formData, persistedItems);
    }
  };

  const handleOnEditClicked = () => {
    setItemEditable(true);
  };

  const handleOnDeleteClicked = () => {
    const persistedItems = JSON.parse(localStorage.getItem(TODO_LIST_ITEMS));
    deleteItem(itemId, persistedItems);
  };

  const todoItemClass = `todo-item
    ${itemEditable && 'todo-item--editable'}
    ${creation && 'todo-item--creation'}`;

  const showDescription =
    creation || itemEditable || (!itemEditable && itemDescription);

  return (
    <li className={todoItemClass}>
      <form className="todo-item__form" onSubmit={handleSubmit}>
        <input
          className="todo-item__form__name"
          id="name"
          type="text"
          value={itemName}
          placeholder="Add a to-do..."
          onChange={e => setItemName(e.target.value)}
          disabled={!itemEditable}
        />
        {showDescription && (
          <textarea
            className="todo-item__form__description"
            id="description"
            type="text"
            value={itemDescription}
            placeholder="Give it a description... (optional)"
            onChange={e => setItemDescription(e.target.value)}
            disabled={!itemEditable}
          />
        )}
        {itemEditable ? (
          <button
            className="todo-item__form__button todo-item__form__button--submit"
            type="submit"
            disabled={!itemName}
          >
            {creation ? 'Create' : 'Update'}
          </button>
        ) : (
          <div className="todo-item__form__bottom-wrapper">
            <p className="todo-item__form__created">
              Created: {itemCreatedDate}
            </p>
            <div className="todo-item__form__buttons-wrapper">
              <button
                className="todo-item__form__button todo-item__form__button--edit"
                type="button"
                onClick={handleOnEditClicked}
              >
                Edit
              </button>
              <button
                className="todo-item__form__button todo-item__form__button--delete"
                type="button"
                onClick={handleOnDeleteClicked}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </form>
    </li>
  );
};

ToDoItem.propTypes = {
  creation: PropTypes.bool,
  editable: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string
};

ToDoItem.defaultProps = {
  creation: false,
  editable: false,
  id: '',
  name: '',
  description: '',
  createdDate: ''
};

export default ToDoItem;
