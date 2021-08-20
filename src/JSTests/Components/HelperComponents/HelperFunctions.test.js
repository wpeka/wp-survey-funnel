/**
 * @jest-environment jsdom
 */
 import React, { useCallback, useRef, useState } from "react";
import * as HelperFunctions from "../../../HelperComponents/HelperFunctions";
import renderer from 'react-test-renderer';


test('HelperFunctions convertToRgbaCSS test', async () => {

    const color={
        r: '155',
        g: '155',
        b: '155',
        a: '0.8'
    }

    const component1 = renderer.create( <HelperFunctions.convertToRgbaCSS color={color} /> );
	let tree = component1.toJSON();
	expect(tree).toMatchSnapshot();



});
