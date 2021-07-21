import { useDrop } from "react-dnd";
import React, { useContext } from "react";
import { BuildContext } from "../Context/BuildContext";
import ShowBoard from "./ShowBoard";
import Card from "./Card";

const style = {
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
    width: "100%",
};

const DropBoard = ({ ele }) => {
    const { List } = useContext(BuildContext);
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
            <ShowBoard itemType={ele.itemType}></ShowBoard>
        </div>
    );
};

export default DropBoard;
