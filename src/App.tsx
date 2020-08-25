import React from 'react';
import { Route, } from "react-router-dom";
import './App.css';
import { Dispenser } from './pages/Dispenser';
import { Maintenace } from './pages/Maintenance';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route path="/">
          <Dispenser />
        </Route>
        <Route path="/maint">
          <Maintenace />
        </Route>
      </header>
    </div>
  );
}

export default App;
