import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import shortid from 'shortid';

import {
  createToDoItem,
  updateToDoItem,
  deleteToDoItem
} from '../../../../redux/actions';

import './styles.scss';

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

const ToDoItem = ({
  editable,
  creation,
  id,
  name,
  description,
  createdDate,
  dispatch
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
  }, [name, description]);

  const resetForm = () => {
    setItemId('');
    setItemName('');
    setItemDescription('');
    setItemCreatedDate('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      itemId: itemId || shortid.generate(),
      itemName,
      itemDescription,
      itemCreatedDate: itemCreatedDate || new Date().toString()
    };

    if (creation) {
      dispatch(createToDoItem(formData));
      resetForm();
    } else {
      dispatch(updateToDoItem(formData));
      setItemEditable(false);
    }
  };

  const handleOnEditClicked = () => {
    setItemEditable(true);
  };

  const handleOnDeleteClicked = () => {
    dispatch(deleteToDoItem({ itemId }));
  };

  const todoItemClass = classNames(
    'todo-item',
    itemEditable && 'todo-item--editable',
    creation && 'todo-item--creation'
  );

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
  createdDate: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

ToDoItem.defaultProps = {
  creation: false,
  editable: false,
  id: '',
  name: '',
  description: '',
  createdDate: ''
};

export default connect(null, mapDispatchToProps)(ToDoItem);
