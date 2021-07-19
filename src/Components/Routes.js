import React from 'react'
import {
	HashRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import { BuildContextProvider } from './Context/BuildContext';
import { useContext } from 'react';

export default function Routes() {
	return (
		<Router>
			<div>
				<ul>
					<li><Link to="/build">Build</Link></li>
					<li><Link to="/design">design</Link></li>
					<li><Link to="/configure">configure</Link></li>
					<li><Link to="/share">share</Link></li>
					<li><Link to="/reports">reports</Link></li>
				</ul>
			</div>
			<BuildContextProvider>
				<Switch>
					<Route path="/build">
						<div className="build">build</div>
					</Route>
					<Route path="/design">
						<div className="design">design</div>
					</Route>
					<Route path="/configure">
						<div className="configure">configure</div>
					</Route>
					<Route path="/share">
						<div className="share">share</div>
					</Route>
					<Route path="/reports">
						<div className="reports">reports</div>
					</Route>
				</Switch>
			</BuildContextProvider>
		</Router>
	)
}
