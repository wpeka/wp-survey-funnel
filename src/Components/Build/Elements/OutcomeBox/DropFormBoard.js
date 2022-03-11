import { useDrop } from "react-dnd";
import React, { useContext } from "react";
import ShowFormBoard from './ShowFormBoard';
import { BuildContext } from "../../../Context/BuildContext";

let backgroundColor = "#ffffff";

const DropFormBoard = ({ ele, editList, deleteFromList, moveCard,getList,addToList }) => {
    // const {List}=useContext(BuildContext);
    const [{ canDrop, isOver,getItem,getDropResult,didDrop }, drop] = useDrop(() => ({
        accept: 'Outcome',
        drop: (item,monitor) => afterDrop(item,monitor),    
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            getItem:monitor.getItem(),
            didDrop:monitor.didDrop(),
            getDropResult:monitor.getDropResult(),
        }),
    }));
    const afterDrop=(item,monitor)=>{
        const title=ele.title;
        addToList(item,title);
        console.log('afterDrop');

    }
    const isActive = canDrop && isOver;
    // if(getDropResult){
    //     let title=ele.title;
    //     console.log('i am dropped '+ele.title);
    //     console.log(getItem);
    // }
    
    return (
        <div
            ref={drop}
            role={"DropBoard"}
            style={{ backgroundColor }}
            className="outcome-dropboard"
        >
            <h2>{ele.title}</h2>
            <p>Connected Answers:</p>
            <ShowFormBoard ele={ele} getList={getList} moveCard={moveCard} editList={editList} deleteFromList={deleteFromList}></ShowFormBoard>
        </div>
    );
};

export default DropFormBoard;
