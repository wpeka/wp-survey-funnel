import React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Routes from "./Components/Routes";

function App() {
    return (
		// DnDProvider is drag-n-drop provided from react dnd-library with html5backend, to get drag and drop features on react components. 
        <DndProvider backend={HTML5Backend}>
            <Routes></Routes>
        </DndProvider>
    );
}

// render react app on div id root.
ReactDOM.render(<App />, document.getElementById("root"));
