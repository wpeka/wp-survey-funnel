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
import { shallow,mount} from 'enzyme';
import { Answer,Choices } from "../../../../Components/Build/Elements/ContentElements";
import {render} from '@testing-library/react'
import renderer from 'react-test-renderer';
function ModalContentRight() {
	return <></>
}

function CloseModal() {
	return <></>
}

function saveToList() {
}

describe( 'Answer component should get rendered', () => {
	it('should render the short answer component', () => {
		const component = shallow(<Answer designCon={{
			answerBorderColor: {
				r: 0,
				g: 0,
				b: 0,
				a: 1,
			}
		}} currentElement={{
			componentName: 'ShortAnswer',
			currentlySaved: true,
			title: '',
			button: '',
			description: '',
			mandatory: false
		}} 
		ModalContentRight={ModalContentRight} 
		saveToList={saveToList} 
		CloseModal={CloseModal}  />)

		const form = component.find('input').first();
		const button = component.find('button');
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
		expect( component.exists( '.shortAnswer-input' ) ).toEqual(true);
	} )

	it('should render the long answer component', () => {

		const component = shallow(<Answer designCon={{
			answerBorderColor: {
				r: 0,
				g: 0,
				b: 0,
				a: 1,
			}
		}} currentElement={{
			componentName: 'LongAnswer',
			currentlySaved: true,
			title: '',
			button: '',
			description: '',
			mandatory: false
		}} ModalContentRight={ModalContentRight} saveToList={saveToList} CloseModal={CloseModal}  />)

		const form = component.find('input').first();
		const button = component.find('button');
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
		expect( component.exists( '.longAnswer-input' ) ).toEqual(true);
	} )
} )
describe('Choices',()=>{
	it('should render',()=>{
		const choiceComponent=shallow(<Choices designCon={{
			answerBorderColor: {
				r: 0,
				g: 0,
				b: 0,
				a: 1,
			}
		}} currentElement={{
			componentName: 'ShortAnswer',
			currentlySaved: true,
			title: '',
			button: '',
			description: '',
			mandatory: false
		}} 
		ModalContentRight={ModalContentRight} 
		saveToList={saveToList} 
		CloseModal={CloseModal}
		setCurrentElement={()=>{}}  />);
		
	})
})
// @codingStandardsIgnoreEnd