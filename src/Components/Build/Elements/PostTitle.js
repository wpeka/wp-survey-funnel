import React, { useContext, useState } from 'react'
import { BuildContext } from '../../Context/BuildContext';
import { ModalContext } from '../../Context/ModalContext';

export default class PostTitle extends React.Component {
	
	static contextType = BuildContext;
	state = {
		title: ''
	};

	componentDidMount() {
		console.log(this.props);
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
				<div className="modalContent">
					<div className="modalContent-left">
						Enter Post Content Name:
						<input type="text" value={this.state.title} onChange={this.handleChange}/>
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
		<button type="button" onClick={saveTitle}>save title</button>
		<button type="button" onClick={closeModal}>close</button>
	</>
}