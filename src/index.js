import React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Routes from "./Components/Routes";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Routes></Routes>
        </DndProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
