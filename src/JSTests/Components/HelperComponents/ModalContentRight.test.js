/**
 * @jest-environment jsdom
 */
import React from "react";
import { convertToRgbaCSS, designBackground } from "../../../HelperComponents/HelperFunctions";
import { useEffect } from "react";
import ModalContentRight from "../../../HelperComponents/ModalContentRight";
import renderer from 'react-test-renderer';


test('HelperFunctions convertToRgbaCSS test', () => {

    const designCon={
            fontFamilyValue:'200',
            fontColor:'blue',
            backgroundStyle:'none',
            fontFamily:'sans',
            backgroundContainerColor:'red',
            selectedImageUrl:'none'
        }
        
    const currentElement= 'content-element'


    const component1 = renderer.create( <ModalContentRight designCon={designCon} currentElement={currentElement} /> );
	let tree = component1.toJSON();
	expect(tree).toMatchSnapshot();

});