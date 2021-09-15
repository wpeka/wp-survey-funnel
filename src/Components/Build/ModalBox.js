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
import { FormElements } from "./Elements/FormElements";
import { ResultScreen } from "./Elements/ResultScreenElements";
import { CoverPage } from "./Elements/StartScreenElements";
import PostTitle from "./Elements/PostTitle";
import { DesignContext } from "../Context/DesignContext";

export default function ModalBox() {
    const { showModal, currentElement } = useContext(ModalContext);
	const { type, List } = useContext(BuildContext);
    const designCon = useContext( DesignContext );
    const childRef = React.createRef();

    const getComponentRender = function () {
        let componentProps = {
            currentElement,
            ref: childRef,
            saveToList,
            designCon,
			type,
			List
        }
        switch (currentElement.componentName) {
            case "CoverPage":
                return <CoverPage {...componentProps} />;
            case "SingleChoice":
            case "MultiChoice":
                return <Choices {...componentProps} />
            case "ResultScreen":
                return <ResultScreen {...componentProps} />
            case "FormElements":
                return <FormElements {...componentProps} />
            case 'postTitle':
                return <PostTitle {...componentProps} />
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
