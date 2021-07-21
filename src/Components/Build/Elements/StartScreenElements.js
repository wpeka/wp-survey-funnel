import React, { createElement, Fragment } from "react";

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
                                <div className="modalComponentButton">
                                    <label>button</label>
                                    <input
                                        type="text"
                                        name="button"
                                        value={this.state.button || ''}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button onClick={this.props.saveToList}>save</button>
                            </div>
                            <div className="modalContent-right">
                            
                                <h3>{this.state.title}</h3>
                                <p>{this.state.description}</p>
                                <button>{this.state.button}</button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
);
