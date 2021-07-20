import React, {
    Component,
    Fragment,
    useContext,
    useEffect,
    useState,
} from "react";
import { BuildContext } from "../Context/BuildContext";
import { ModalContext } from "../Context/ModalContext";
import { CoverPage } from "./Elements/StartScreenElements";

export default function ModalBox() {
    const [inputValues, setInputValues] = useState({
        title: "",
        description: "",
    });
    const { showModal, currentElement } = useContext(ModalContext);
    const childRef = React.createRef();

    const getComponentRender = function () {
        switch (currentElement.componentName) {
            case "CoverPage":
                return <CoverPage currentElement={currentElement} ref={childRef} />;
            default:
                return "";
        }
    };
    useEffect(() => {
        if (
            "currentlySaved" in currentElement &&
            currentElement.currentlySaved
        ) {
            let tempObject = {
                title: currentElement.title,
                description: currentElement.description,
            };
            setInputValues({
                ...tempObject,
            });
        }
    }, [currentElement]);

    const { generateId, editList, addToList } = useContext(BuildContext);
    const { setCurrentElement, setShowModal } = useContext(ModalContext);

    const saveToList = () => {
        if (currentElement?.currentlySaved && currentElement.currentlySaved) {
            
            const data = {
                ...currentElement,
                ...inputValues,
                ...childRef.current.state,
            };
            editList(data);
        } else {
            const data = {
                ...inputValues,
                ...childRef.current.state,
                id: generateId(),
                componentName: currentElement.componentName,
                type: currentElement.itemType,
                currentlySaved: true,
                inputs: [...currentElement.inputs],
            };
            addToList(data);
        }

        setCurrentElement({});
        setShowModal(false);
    };

    const handleChange = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Fragment>
            <div className="modalOverlay">
                <div className="modalContent">
                    <div className="modalContent-left">
                        <div className="modalComponentTitle">
                            <label>Title</label>
                            <input
                                type="text"
                                placeholder="Set Title"
                                name="title"
                                value={inputValues.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="modalComponentDescription">
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="Set Description"
                                name="description"
                                value={inputValues.description}
                                onChange={handleChange}
                            />
                        </div>
                        {getComponentRender()}
                        <button type="button" onClick={saveToList}>
                            Save
                        </button>
                    </div>
                    <div className="modalContent-right"></div>
                </div>
            </div>
        </Fragment>
    );
}
