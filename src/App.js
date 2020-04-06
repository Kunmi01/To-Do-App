import React from 'react';
import ActionRecorder from './components/ActionRecorder';
import ToDoList from './components/ToDoList';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <ActionRecorder />
      <ToDoList />
    </div>
  );
};

export default App;
