import React, {
    Component,
    Fragment,
    useContext,
    useEffect,
    useState,
} from "react";
import { BuildContext } from "../Context/BuildContext";
import { ModalContext } from "../Context/ModalContext";
import { Choices, Answer } from "./Elements/ContentElements";
import { FormElements } from "./Elements/FormElements";
import { ResultScreen } from "./Elements/ResultScreenElements";
import { CoverPage } from "./Elements/StartScreenElements";
import PostTitle from "./Elements/PostTitle";
import { DesignContext } from "../Context/DesignContext";
import ModalContentRight from "../../HelperComponents/ModalContentRight";
import { CloseModal } from "../../HelperComponents/CloseModalPopUp";
import { convertToRgbaCSS } from "../../HelperComponents/HelperFunctions";

const { applyFilters } = wp.hooks;

export default function ModalBox() {
    const { showModal, currentElement } = useContext(ModalContext);
	const { type, List } = useContext(BuildContext);
    const designCon = useContext( DesignContext );
    const childRef = React.createRef();

	// this function decides which component to be rendered on the builder page of modal box depending upon current element set.
    const getComponentRender = function () {
        let componentProps = {
            currentElement,
            ref: childRef,
            saveToList,
            designCon,
			type,
			List,
			convertToRgbaCSS,
            editList,
            setCurrentElement,
            setShowModal
        }
        if(currentElement === null) {
            return;
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
            case 'ShortAnswer':
            case 'LongAnswer':
                return <Answer {...componentProps} />
            default:
                return applyFilters( 'getComponentRender', "", componentProps, currentElement.componentName, ModalContentRight, CloseModal );
        }
    };

    const { generateId, editList, addToList } = useContext(BuildContext);
    const { setCurrentElement, setShowModal } = useContext(ModalContext);

	// when save button is being clicked of modal context.
    const saveToList = () => {
		// get the child state.
        let childState = {};
        if ( childRef.current !== null ) {
            childState = childRef.current.state;
        }
		// if this element was previously added and user is trying to change the values. call editList from BuildContext.
        if (currentElement?.currentlySaved && currentElement.currentlySaved) {
            const data = {
                ...currentElement,
                ...childState,
            };
            editList(data);
        } else {
			// if the question is added for the first time.
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
