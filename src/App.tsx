import React from 'react';
import { Route, } from "react-router-dom";
import './App.css';
import { Dispenser } from './pages/Dispenser';
import { Maintenance } from './pages/Maintenance';

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route path="/">
          <Dispenser />
          <Maintenance />
        </Route>
        <Route path="/maint">

        </Route>
      </header>
      <ToastContainer/>
    </div>
  );
}

export default App;
