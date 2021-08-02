import React, { createElement, Fragment } from "react";
import { convertToRgbaCSS } from "../../../HelperComponents/HelperFunctions";
import ModalContentRight from '../../../HelperComponents/ModalContentRight';
import { CloseModal } from '../../../HelperComponents/CloseModalPopUp';


export const CoverPage = React.memo(
    class extends React.Component {
        
        state = {
            button: "",
            title: "",
            description: "",
        };

        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            });
        };

        componentDidMount() {
            const { currentElement } = this.props;
            if ( 'currentlySaved' in currentElement ) {
                let state = {
                    button: currentElement.button,
                    title: currentElement.title,
                    description: currentElement.description,
                }
                this.setState(state);
            }
        }

        render() {
            const { designCon, currentElement } = this.props;
            return (
                <>
                    <div className="modalOverlay">
                        <div className="modalContent-navbar">
                            <h2>Cover Page</h2>
                            <CloseModal/>
                        </div>
                        <div className="modalContent">
                            <div className="modalContent-left">
                                <div className="modalContent-left-fields">
                                    <div className="modalComponentTitle">
                                        <h3>Title</h3>
                                        <input
                                            type="text"
                                            placeholder="Set Title"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="modalComponentDescription">
                                        <h3>Description</h3>
                                        <input
                                            type="text"
                                            placeholder="Set Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            style={{height:"150px"}}
                                        />
                                    </div>
                                    <div className="modalComponentButton">
                                        <h3>Button</h3>
                                        <input
                                            type="text"
                                            name="button"
                                            value={this.state.button || ''}
                                            onChange={this.handleChange}
                                            placeholder="Button Label"

                                        />
                                    </div>                                
                                </div>
                                <div className="modalComponentSaveButton">
                                    <button onClick={this.props.saveToList}>save</button>
                                </div>
                            </div>
                            <div className="modalContent-right">
                                <div className="modalContentMode">
                                    <h4>Content Preview</h4>
                                </div>
                                <div className="modalContentPreview">
                                {this.state.title === '' && this.state.description === '' && this.state.button === '' ? 
                                (<div>
                                    No preview available
                                </div>)
                                 : (<ModalContentRight designCon={designCon} currentElement={currentElement.componentName}>
                                        <h3>{this.state.title}</h3>
                                        <p>{this.state.description}</p>
                                        <button style={{color: convertToRgbaCSS(designCon.buttonTextColor), background: convertToRgbaCSS(designCon.buttonColor)}}>{this.state.button}</button>
                                </ModalContentRight>)}

                                </div>

                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
);
