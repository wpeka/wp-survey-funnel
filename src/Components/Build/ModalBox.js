import React, {
    Component,
    Fragment,
    useContext,
    useEffect,
    useState,
} from "react";
import { BuildContext } from "../Context/BuildContext";
import { ModalContext } from "../Context/ModalContext";
import { Choices } from "./Elements/ContentElements";
import { ResultScreen } from "./Elements/ResultScreenElements";
import { CoverPage } from "./Elements/StartScreenElements";

export default function ModalBox() {
    const { showModal, currentElement } = useContext(ModalContext);
    const childRef = React.createRef();

    const getComponentRender = function () {
        switch (currentElement.componentName) {
            case "CoverPage":
                return <CoverPage currentElement={currentElement} ref={childRef} saveToList={saveToList} />;
            case "SingleChoice":
            case "MultiChoice":
                return <Choices currentElement={currentElement} ref={childRef} saveToList={saveToList} />
            case "ResultScreen":
                return <ResultScreen currentElement={currentElement} ref={childRef} saveToList={saveToList} />
            default:
                return "";
        }
    };

    const { generateId, editList, addToList } = useContext(BuildContext);
    const { setCurrentElement, setShowModal } = useContext(ModalContext);

    const saveToList = () => {
        let childState = {};
        if ( childRef.current !== null ) {
            childState = childRef.current.state;
        }
        if (currentElement?.currentlySaved && currentElement.currentlySaved) {
            const data = {
                ...currentElement,
                ...childState,
            };
            editList(data);
        } else {
            const data = {
                ...childState,
                id: generateId(),
                componentName: currentElement.componentName,
                type: currentElement.itemType,
                currentlySaved: true,
            };
            addToList(data);
        }

        setCurrentElement({});
        setShowModal(false);
    };
    return (
        <Fragment>
            {getComponentRender()}
        </Fragment>
    );
}
