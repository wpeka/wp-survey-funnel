import React, { Component } from "react";

export const Choices = React.memo(
    class extends Component {
        state = {
            answers: [{name: ''}],
        };

		componentDidMount() {
			const { currentElement } = this.props;
			
			if ( currentElement?.answers ) {
				console.log('currentElement');
				this.setState({
					answers: currentElement.answers
				});
        	}
		}

		handleAddAnswer = () => {
			this.setState({
				answers: this.state.answers.concat([{ name: "" }])
			});
		  };
		
		handleRemoveAnswer = idx => () => {
			this.setState({
				answers: this.state.answers.filter((s, sidx) => idx !== sidx)
			});
		};

		handleAnswerNameChange = idx => evt => {
			const newAnswers = this.state.answers.map((answer, sidx) => {
			  if (idx !== sidx) return answer;
			  return { ...answer, name: evt.target.value };
			});
		
			this.setState({ answers: newAnswers });
		};
		  
        render() {
            return (
                <div>
                    {this.state.answers.map((answer, idx) => (
                        <div className="answers" key={idx}>
                            <input
                                type="text"
                                placeholder={`Answer #${idx + 1} name`}
                                value={answer.name}
                                onChange={this.handleAnswerNameChange(idx)}
                            />
                            <button
                                type="button"
                                onClick={this.handleRemoveAnswer(idx)}
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
                </div>
            );
        }
    }
);
