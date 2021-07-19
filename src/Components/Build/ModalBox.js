import React, { Component, Fragment, useContext } from "react";
import { ModalContext } from "../Context/ModalContext";

export default function ModalBox() {
    //static contextType = ListContext;

    // state = {
    // 	title: '',
    // 	description: '',
    // 	buttonLabel: '',
    // 	componentName: '',
    // }

    // componentDidMount() {
    // 	if ( this.props?.currentlySaved ) {
    // 		this.setState({
    // 			...this.props.item
    // 		});
    // 	}
    // }

    // handleChange = event => {
    // 	this.setState({
    // 		[event.target.name]: event.target.value,
    // 	})
    // }

    // saveToList = () => {
    // 	if ( this.props?.newlyCreated ) {
    // 		const { addToList, generateId } = this.context;
    // 		const { setShowModalBox, componentName } = this.props;
    // 		const data = {...this.state, id: generateId(), componentName: componentName};
    // 		addToList(data);
    // 		setShowModalBox(false);
    // 	}
    // 	else if ( this.props?.currentlySaved ) {
    // 		const data = {
    // 			...this.state
    // 		};

    // 		const { editList } = this.context;
    // 		editList(data);
    // 		const { removeModal } = this.props;

    // 		removeModal();
    // 	}
    // }

	const { showModal, currentElement } = useContext( ModalContext );

    return (

        <Fragment>
			{showModal && <div className="modalContent">
                <div className="modalContent-left">
                    <hr />
                    <button type="button" >Save</button>
                </div>
                <div className="modalContent-right"></div>
            </div> }
        </Fragment>
    );
}
