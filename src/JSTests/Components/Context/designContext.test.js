import React from 'react';
import { mount, shallow } from 'enzyme';
import {DesignContextProvider} from '../../../Components/Context/DesignContext';
import renderer from 'react-test-renderer';
// import DesignSettings from "../../../Components/Design/DesignSettings";

test("DesignContextProvider is rendering",()=>{
    const designWrapper=renderer.create(<DesignContextProvider />)
    const tree=designWrapper.toJSON();
    expect(tree).toMatchSnapshot();

})