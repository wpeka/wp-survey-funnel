import React, { createElement, Fragment } from "react";

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
                                <button onClick={this.props.saveToList}>save</button>
                            </div>
                            <div className="modalContent-right"></div>
                        </div>
                    </div>
                </>
            );
        }
    }
);
