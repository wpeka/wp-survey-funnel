import React from 'react';
import { shallow } from 'enzyme';
import { fireEvent, render } from '@testing-library/react';
import { BuildFormElement } from '../../../../../Components/Build/Elements/FormElements/BuildFormElement';

const component = render(<BuildFormElement />);

function dragAndDrop(knight: Element) {
    fireEvent.dragStart(knight)
    fireEvent.dragEnter(cell)
  }
  dragAndDrop(
    component.getByText('drag me'),
 );

 describe("BuildFormElement",()=>{
     
 })


