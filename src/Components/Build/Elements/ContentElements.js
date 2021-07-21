import React, { Component } from "react";

export const Choices = React.memo(
    class extends Component {
        state = {
            title: "",
            description: "",
            answers: [{ name: "" }],
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
                answers: this.state.answers.concat([{ name: "" }]),
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

        render() {
            return (
                <>
                    <div className="modalOverlay">
                        <div className="modalContent">
                            <div className="modalContent-left">
                                <div className="modalComponentTitle">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        placeholder="Set Title"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="modalComponentDescription">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        placeholder="Set Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                {this.state.answers.map((answer, idx) => (
                                    <div className="answers" key={idx}>
                                        <input
                                            type="text"
                                            placeholder={`Answer #${
                                                idx + 1
                                            } name`}
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
                                            -
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={this.handleAddAnswer}
                                    className="small"
                                >
                                    Add Answer
                                </button>
                                <button onClick={this.props.saveToList}>
                                    save
                                </button>
                            </div>
                            <div className="modalContent-right"></div>
                        </div>
                    </div>
                </>
            );
        }
    }
);
