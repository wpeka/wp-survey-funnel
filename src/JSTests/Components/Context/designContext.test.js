import React from 'react';
import { mount, shallow } from 'enzyme';
import {DesignContextProvider} from '../../../Components/Context/DesignContext';
// import DesignSettings from "../../../Components/Design/DesignSettings";

test("DesignContextProvider is rendering",()=>{
    const designWrapper=shallow(<DesignContextProvider />)
})