import React, { createElement, Fragment } from "react";
import ModalContentRight from '../../../HelperComponents/ModalContentRight';
import { CloseModal } from '../../../HelperComponents/CloseModalPopUp';
const { applyFilters } = wp.hooks;

export const ResultScreen = React.memo(
    class extends React.Component {
        state = {
            title: "",
            description: "",
			...applyFilters( 'resultScreenState', {}, this.props.type ),
			errors: [],
        };

        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            });
        };

		handleResultChange = ( e, checkbox = false ) => {
			this.setState({
				...this.state,
				[e.target.name]: checkbox ? e.target.checked : e.target.value,
			})
		}

        componentDidMount() {
            const { currentElement } = this.props;
            if ( 'currentlySaved' in currentElement ) {
                let state = {
                    title: currentElement.title,
                    description: currentElement.description,
					id: currentElement.id,
					...applyFilters( 'resultScreenSetComponentMount', {}, this.props.type, currentElement )
                }
                this.setState(state);
            }
        }

		saveResultScreen = () => {
			let errorArray = [];
			if ( this.state.title === '' ) {
				errorArray.push(<p>Please add title before saving.</p>);
			}
			errorArray = applyFilters( 'resultScreenValidation', errorArray, this.state, this.props.List );
			if ( errorArray.length === 0 ) {
				this.props.saveToList();
			}
			else {
				this.setState({
					...this.state,
					errors: errorArray
				});
			}
		}

        render() {
            const { designCon, currentElement } = this.props;
            return (
                <>
                    <div className="modalOverlay">
                        <div className="modalContent-navbar">
                        <h3>Result Screen  &nbsp; &#62; &nbsp;  Results Page  &nbsp; &#62; &nbsp;  {this.state.title}</h3>
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
									{applyFilters( 'resultScreenLeftElementsRender', '', this.props.type, this.state, this.handleResultChange )}
									{this.state.errors.map(function( error, index ) {
										return error;
									})}
                                </div>
                                <div className="modalComponentSaveButton">
                                    <button onClick={this.saveResultScreen}>Save</button>
                                </div>
                            </div>
                            <div className="modalContent-right">
                                <div className="modalContentMode">
                                    <h4>Content Preview</h4>
                                </div>
                                <div className="modalContentPreview">
                                {this.state.title === '' && this.state.description === '' ? 
                                (<div className="no-preview-available">
                                    <img src={require(`../BuildImages/unavailable.png`)}></img>
                                    <div>
                                        No preview available
                                    </div>
                                </div>)
                                 : (<ModalContentRight designCon={designCon} currentElement={currentElement.componentName}>
									 	{applyFilters('resultScreenRightElementsRender', '', this.props.type, this.state)}
                                        <h3 className="surveyTitle">{this.state.title}</h3>
                                        <p className="surveyDescription">{this.state.description}</p>
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
