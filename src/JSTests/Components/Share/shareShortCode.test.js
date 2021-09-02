/**
 * @jest-environment jsdom
 */

import ShareShortCode from '../../../Components/Share/ShareShortCode';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import React from 'react';

test('ShareShortCodeComponent Snapshot', () => {

	const component = renderer.create( <ShareShortCode /> );
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('CopyShortcode test', () => {

	const wrapper = mount(<ShareShortCode />);
	expect(wrapper.find('#contentShortcode').getDOMNode().value).toEqual('[surveyfunnel_lite_survey id="null" type="responsive"]');
	
	wrapper.find('#fullpage').simulate('change');
	expect(wrapper.find('#contentShortcode').getDOMNode().value).toEqual('[surveyfunnel_lite_survey id="null" type="fullpage"]');
})