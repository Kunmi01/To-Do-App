import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { TODO_LIST_ITEMS } from '../../../../utils/constants';

const shortid = require('shortid');

const ListItem = ({
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
    const newListItems = JSON.stringify([...items, data]);

    localStorage.setItem(TODO_LIST_ITEMS, newListItems);

    resetForm();
  };

  const updateItem = (index, data, items) => {
    const newItems = items;

    newItems[index] = data;

    const newListItems = JSON.stringify(newItems);

    localStorage.setItem(TODO_LIST_ITEMS, newListItems);

    // TODO: might be able to remove after redux implementation
    setItemEditable(false);
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
    const newListItems = JSON.stringify(
      persistedItems.filter(item => item.itemId !== itemId)
    );

    localStorage.setItem(TODO_LIST_ITEMS, newListItems);
  };

  const itemClass = `list-item
    ${itemEditable && 'list-item--editable'}
    ${creation && 'list-item--creation'}`;

  const showDescription =
    creation || itemEditable || (!itemEditable && itemDescription);

  return (
    <li className={itemClass}>
      <form className="list-item__form" onSubmit={handleSubmit}>
        <input
          className="list-item__form__name"
          id="name"
          type="text"
          value={itemName}
          placeholder="Add a to-do..."
          onChange={e => setItemName(e.target.value)}
          disabled={!itemEditable}
        />
        {showDescription && (
          <textarea
            className="list-item__form__description"
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
            className="list-item__form__button list-item__form__button--submit"
            type="submit"
            disabled={!itemName}
          >
            {creation ? 'Create' : 'Update'}
          </button>
        ) : (
          <div className="list-item__form__bottom-wrapper">
            <p className="list-item__form__created">
              Created: {itemCreatedDate}
            </p>
            <div className="list-item__form__buttons-wrapper">
              <button
                className="list-item__form__button list-item__form__button--edit"
                type="button"
                onClick={handleOnEditClicked}
              >
                Edit
              </button>
              <button
                className="list-item__form__button list-item__form__button--delete"
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

ListItem.propTypes = {
  creation: PropTypes.bool,
  editable: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string
};

ListItem.defaultProps = {
  creation: false,
  editable: false,
  id: '',
  name: '',
  description: '',
  createdDate: ''
};

export default ListItem;
