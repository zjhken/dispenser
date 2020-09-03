import React from 'react';
import {BrowserRouter, Route,} from "react-router-dom";
import './App.css';
import {Dispenser} from './pages/Dispenser';
import {Maintenance} from './pages/Maintenance';

import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {GlobalProvider} from "./context/GlobalContext";

function App() {
	return (
			<BrowserRouter>
				<GlobalProvider>
					<div className="App">
						<header className="App-header">
							<Route path="/">
								<Dispenser/>
								<Maintenance/>
							</Route>
							<Route path="/maint">

							</Route>
						</header>
						<ToastContainer/>
					</div>
				</GlobalProvider>
			</BrowserRouter>
	);
}

export default App;
