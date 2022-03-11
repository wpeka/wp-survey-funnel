import React, { useContext } from 'react';
import {BuildContext} from '../Components/Context/BuildContext';
function SaveOutcomeData({getList}) {
    const {saveDataOutcome}=useContext(BuildContext);
    const saveData=()=>{
    const List=getList();
    saveDataOutcome(List);
    };
    return (
        <div className="modalComponentSaveButton">
            <button onClick={saveData}>Save Data</button>
        </div>
    );
}

export default SaveOutcomeData;