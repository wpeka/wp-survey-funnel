/**
 * @jest-environment jsdom
 */

import ShareShortCode from '../../../Components/Share/ShareShortCode';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
document.execCommand = jest.fn()
test('ShareShortCodeComponent Snapshot', () => {

	const component = renderer.create( <ShareShortCode /> );
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('CopyShortcode test', () => {
	//Error: document.execCommand is not a function
	const wrapper = mount(<ShareShortCode />);
	const copyShortCodeBTN=wrapper.find('button').first()
	copyShortCodeBTN.simulate('click');
	expect(wrapper.find('#contentShortcode').getDOMNode().value).toEqual('[surveyfunnel_lite_survey id="null" type="responsive"]');
	wrapper.find('#fullpage').simulate('change');
	expect(wrapper.find('#contentShortcode').getDOMNode().value).toEqual('[surveyfunnel_lite_survey id="null" type="fullpage"]');
})

// it('tests handleCustomChange',()=>{
// 	const stateSetter = jest.fn()
// jest
// .spyOn(React, 'useState').mockImplementation(checked => [checked='custom', stateSetter])
// const wrapper = mount(<ShareShortCode />);
// expect(wrapper.find('select').length).toBe(2);

// // const { result } = renderHook(()=>
// 	// ShareShortCode());
//     // console.log(result.current);
// 	// expect(result.current.checked).toEqual('responsive');
// })