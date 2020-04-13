import React from 'react';
import ActionRecorderContainer from './components/ActionRecorder';
import ToDoListContainer from './components/ToDoList';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <ActionRecorderContainer />
      <ToDoListContainer />
    </div>
  );
};

export default App;
