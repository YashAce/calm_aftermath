import React from 'react';
import './App.css';
import Dropdown from './Dropdown';
import TileView from './Tile';


function App() {
  return (
    <>
    <div className="App" style={{ backgroundColor: 'black' }}>
      <Dropdown />
    </div>
    <TileView/>
    </>
    
  );
}

export default App;
