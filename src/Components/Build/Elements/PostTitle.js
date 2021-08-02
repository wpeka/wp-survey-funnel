import React, { useContext, useState } from 'react'
import { BuildContext } from '../../Context/BuildContext';
import { ModalContext } from '../../Context/ModalContext';
import { CloseModal } from '../../../HelperComponents/CloseModalPopUp';
export default class PostTitle extends React.Component {
	
	static contextType = BuildContext;
	state = {
		title: ''
	};
	
	componentDidMount() {
		this.setState({
			title: this.props.currentElement.title,
		});
	}

	handleChange = (event) => {
		this.setState({
			title: event.target.value,
		})
	}

	render() {
		return (
			<div className="modalOverlay">
				<div className="modalComponentEdit">
					<div className="modalComponentNav">
						<h3>Name your Content</h3>
						<CloseModal/>
					</div>
					<div className="modalComponentEditFields">
						<h3>Title</h3>
						<input type="text" value={this.state.title} onChange={this.handleChange}/>
					</div>
					<div className="modalComponentEditButtons">
						<Buttons title={this.state.title} />
					</div>
				</div>

			</div>

		)
	}
}

function Buttons({title}) {

	const { setCurrentElement, setShowModal } = useContext(ModalContext);
	const { handleChangeTitle } = useContext( BuildContext );
	const saveTitle = () => {
		handleChangeTitle(title);
		closeModal();
	}
	const closeModal = () => {
		setCurrentElement(null);
		setShowModal(false);
	}
	return <>
		<button type="button" onClick={saveTitle}>Save</button>
		<button type="button" onClick={closeModal}>Close</button>
	</>
}