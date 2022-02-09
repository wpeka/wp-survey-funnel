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
import React, { Component } from "react";
import PropTypes from "prop-types";
import renderer from 'react-test-renderer';
import Tab from "../../../HelperComponents/Tab";

test(
	'HelperComponents Tab test',
	() => {
		const onClick        = function(){
			return;
		};
		const label          = "test tab";
		const activeTab      = "none"
		const component1 = renderer.create( < Tab onClick = {onClick} label = {label} activeTab = {activeTab} /> );
		let tree             = component1.toJSON();
		component1.root.findByType( 'li' ).props.onClick();
		expect( tree ).toMatchSnapshot();
	}
);
// @codingStandardsIgnoreEnd