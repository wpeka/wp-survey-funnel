import { ModalContext } from '../Components/Context/ModalContext';
import { useContext } from "react";
export function CloseModal() {
	let { setCurrentElement, setShowModal } = useContext(ModalContext);
	const closeModalFunction = () => {
		setCurrentElement(false);
		setShowModal(false);
	}
	return (
		<>
			<button onClick={closeModalFunction}>✕</button>
		</>
	)
}