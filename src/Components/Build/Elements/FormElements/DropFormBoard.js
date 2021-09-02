import { useDrop } from "react-dnd";
import React, { useContext } from "react";
import ShowFormBoard from './ShowFormBoard';

let backgroundColor = "#F4EAFC";

const DropFromBoard = ({ ele, List, editList, deleteFromList, moveCard }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ele.itemType,
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
            <h2>{ele.name}</h2>
            <ShowFormBoard moveCard={moveCard} editList={editList} deleteFromList={deleteFromList} List={List}></ShowFormBoard>
        </div>
    );
};

export default DropFromBoard;
