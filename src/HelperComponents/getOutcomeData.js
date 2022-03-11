import React,{useContext} from 'react';
import {BuildContext} from '../Components/Context/BuildContext'

function getOutcomeData(props) {
    const {outComeData}=useContext(BuildContext);
    return outComeData;
}

export default getOutcomeData;