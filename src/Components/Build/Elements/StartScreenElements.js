import React, { createElement, Fragment } from "react";
import { convertToRgbaCSS } from "../../../HelperComponents/HelperFunctions";
import ModalContentRight from '../../../HelperComponents/ModalContentRight';
import { CloseModal } from '../../../HelperComponents/CloseModalPopUp';
const { applyFilters } = wp.hooks;
import { ConfigureContext } from "../../Context/ConfigureContext";

export const CoverPage = React.memo(
    class extends React.Component {
        
        state = {
            button: "",
            title: "",
            description: "",
			error: '',
			...applyFilters('addCoverPageStateElements', {}),
        };

        handleChange = (event, checkbox = false) => {
			if ( ! checkbox ) {
				this.setState({
					[event.target.name]: event.target.value,
				});
			}
			else {
				this.setState({
					[event.target.name]: event.target.checked,
				})
			}			
        };

		handleSave = () => {
			let err = '';
			if ( this.state.title !== '' ) {
				err = '';
			}
			else {
				err = 'Please add title before saving.';
			}
			this.setState({
				error: err
			}, () => {
				let div = document.querySelector('.modalContent-left-fields');
				if ( div ) {
					div.lastElementChild.scrollIntoView({ behavior: 'smooth' });
				}
				if ( this.state.error === '' ) {
					this.props.saveToList();
				}
			})
		}

        componentDidMount() {
            const { currentElement } = this.props;
            if ( 'currentlySaved' in currentElement ) {
                let state = {
                    button: currentElement.button,
                    title: currentElement.title,
                    description: currentElement.description,
					...applyFilters('componentDidMountStartScreen', {} ,currentElement)
                }
                this.setState(state);
            }
        }

        checkForEmpty( name ) {
            if ( this.state[name] === '' ) {
                return false;
            }
            return true;
        }

        render() {
            const { designCon, currentElement } = this.props;
            return (
                <>
                    <div className="modalOverlay">
                        <div className="modalContent-navbar">
                        <h3>Start Screen  &nbsp; &#62; &nbsp;  Cover Page  &nbsp; &#62; &nbsp;  {this.state.title}</h3>
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
                                        <textarea
                                            type="text"
                                            placeholder="Set Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            style={{height:"150px"}}
                                        />
                                    </div>
									<ConfigureContext.Consumer>
										{consumer => applyFilters('startScreenLeftElements', '', this.handleChange, this.state, consumer.proSettings)}
									</ConfigureContext.Consumer>                           
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
									<div className="modalComponentError">
										{this.state.error}
									</div>                                
                                </div>
                                <div className="modalComponentSaveButton">
                                    <button onClick={this.handleSave}>Save</button>
                                </div>
                            </div>
                            <div className="modalContent-right">
                                <div className="modalContentMode">
                                    <h4>Content Preview</h4>
                                </div>
                                <div className="modalContentPreview">
                                {this.state.title === '' && this.state.description === '' && this.state.button === '' ? 
                                (<div className="no-preview-available">
                                    <img src={require(`../BuildImages/unavailable.png`)}></img>
                                    <div>
                                        No preview available
                                    </div>
                                </div>)
                                 : (<ModalContentRight designCon={designCon} currentElement={currentElement.componentName}>
                                        { this.checkForEmpty('title') && <h3 className="surveyTitle">{this.state.title}</h3> }
                                        { this.checkForEmpty('description') && <p className="surveyDescription">{this.state.description}</p> }
										<ConfigureContext.Consumer>
											{consumer => applyFilters('startScreenRightPrivacyPolicy', '', this.state, consumer.proSettings, require('../BuildImages/checkmark.png'))}
										</ConfigureContext.Consumer>
                                        { this.checkForEmpty('button') && <button style={{color: convertToRgbaCSS(designCon.buttonTextColor), background: convertToRgbaCSS(designCon.buttonColor)}}>{this.state.button}</button> }
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
