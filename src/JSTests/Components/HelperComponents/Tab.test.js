/**
 * @jest-environment jsdom
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import renderer from 'react-test-renderer';
import Tab from "../../../HelperComponents/Tab";

test('HelperComponents Tab test', () => {

    const onClick= function(){
        return;
    };
    const label= "test tab";
    const activeTab= "none"
    const component1 = renderer.create( <Tab onClick={onClick} label={label} activeTab={activeTab} /> );
	let tree = component1.toJSON();
	expect(tree).toMatchSnapshot();

});