import React from "react";
import { mount, shallow } from 'enzyme';
import {CloseModal} from "../../../HelperComponents/CloseModalPopUp";
import renderer from 'react-test-renderer';
test("closeModalPopUp",()=>{
const component = renderer.create( <CloseModal />)
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})