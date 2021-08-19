/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Configure from '../../../Components/Configure';

test('Configure Component test', () => {

	document.body.innerHTML = `
		<input type="hidden" id="ajaxURL" value="ajaxUrl" />
		<input type="hidden" id="ajaxSecurity" value="ajaxSecurity" />
	`;

	const component = renderer.create( <Configure /> );
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});