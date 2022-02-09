/**
 * Test Files JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/JSTests
 */

// @codingStandardsIgnoreStart
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { FormElements } from '../../../../../Components/Build/Elements/FormElements';
import { initColorState } from '../../../../../Data';

let FormElement = FormElements.type;

function ModalContentRight() {
	return <></>
}

function CloseModal() {
	return <></>
}

function saveToList() {

}

describe('if form element component is getting rendered properly', () => {
	it( 'should render form element component', () => {
		const component = shallow( <FormElement designCon={initColorState} currentElement={{
			componentName: 'FormElements',
			title: '',
			button: '',
			description: '',
			currentlySaved: true,
			List: [{"name":"First Name","componentName":"FirstName","itemType":"FORMFIELDS_ELEMENTS","required":true,"placeholder":"","value":"","id":"zdgi541tibkuxylte3_form"}]
		}} ModalContentRight={ModalContentRight} saveToList={saveToList} CloseModal={CloseModal}  /> );

		const form = component.find('input').first();
		const button = component.find('button').first();

		button.props().onClick({ target: {
			name: 'save'
		}});

		expect(component.state('error')).toBe('Please add title before saving.');

		form.props().onChange({ target: {
			name: 'title',
			value: 'myValue'
		}});

		button.props().onClick({ target: {
			name: 'save'
		}});

		expect(component.state('title')).toBe('myValue');
	} )
})
// @codingStandardsIgnoreEnd