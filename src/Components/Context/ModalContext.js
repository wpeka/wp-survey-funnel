import { createContext, Component } from "react";
import { useState } from "react";

export function ModalContextProvider( props ) {

	const [ showModal, setShowModal ] = useState(false);	
	const [ currentElement, setCurrentElement ] = useState( {} );
	const getShowModal = () => {
		return showModal;
	}
	const value = {
		showModal, setShowModal, currentElement, setCurrentElement, getShowModal
	}
	return(
		<ModalContext.Provider
			value={value}
		>
			{props.children}
		</ModalContext.Provider>
	);
}

export const ModalContext = createContext();