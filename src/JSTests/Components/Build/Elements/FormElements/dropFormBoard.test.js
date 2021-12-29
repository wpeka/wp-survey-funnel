import React, { useCallback, useRef, useState } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

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

];
test('DropFormBoard elements test', async () => {

    const onchange = () => {
        return;
    }
    const useDrag = jest.fn();

    window.React = React
    const component = renderer.create(<DndProvider backend={HTML5Backend}> <DropFormBoard ele={ele} List={ele.list} editList={ele.editList} deleteFromList={ele.deleteFromList} moveCard={ele.moveCard}/> </DndProvider>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});