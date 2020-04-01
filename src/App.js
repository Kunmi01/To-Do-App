import React from 'react';
import WolfImage from './assets/images/Wolf_Multi.png';
import './globalStyles.scss';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <h1>My React App</h1>
      <img src={WolfImage} alt="wolf-multi" />
      <div className="image-div" />
    </div>
  );
};

export default App;
