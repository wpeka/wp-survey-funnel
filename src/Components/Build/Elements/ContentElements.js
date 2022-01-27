import React, { Component, useContext, useState } from "react";
import ModalContentRight from '../../../HelperComponents/ModalContentRight';
import { convertToRgbaCSS } from "../../../HelperComponents/HelperFunctions";
import { CloseModal } from '../../../HelperComponents/CloseModalPopUp';
const { applyFilters } = wp.hooks;

export const Choices = React.memo(
    class extends Component {
        state = {
            title: "",
            description: "",
            answers: [{ name: "", checked: false, ...applyFilters( 'choicesState', {},this.props.type ) }, { name: "", checked: false, ...applyFilters( 'choicesState',{},this.props.type ) }],
            value: '',
			mandatory: false,
			error: '',
        };

        componentDidMount() {
            const { currentElement } = this.props;

            if (currentElement?.answers && "currentlySaved" in currentElement) {
                let state = {
                    title: currentElement.title,
                    description: currentElement.description,
                    answers: currentElement.answers,
					mandatory: currentElement?.mandatory,
                };
                this.setState(state);
            }
        }

        handleAddAnswer = () => {
            this.setState({
                answers: this.state.answers.concat([{ name: "", checked: false, ...applyFilters( 'choicesState', {},this.props.type ) }]),
            });
        };

        handleRemoveAnswer = (idx) => () => {
            this.setState({
                answers: this.state.answers.filter((s, sidx) => idx !== sidx),
            });
        };

        handleAnswerChange = (idx, key) => (evt) => {
            const newAnswers = this.state.answers.map((answer, sidx) => {
                if (idx !== sidx) return answer;
                return { ...answer, [key]: evt.target.value };
            });

            this.setState({ answers: newAnswers });
        };

        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            });
        };

        checkForEmpty( name ) {
            if ( this.state[name] === '' ) {
                return false;
            }
            return true;
        }

        currentElementName( componentName ) {
            switch(componentName){
                case 'SingleChoice':
                    return 'Single Choice';
                case 'MultiChoice':
                    return 'Multi Choice';
            }
        }

		handleSave = () => {
			let err = '';
			if ( this.state.answers.length >= 2 && this.state.title !== '' ) {
				err = '';
			}
			else if ( this.state.answers.length < 2 ) {
				err = 'Add atleast two answers.';
			}
			else {
				err = 'Please add title before saving.';
			}

			for(let i = 0; i < this.state.answers.length; i++) {
				if ( this.state.answers[i].name === '' ) {
					err = 'Please add text for all the answers added!'
					break;
				}
			}

			this.setState({
				error: err
			}, () => {
				let div = document.querySelector('.modalContent-left-fields');
				if ( div ) {
					div.lastElementChild.scrollIntoView({ behavior: 'smooth' });
				}
				if ( err === '' ) {
					this.props.saveToList();
				}
			})
		}

        render() {
            const { currentElement } = this.props;
            const { designCon, type } = this.props;
            return (	
                <>
                    <div className="modalOverlay">
                        <div className="modalContent-navbar">
                            <h3>Content Elements &nbsp; &#62; &nbsp; {this.currentElementName(currentElement.componentName)} &nbsp; &#62; &nbsp; {this.state.title}</h3>
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
                                    <div className="modalComponentAnswers">
                                    <h3>Answers</h3>
                                    {this.state.answers.map((answer, idx) => (
                                        <div className="answers" key={idx}>
                                            <input
                                                type="text"
                                                placeholder={`Answer #${
                                                    idx + 1
                                                }`}
                                                value={answer.name}
                                                onChange={this.handleAnswerChange(
                                                    idx,
													'name'
                                                )}
                                            />
											{applyFilters('answersLeftBoxes', '', type, answer, this.handleAnswerChange, idx)}
                                            <button
                                                type="button"
                                                onClick={this.handleRemoveAnswer(
                                                    idx
                                                )}
                                                className="small"
												disabled={this.state.answers.length < 3}
                                            >
                                            <img src={require('../BuildImages/delete-icon.png')}></img>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={this.handleAddAnswer}
                                        className="modalAnswersAdd"
                                    >
                                        <img src={require('../BuildImages/add-icon.png')}></img>
                                        Add New Answer
                                    </button>
                                    </div>

									<div className="modalComponentMandatory">
										<h3>Set Question as mandatory</h3>
										<input type="checkbox" id="mandatory" name="mandatory" checked={this.state.mandatory} onChange={(e) => {
											this.setState({
												mandatory: !this.state.mandatory
											})
										}} />
										<label htmlFor="mandatory"></label>
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
                                {this.state.title === '' && this.state.description === '' && this.state.answers.length === 0 ? ( <div className="no-preview-available"><img src={require(`../BuildImages/unavailable.png`)}></img><div>No Preview Available</div></div> ) : (<ModalContentRight designCon={designCon} currentElement={currentElement.componentName}>
                                    { this.checkForEmpty('title') && <h3 className="surveyTitle">{this.state.title}</h3> }
                                    { this.checkForEmpty('description') && <p className="surveyDescription">{this.state.description}</p> }
                                    {this.state.answers.map(function(answer, idx) {
                                        switch( currentElement.componentName ) {
                                            case 'SingleChoice':
                                                return  <div key={idx} style={{ border: `1px solid ${convertToRgbaCSS(designCon.answerBorderColor)}` }} className="surveyfunnel-lite-tab-answer-container">
                                                            <input id={`${idx}_${answer.name}_single`} type="radio" name="radiogroup" value={answer.name} />
                                                            <label htmlFor={`${idx}_${answer.name}_single`}>
                                                                <div>
                                                                    { parseInt(idx)+1}
                                                                </div>
                                                                <p>
                                                                    {answer.name}
                                                                </p>
                                                            </label>
                                                        </div>
                                            
                                            case 'MultiChoice':
                                                return  <div key={idx}  style={{ border: `1px solid ${convertToRgbaCSS(designCon.answerBorderColor)}` }} className="surveyfunnel-lite-tab-answer-container">
                                                            <input id={`${idx}_${answer.name}_multiple`} type="checkbox" name="checkboxGroup" value={answer.name} />
                                                            <label htmlFor={`${idx}_${answer.name}_multiple`} >
                                                                <div>
                                                                    { parseInt(idx)+1}
                                                                </div>
                                                                <p>
                                                                    {answer.name}
                                                                </p>
                                                            </label>
                                                        </div>
                                        }
                                        
                                    })}
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

export class Answer extends React.Component {
    state = {
        title: '',
        description: '',
		mandatory: false,
		error: '',
		value: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    currentElementName = ( componentName ) => {
        switch(componentName){
            case 'ShortAnswer':
                return 'Short Answer';
            case 'LongAnswer':
                return 'Long Answer';
        }
    }

    checkForEmpty( name ) {
        if ( this.state[name] === '' ) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        const { currentElement } = this.props;

        if ("currentlySaved" in currentElement) {
            let state = {
                title: currentElement.title,
                description: currentElement.description,
				mandatory: currentElement?.mandatory,
            };
            this.setState(state);
        }
    }

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
			if ( err === '' ) {
				this.props.saveToList();
			}
		})
	}

    render() {
        const { currentElement } = this.props;
        const { designCon, type } = this.props;
        return (
            <div className="modalOverlay">
                <div className="modalContent-navbar">
                    <h3>Content Elements &nbsp; &#62; &nbsp; {this.currentElementName(currentElement.componentName)} &nbsp; &#62; &nbsp; {this.state.title}</h3>
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
							
							<div className="modalComponentMandatory">
								<h3>Set Question as mandatory</h3>
								<input type="checkbox" id="mandatory" name="mandatory" checked={this.state.mandatory} onChange={(e) => {
									this.setState({
										mandatory: !this.state.mandatory
									})
								}} />
								<label htmlFor="mandatory"></label>
							</div>
							<div className="modalComponentError">
								{this.state.error}
							</div>
                        </div>
                        <div className="modalComponentSaveButton">
                            <button onClick={this.handleSave} name="save">Save</button>
                        </div>
                    </div>
                    <div className="modalContent-right">
                        <div className="modalContentMode">
                            <h4>Content Preview</h4>
                        </div>
                        <div className="modalContentPreview">
                        {this.state.title === '' && this.state.description === '' ? ( <div className="no-preview-available"><img src={require(`../BuildImages/unavailable.png`)}></img><div>No Preview Available</div></div> ) : (<ModalContentRight designCon={designCon} currentElement={currentElement.componentName}>
                            { this.checkForEmpty('title') && <h3 className="surveyTitle">{this.state.title}</h3> }
                            { this.checkForEmpty('description') && <p className="surveyDescription">{this.state.description}</p> }
                            { getAnswerComponentInput(currentElement, designCon) }
							<button>Next</button>
                        </ModalContentRight>)}
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

function getAnswerComponentInput(currentElement, designCon) {
    switch(currentElement.componentName) {
        case 'ShortAnswer':
            return <input className="shortAnswer-input" type="text" style={{ border: `1px solid ${convertToRgbaCSS(designCon.answerBorderColor)}` }}/>
        case 'LongAnswer':
            return <textarea className="longAnswer-input" cols="10" style={{ border: `1px solid ${convertToRgbaCSS(designCon.answerBorderColor)}` }} />
        default:
            return '';
    }

}