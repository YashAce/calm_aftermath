import React from 'react';
import './App.css';
import Header from './Header';
import TileView from './Tile';
import Watchlist from './Watchlist';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <div className="App" style={{ border: '10px', background: 'linear-gradient(to bottom, white, black)', position: 'fixed', top: '0', left: 0, right: 0 }}>
      <Header />
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TileView />}/>
        <Route path="/watchlist" element={<Watchlist />}>
        </Route>
      </Routes>
    </BrowserRouter>
      </>
  );  
}

export default App;
