import React, { Component, Fragment, useContext, useEffect } from "react";
import { ModalContext } from "../Context/ModalContext";
import { CoverPage } from "./Elements/StartScreenElements";

const addElementsAsPerComponent = ( currentElement ) => {
    let ele = '';
    if ( currentElement?.componentName ) {
        ele = currentElement.componentName;
    }
    else {
        ele = currentElement.id;
    }
    switch( ele ) {
        case 'CoverPage':
            return <CoverPage />;
        default:
            return '';
    }
}

export default function ModalBox() {
    const { showModal, currentElement } = useContext(ModalContext);

    return (
        <Fragment>
            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        {addElementsAsPerComponent( currentElement )}
                    </div>
                </div>
            )}
        </Fragment>
    );
}
