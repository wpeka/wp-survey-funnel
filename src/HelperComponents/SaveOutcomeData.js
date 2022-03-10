import React, { useContext } from 'react';
import {BuildContext} from '../Components/Context/BuildContext';
function SaveOutcomeData({getList}) {
    const {saveDataOutcome}=useContext(BuildContext);
    const saveData=()=>{
    const List=getList();
    // console.log(List);
    saveDataOutcome(List);
    };
    // const {SaveDataOutcome}=useContext(BuildContext);
    return (
        <div className="surveyfunnel-lite-form-submit-button">
            <button onClick={saveData}>Save Data</button>
        </div>
    );
}

export default SaveOutcomeData;