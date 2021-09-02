import React, { Component } from "react";
import ModalContentRight from '../../../HelperComponents/ModalContentRight';
import { convertToRgbaCSS } from "../../../HelperComponents/HelperFunctions";
import { CloseModal } from '../../../HelperComponents/CloseModalPopUp';

export const Choices = React.memo(
    class extends Component {
        state = {
            title: "",
            description: "",
            answers: [{ name: "", checked: false }],
            value: '',
        };

        componentDidMount() {
            const { currentElement } = this.props;

            if (currentElement?.answers && "currentlySaved" in currentElement) {
                let state = {
                    title: currentElement.title,
                    description: currentElement.description,
                    answers: currentElement.answers,
                };
                this.setState(state);
            }
        }

        handleAddAnswer = () => {
            this.setState({
                answers: this.state.answers.concat([{ name: "", checked: false }]),
            });
        };

        handleRemoveAnswer = (idx) => () => {
            this.setState({
                answers: this.state.answers.filter((s, sidx) => idx !== sidx),
            });
        };

        handleAnswerNameChange = (idx) => (evt) => {
            const newAnswers = this.state.answers.map((answer, sidx) => {
                if (idx !== sidx) return answer;
                return { ...answer, name: evt.target.value };
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

        render() {
            const { currentElement } = this.props;
            const { designCon } = this.props;
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
                                                onChange={this.handleAnswerNameChange(
                                                    idx
                                                )}
                                            />
                                            <button
                                                type="button"
                                                onClick={this.handleRemoveAnswer(
                                                    idx
                                                )}
                                                className="small"
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
                                </div>
                                <div className="modalComponentSaveButton">
                                    <button onClick={this.props.saveToList}>Save</button>
                                </div>
                            </div>
                            <div className="modalContent-right">
                            <div className="modalContentMode">
                                    <h4>Content Preview</h4>
                                </div>
                                <div className="modalContentPreview">
                                {this.state.title === '' && this.state.description === '' && this.state.answers.length === 0 ? ( <div className="no-preview-available"><img src={require(`../BuildImages/unavailable.png`)}></img><div>No Preview Available</div></div> ) : (<ModalContentRight designCon={designCon} currentElement={currentElement.componentName}>
                                    { this.checkForEmpty('title') && <h3>{this.state.title}</h3> }
                                    { this.checkForEmpty('description') && <p>{this.state.description}</p> }
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
