/**
 * Test Files JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/JSTests
 */

import DesignSettings from "../../../Components/Design/DesignSettings";
import { DesignContextProvider } from "../../../Components/Context/DesignContext";
import React from 'react';
import { mount } from "enzyme";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
// @codingStandardsIgnoreStart

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    fetch.resetMocks();
    container = document.createElement("div");
    let url = "https://one.wordpress.test";
    container.innerHTML = `
		<input type="hidden" id="ajaxURL" value="http://one.wordpress.test/" />
		<input type="hidden" id="ajaxSecurity" value="ajaxSecurity" />
	`;
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Design Context and Design Settings component render', () => {
	it( 'Should render Design settings component', async () => {
		fetch.mockResponseOnce(JSON.stringify({ data: {
			design: JSON.stringify({"opacity":0,"fontFamily":"Open Sans","fontFamilyValue":"Open+Sans","backgroundColor":{"r":"255","g":"255","b":"255","a":"1"},"buttonColor":{"r":194,"g":209,"b":225,"a":1},"buttonTextColor":{"r":"255","g":"255","b":"255","a":"1"},"answersHighlightBoxColor":{"r":"232","g":"238","b":"244","a":"1"},"answerBorderColor":{"r":"180","g":"220","b":"255","a":"1"},"backgroundContainerColor":{"r":"255","g":"255","b":"255","a":"1"},"fontColor":{"r":"0","g":"0","b":"0","a":"1"}}),
			backgroundImage: 'http://one.wordpress.test/wp-content/uploads/2021/09/m-SPbcqTVoYqE-unsplash-300x200.jpg',
		} }));
		
		await act( async () => {
			const component = mount( <DesignContextProvider>
				<DesignSettings />
			</DesignContextProvider> )

			expect(component.exists('.selectedBackgroundImage')).toBeFalsy();
			
		})
	} )
})
// @codingStandardsIgnoreEnd