import React from "react";
import { formElements, formElementsDropBoard } from "../../../../Data";
import Tabs from '../../../../HelperComponents/Tabs';
import BuildFormElement from "./BuildFormElement";
import DropFormBoard from "./DropFormBoard";
export const FormElements = React.memo(
    class extends React.Component {
        state = {
            title: "",
            description: "",
            setCurrentFormElement: null,
            List: [],
        };

        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            });
        };

        componentDidMount() {
            const { currentElement } = this.props;
            if ("currentlySaved" in currentElement) {
                let state = {
                    title: currentElement.title,
                    description: currentElement.description,
                };
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

                                {formElements.map(function(ele, i) {
                                    return <BuildFormElement setCurrentFormElement={setCurrentFormElement} ele={ele} key={i}></BuildFormElement>
                                })}
                                
                                <button onClick={this.props.saveToList}>
                                    save
                                </button>
                            </div>
                            <div className="modalContent-right">
                                <Tabs>
                                    <div label="Form Elements">
                                    {formElementsDropBoard.map(function(ele, i) {
                                        return <DropFormBoard ele={ele} key={i}></DropFormBoard>
                                    })}
                                    </div>
                                    <div label="Preview">
                                        <h3>{this.state.title}</h3>
                                        <p>{this.state.description}</p>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
);
