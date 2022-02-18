import { useDrop } from "react-dnd";
import React, { useContext } from "react";
import ShowFormBoard from './ShowFormBoard';
import DropFormBoard from "./DropFormBoard";
import { formElements, formElementsDropBoard } from "../../../../Data";

import { BuildContext } from "../../../Context/BuildContext";

let backgroundColor = "#F4EAFC";

const DropFromBoard = ({ ele, editList, deleteFromList, moveCard }) => {
    const { List } = useContext(BuildContext);
    console.log("I am Creater JS");

    return (
        <>
        {List['RESULT_ELEMENTS'].map(function (
            ele,
            i
        ) {
            return (
                <DropFormBoard
                    editList={editList}
                    deleteFromList={
                        deleteFromList
                    }
                    moveCard={moveCard}
                    ele={ele}
                    key={i}
                ></DropFormBoard>
            );
        },
            this)}
            </>
    );
};

export default DropFromBoard;
