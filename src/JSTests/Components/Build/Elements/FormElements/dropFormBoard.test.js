/**
 * Test Files JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/JSTests
 */

import React, { useCallback, useRef, useState } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
// @codingStandardsIgnoreStart

import DropFormBoard from '../../../../../Components/Build/Elements/FormElements/DropFormBoard';

import renderer from 'react-test-renderer';

const ele = {
    id: "simple",
    text: "simple",
    index: "dfd",
    item: "sdf",
    moveCard: "dfd",
    editList: (item) => { test1 = item },
    deleteFromList: (item) => { test1 = "" },
    itemType: 'simple',
    componentName: 'Sample',
    name: 'sample',
}
const ele2 = {
    id: "2simple",
    text: "simple",
    index: "dfd",
    item: "sdf",
    moveCard: "dfd",
    editList: (item) => { test1 = item },
    deleteFromList: (item) => { test1 = "" },
    itemType: 'simple',
    componentName: 'Sample',
    name: 'sample',
}
const list=[
    {
        id: "simple",
        text: "simple",
        index: "dfd",
        item: "sdf",
        moveCard: "dfd",
        editList: (item) => { test1 = item },
        deleteFromList: (item) => { test1 = "" },
        itemType: 'simple',
        componentName: 'Sample',
        name: 'sample',
    }
];
test('DropFormBoard elements test', async () => {

    const onchange = () => {
        return;
    }
    const useDrag = jest.fn();

    window.React = React
    const component = renderer.create(<DndProvider backend={HTML5Backend}> <DropFormBoard ele={ele} List={list} editList={ele.editList} deleteFromList={ele.deleteFromList} moveCard={ele.moveCard}/> </DndProvider>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
// @codingStandardsIgnoreEnd
