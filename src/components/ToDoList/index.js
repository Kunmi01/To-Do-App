import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToDoItem from './components/ToDoItem';
import './styles.scss';

const mapStateToProps = state => {
  return { toDoList: state.toDoList };
};

const ToDoList = ({ toDoList }) => (
  <div className="todo-list">
    <div className="todo-list__wrapper">
      <h3 className="todo-list__header">To-do List</h3>
      <ul className="todo-list__inner-wrapper">
        <ToDoItem creation editable />
        {!!toDoList.length &&
          toDoList
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
  toDoList: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      itemName: PropTypes.string.isRequired,
      itemDescription: PropTypes.string,
      itemCreatedDate: PropTypes.string.isRequired
    })
  ).isRequired
};

export default connect(mapStateToProps)(ToDoList);
