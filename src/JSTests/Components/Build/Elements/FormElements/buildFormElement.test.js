/**
 * Test Files JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/JSTests
 */

import React, { useCallback, useRef, useState } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import BuildFormElement from '../../../../../Components/Build/Elements/FormElements/BuildFormElement';

import renderer from 'react-test-renderer';
// @codingStandardsIgnoreStart
//Phpcs doesn't support ReactJS and Phpcbf messes the code,so we cant use it.

test('Form elements test', async () => {

    const ele={
        itemType:'simple',
        componentName:'Sample',
        name:'sample'

    }
    const onchange = ()=>{
        return;
    }
    const useDrag = jest.fn(()=>{
        end:jest.fn();
    });

    window.React = React
    const component = renderer.create( <DndProvider backend={HTML5Backend}> <BuildFormElement ele={ele} /> </DndProvider> );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
// @codingStandardsIgnoreEnd