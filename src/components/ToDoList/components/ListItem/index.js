import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ListItem = ({
  editable,
  creation,
  id,
  name,
  description,
  createdDate
}) => {
  const [itemId, setItemId] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCreatedDate, setItemCreatedDate] = useState('');

  useEffect(() => {
    if (id) setItemId(id);
    if (name) setItemName(name);
    if (description) setItemDescription(description);
    if (createdDate) setItemCreatedDate(createdDate);
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Data:', {
      itemId,
      itemName,
      itemDescription,
      itemCreatedDate
    });
  };

  const itemClass = `list-item
    ${editable && 'list-item--editable'}
    ${creation && 'list-item--creation'}`;

  return (
    <li className={itemClass}>
      <form className="list-item__form" onSubmit={handleSubmit}>
        <input
          className="list-item__form__name"
          id="name"
          type="text"
          value={itemName}
          placeholder="Add to-do name..."
          onChange={e => setItemName(e.target.value)}
          disabled={!editable}
        />
        <textarea
          className="list-item__form__description"
          id="description"
          type="text"
          value={itemDescription}
          placeholder="Add to-do description..."
          onChange={e => setItemDescription(e.target.value)}
          disabled={!editable}
        />
        {editable ? (
          <button
            className="list-item__form__button list-item__form__button--submit"
            type="submit"
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
              >
                Edit
              </button>
              <button
                className="list-item__form__button list-item__form__button--delete"
                type="button"
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
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string
};

ListItem.defaultProps = {
  creation: false,
  editable: false,
  id: null,
  name: '',
  description: '',
  createdDate: ''
};

export default ListItem;
