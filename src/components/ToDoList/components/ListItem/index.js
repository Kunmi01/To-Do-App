import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ListItem = ({ editable, creationItem, name, description, created }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCreated, setItemCreated] = useState('');

  useEffect(() => {
    if (name) setItemName(name);
    if (description) setItemDescription(description);
    if (created) setItemCreated(created);
  });

  const handleSubmit = e => {
    e.preventDefault();
    // console.log('Data:', { itemName, itemDescription, itemCreated });
  };

  const itemClass = `list-item
    ${editable && 'list-item--editable'}
    ${creationItem && 'list-item--creation-item'}`;

  return (
    <li className={itemClass}>
      <form className="list-item__form" onSubmit={handleSubmit}>
        <input
          className="list-item__name"
          id="name"
          type="text"
          value={itemName}
          placeholder="Add to-do name..."
          onChange={e => setItemName(e.target.value)}
          disabled={!editable}
        />
        <textarea
          className="list-item__description"
          id="description"
          type="text"
          value={itemDescription}
          placeholder="Add to-do description..."
          onChange={e => setItemDescription(e.target.value)}
          disabled={!editable}
        />
        {editable ? (
          <button className="list-item__submit" type="submit">
            Create / Update
          </button>
        ) : (
          <p className="list-item__created">Created: {itemCreated}</p>
        )}
      </form>
    </li>
  );
};

ListItem.propTypes = {
  creationItem: PropTypes.bool,
  editable: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.string
};

ListItem.defaultProps = {
  creationItem: false,
  editable: false,
  name: '',
  description: '',
  created: ''
};

export default ListItem;
