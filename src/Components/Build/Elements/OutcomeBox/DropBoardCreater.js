import { useDrop } from "react-dnd";
import React, { useContext,useEffect } from "react";
import ShowFormBoard from './ShowFormBoard';
import DropFormBoard from "./DropFormBoard";
import { formElements, formElementsDropBoard } from "../../../../Data";

import { BuildContext } from "../../../Context/BuildContext";

let backgroundColor = "#F4EAFC";

const DropBoardCreater = ({ ele, editList, deleteFromList, moveCard ,createNewList,getList,addToList}) => {
    const { List } = useContext(BuildContext);
    const newList=[];
    useEffect(() => {
        // console.log(newList);
        // createNewList(newList);
      });
    return (
        <>
        {List['RESULT_ELEMENTS'].map(function (
            ele,
            i
        ) {
            // newList[ele.title]="";
            return (
                <DropFormBoard
                    editList={editList}
                    deleteFromList={
                        deleteFromList
                    }
                    addToList={addToList}
                    moveCard={moveCard}
                    ele={ele}
                    key={i}
                    getList={getList}
                ></DropFormBoard>
            );
        },this)}
            </>
    );
};

export default DropBoardCreater;
