import React, { createElement, Fragment } from "react";
import ModalContentRight from '../../../HelperComponents/ModalContentRight';

export const ResultScreen = React.memo(
    class extends React.Component {
        state = {
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
                            <h2>Result Screen</h2>
                            <button>✕</button>
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
                                    <ModalContentRight designCon={designCon} currentElement={currentElement.componentName}>
                                        <h3>{this.state.title}</h3>
                                        <p>{this.state.description}</p>
                                    </ModalContentRight>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
);
