/**
 * CloseModalPopUp JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/HelperComponents
 */

import { ModalContext } from '../Components/Context/ModalContext';
import { useContext } from "react";
import React from "react";
// @codingStandardsIgnoreStart
//Phpcs doesn't support ReactJS and Phpcbf messes the code,so we cant use it.

export function CloseModal(props) {
	let { setCurrentElement, setShowModal } = useContext( ModalContext );
	const closeModalFunction                = () => {
		setCurrentElement( false );
		setShowModal( false );
	}
	return (
		<>
			<button className              = {props ?.buttonClass ? props.buttonClass : ''} onClick = {closeModalFunction} > {props ?.closeText ? props.closeText : 'X'} </button>
		</>
	)
}
// @codingStandardsIgnoreEnd
