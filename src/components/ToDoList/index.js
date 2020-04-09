import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToDoItem from './components/ToDoItem';
import './styles.scss';

const mapStateToProps = state => {
  return { toDoItems: state.toDoItems };
};

const ToDoList = ({ toDoItems }) => (
  <div className="todo-list">
    <div className="todo-list__wrapper">
      <h2 className="todo-list__header">To-do List</h2>
      <ul className="todo-list__inner-wrapper">
        <ToDoItem creation editable />
        {!!toDoItems.length &&
          toDoItems
            .map(item => (
              <ToDoItem
                key={item.itemId}
                id={item.itemId}
                name={item.itemName}
                description={item.itemDescription}
                createdDate={item.itemCreatedDate}
              />
            ))
            .reverse()}
      </ul>
    </div>
  </div>
);

ToDoList.propTypes = {
  toDoItems: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string,
      itemName: PropTypes.string,
      itemDescription: PropTypes.string,
      itemCreatedDate: PropTypes.string
    })
  ).isRequired
};

export default connect(mapStateToProps)(ToDoList);
