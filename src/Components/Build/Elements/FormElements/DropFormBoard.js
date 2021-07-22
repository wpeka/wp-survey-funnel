import { useDrop } from "react-dnd";
import React, { useContext } from "react";
import ShowFormBoard from './ShowFormBoard';

const style = {
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
    width: "100%",
};

const DropFromBoard = ({ ele, List }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ele.itemType,
        drop: () => ({ name: "DropBoard" }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = "#F4EAFC";
    if (isActive) {
        backgroundColor = "#E4F3F4";
    } else if (canDrop) {
        backgroundColor = "#E3EDFA";
    }
    
    return (
        <div
            ref={drop}
            role={"DropBoard"}
            style={{ ...style, backgroundColor }}
        >
            {isActive ? "Release to drop" : "Drag a box here"}
            <p>{ele.name}</p>
            <ShowFormBoard List={List}></ShowFormBoard>
        </div>
    );
};

export default DropFromBoard;
