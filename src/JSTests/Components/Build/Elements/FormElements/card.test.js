/**
 * Test Files JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/JSTests
 */

import React, { useCallback, useRef, useState } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import {shallow,mount} from 'enzyme';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Card from '../../../../../Components/Build/Elements/FormElements/Card';
import renderer from 'react-test-renderer';
// @codingStandardsIgnoreStart
//Phpcs doesn't support ReactJS and Phpcbf messes the code,so we cant use it.

let test1="";
const ele={
    id:"simple",
    text:"simple",
    index:"dfd",
    item:"sdf",
    moveCard:"dfd",
    editList:(item)=>{test1=item},
    deleteFromList:(item)=>{test1=""},
}
test('Card test', async () => {

    const onchange = ()=>{
        return;
    }
    const useDrag = jest.fn(()=>{
        hover:jest.fn()
    });


    window.React = React
    const component = renderer.create( <DndProvider backend={HTML5Backend}> <Card id={ele.id} text={ele.text} index={ele.index} item={ele} moveCard={ele.moveCard} editList={ele.editList} deleteFromList={ele.deleteFromList} /> </DndProvider> );
    let tree = component.toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();
});

test("editCard function should execute",async ()=>{
    const component=mount( <DndProvider backend={HTML5Backend}> <Card id={ele.id} text={ele.text} index={ele.index} item={ele} moveCard={ele.moveCard} editList={ele.editList} deleteFromList={ele.deleteFromList} /> </DndProvider> );
    const btns=component.find('button');
    expect(btns.length).toBe(2);
    btns.first().simulate('click');
    expect(test1).toEqual(ele);
    btns.at(1).simulate('click');
    expect(test1).toEqual("");
    const div=component.find('.cardBox');
    div.simulate('mouseEnter');
})
// @codingStandardsIgnoreEnd