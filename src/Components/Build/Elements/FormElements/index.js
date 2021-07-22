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
            currentFormElement: null,
            List: [],
        };

        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            });
        };

        setCurrentFormElement = ( element ) => {
            this.setState({
                currentFormElement: element
            });
        }

        addToList = (item) => {
            let newList = this.state.List.slice();
            item.id = this.generateId();
            newList.push(item);
            this.setState({
                List: newList
            });
        }

        generateId = () => {   
            return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36) + '_form';        
        }

        componentDidMount() {
            const { currentElement } = this.props;
            if ("currentlySaved" in currentElement) {
                let state = {
                    title: currentElement.title,
                    description: currentElement.description,
                    List: currentElement.List,
                };
                this.setState(state);
            }
        }

        componentDidUpdate() {
            console.log('hello world');
        }

        getCurrentFormElementRender = () => {
            let index = null;
            for ( let i = 0; i < List.length ; i++ ) {
                if ( currentFormElement.id === List[i].id ) {
                    index = i;
                }
            }
            if ( index === null ) {
                this.setCurrentFormElement(null);
            }
        }

        render() {
            return (
                <>
                    <div className="modalOverlay">
                        <div className="modalContent">
                            <div className="modalContent-left">
                                { this.state.currentFormElement === null ? ( <><div className="modalComponentTitle">
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
                                    return <BuildFormElement addToList={this.addToList} setCurrentFormElement={this.setCurrentFormElement} ele={ele} key={i}></BuildFormElement>
                                }, this)}
                                
                                <button onClick={this.props.saveToList}>
                                    save
                                </button></>) : (
                                    <div>
                                        {this.getCurrentFormElementRender()}
                                        <button onClick={() => {this.setCurrentFormElement(null)}}>go back</button>
                                    </div>
                                )}
                            </div>
                            <div className="modalContent-right">
                                <Tabs>
                                    <div label="Form Elements">
                                    {formElementsDropBoard.map(function(ele, i) {
                                        return <DropFormBoard List={this.state.List} ele={ele} key={i}></DropFormBoard>
                                    }, this)}
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
