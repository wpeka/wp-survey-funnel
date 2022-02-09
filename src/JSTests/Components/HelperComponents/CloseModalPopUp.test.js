/**
 * Test Files JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/JSTests
 */

import React, { createContext } from "react";
import { mount, shallow } from 'enzyme';
import { CloseModal } from "../../../HelperComponents/CloseModalPopUp";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ModalContextProvider } from "../../../Components/Context/ModalContext";

// @codingStandardsIgnoreStart
test(
	"closeModalPopUp",
	() => {
		// const setCurrentElement=jest.fn();
		const component = mount( <ModalContextProvider> <CloseModal /> </ ModalContextProvider> );
		const btn           = component.find( 'button' );
		btn.simulate( 'click' );
		const wrapper = renderer.create( <ModalContextProvider> <CloseModal /> </ ModalContextProvider> );
		let tree      = wrapper.toJSON();
		expect( tree ).toMatchSnapshot();
	}
)
// @codingStandardsIgnoreEnd
