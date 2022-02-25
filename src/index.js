/**
 * Index JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/src
 */

import React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Routes from "./Components/Routes";
//Phpcs doesn't support ReactJS and Phpcbf messes the code,so we cant use it.
// @codingStandardsIgnoreStart

function App() {
	return (
		// DnDProvider is drag-n-drop provided from react dnd-library with html5backend, to get drag and drop features on react components.
		<DndProvider backend = {HTML5Backend} >
			<Routes> </Routes>
		</DndProvider >
	);
}

// render react app on div id root.
ReactDOM.render( < App /> , document.getElementById( "root" ) );
// @codingStandardsIgnoreEnd