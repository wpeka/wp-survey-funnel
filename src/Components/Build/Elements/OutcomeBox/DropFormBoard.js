import { useDrop } from "react-dnd";
import React, { useContext } from "react";
import ShowFormBoard from './ShowFormBoard';
import { BuildContext } from "../../../Context/BuildContext";

let backgroundColor = "#bebebe";

const DropFromBoard = ({ ele, editList, deleteFromList, moveCard }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'Outcome',
        drop: () => ({ name: "DropBoard" }),    
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    
    return (
        <div
            ref={drop}
            role={"DropBoard"}
            style={{ backgroundColor }}
            className="surveyfunnel-lite-dropboard"
        >
            {isActive ? "Release to drop" : "Drag a box here"}
            <h2>{ele.title}</h2>
            {/* <ShowFormBoard moveCard={moveCard} editList={editList} deleteFromList={deleteFromList} List={List['RESULT_ELEMENTS']}></ShowFormBoard> */}
        </div>
    );
};

export default DropFromBoard;
