import React, { Fragment, useContext, useState, useEffect } from "react";
import { BuildContext } from "../../Context/BuildContext";
import { ModalContext } from "../../Context/ModalContext";

export function CoverPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");

    const handleChange = (event) => {
        switch (event.target.name) {
            case "title":
                setTitle(event.target.value);
                break;

            case "description":
                setDescription(event.target.value);
                break;

            case "buttonLabel":
                setButtonLabel(event.target.value);
                break;
        }
    };
	const { addToList, generateId, editList } = useContext( BuildContext );
	const { setCurrentElement, setShowModal, currentElement } = useContext( ModalContext );

    useEffect(() => {
        if ( currentElement?.componentName ) {
            setTitle(currentElement.title);
            setDescription(currentElement.description);
            setButtonLabel(currentElement.buttonLabel);
        }
    }, []);

    const saveToList = () => {
        if ( currentElement?.currentlySaved && currentElement.currentlySaved ) {
        	const data = {
        		...currentElement,
                title: title,
                description: description,
                buttonLabel: buttonLabel,
        	};
        	editList(data);
        }
        else {
            const data = {
                title,
                description,
                buttonLabel,
                id: generateId(),
                componentName: "CoverPage",
                type: "startScreen",
                currentlySaved: true,
            };
            addToList(data);
        }

		setCurrentElement(null);
		setShowModal(false);
    };

    return (
        <Fragment>
            <div className="modalContent-left">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Set Title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Set Description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                    <label>Button</label>
                    <input
                        type="text"
                        placeholder="Button Label"
                        name="buttonLabel"
                        value={buttonLabel}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={saveToList}>
                    Save
                </button>
            </div>
            <div className="modalContent-right"></div>
        </Fragment>
    );
}
