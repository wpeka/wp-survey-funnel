import React from "react";
import { formElements, formElementsDropBoard } from "../../../../Data";
import Tabs from "../../../../HelperComponents/Tabs";
import BuildFormElement from "./BuildFormElement";
import DropFormBoard from "./DropFormBoard";
import update from "immutability-helper";
import ModalContentRight from "../../../../HelperComponents/ModalContentRight";
import { convertToRgbaCSS } from "../../../../HelperComponents/HelperFunctions";

export const FormElements = React.memo(
    class extends React.Component {
        constructor(props) {
            super(props);
        }
        state = {
            title: "",
            description: "",
            currentFormElement: null,
            buttonLabel: '',
            List: [],
        };

        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            });
        };

        setCurrentFormElement = (element) => {
            document
                .querySelectorAll(".wpsf-build-container .tab-list-item")[1]
                .click();
            this.setState({
                currentFormElement: element,
            });
        };

        addToList = (item) => {
            let newList = this.state.List.slice();
            item.id = this.generateId();
            newList.push(item);
            this.setState({
                List: newList,
            });
        };

        generateId = () => {
            return (
                Math.random().toString(36).substring(2) +
                new Date().getTime().toString(36) +
                "_form"
            );
        };

        componentDidMount() {
            const { currentElement } = this.props;
            if ("currentlySaved" in currentElement) {
                let state = {
                    title: currentElement.title,
                    description: currentElement.description,
                    buttonLabel: currentElement.buttonLabel,
                    List: currentElement.List,
                };
                this.setState(state);
            }
        }

        getCurrentFormElementLeftRender = () => {
            let index = null;
            for (let i = 0; i < this.state.List.length; i++) {
                if (
                    this.state.currentFormElement.id === this.state.List[i].id
                ) {
                    index = i;
                }
            }

            if (index === null) {
                return "";
            }
            const { currentFormElement, List } = this.state;
            switch (currentFormElement.componentName) {
                case "FirstName":
                case "LastName":
                case "Email":
                case "ShortTextAnswer":
                case "LongTextAnswer":
                    return (
                        <div>
                            <label>Label Name</label>
                            <input
                                type="text"
                                name="name"
                                value={List[index].name}
                                data-attr={index}
                                onChange={(e) => {
                                    this.handleInputChange(e);
                                }}
                            />

                            <label>Placeholder</label>
                            <input
                                type="text"
                                name="placeholder"
                                value={List[index].placeholder}
                                data-attr={index}
                                onChange={(e) => {
                                    this.handleInputChange(e);
                                }}
                            />

                            <input
                                type="checkbox"
                                name="required"
                                data-attr={index}
                                onChange={(e) => {
                                    this.handleCheckboxChange(e);
                                }}
                                checked={List[index].required}
                            />
                        </div>
                    );
            }
        };

        handleCheckboxChange = (e) => {
            let newList = JSON.parse(JSON.stringify(this.state.List));
            let key = e.target.name;
            let value = e.target.checked;
            let index = e.target.getAttribute("data-attr");
            newList[index][key] = value;
            this.setState({
                List: newList,
            });
        }

        getCurrentFormElementRightRender = (ele, index) => {
            const { List } = this.state;
            const { designCon } = this.props;
            switch (ele.componentName) {
                case "FirstName":
                case "LastName":
                case "Email":
                case "ShortTextAnswer":
                    return (
                        <div key={ele.id}>
                            <label>{List[index].name}</label>
                            <input
                                type="text"
                                name="name"
                                placeholder={List[index].placeholder}
                                style={{ border: `1px solid ${convertToRgbaCSS(designCon.answerBorderColor)}` }}
                            />
                        </div>
                    );
                case "LongTextAnswer":
                    return (
                        <div key={ele.id}>
                            <label>{List[index].name}</label>
                            <textarea
                                type="text"
                                name="name"
                                placeholder={List[index].placeholder}
                                style={{ border: `1px solid ${convertToRgbaCSS(designCon.answerBorderColor)}` }}
                            />
                        </div>
                    );
            }
        };

        editList = (ele) => {
            this.setCurrentFormElement(ele);
        };

        deleteFromList = (index) => {
            const newList = this.state.List.slice();
            newList.splice(index, 1);

            this.setState({
                List: newList,
            });
        };

        handleInputChange = (e) => {
            let newList = JSON.parse(JSON.stringify(this.state.List));
            let key = e.target.name;
            let value = e.target.value;
            let index = e.target.getAttribute("data-attr");
            newList[index][key] = value;
            this.setState({
                List: newList,
            });
        };

        moveCard = (dragIndex, hoverIndex, data) => {
            const dragCard = this.state.List[dragIndex];
            const newList = this.state.List.slice();

            let newCardList = update(newList, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            });

            this.setState({
                List: newCardList,
            });
        };

        render() {
            const { designCon } = this.props;
            return (
                <>
                    <div className="modalOverlay">
                        <div className="modalContent">
                            <div className="modalContent-left">
                                {this.state.currentFormElement === null ? (
                                    <>
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

                                        {formElements.map(function (ele, i) {
                                            return (
                                                <BuildFormElement
                                                    addToList={this.addToList}
                                                    setCurrentFormElement={
                                                        this
                                                            .setCurrentFormElement
                                                    }
                                                    ele={ele}
                                                    key={i}
                                                ></BuildFormElement>
                                            );
                                        }, this)}

                                        <div className="modalComponentButtonLabel">
                                            <label>Button label</label>
                                            <input
                                                type="text"
                                                placeholder="Set Button Label"
                                                name="buttonLabel"
                                                value={this.state.buttonLabel}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <button onClick={this.props.saveToList}>
                                            save
                                        </button>
                                    </>
                                ) : (
                                    <div>
                                        {this.getCurrentFormElementLeftRender()}
                                        <button
                                            onClick={() => {
                                                this.setCurrentFormElement(
                                                    null
                                                );
                                                document
                                                .querySelector(".wpsf-build-container .tab-list-item")
                                                .click();
                                            }}
                                        >
                                            go back
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="modalContent-right">
                                <Tabs>
                                    <div
                                        label="Form Elements"
                                    >
                                        {formElementsDropBoard.map(function (
                                            ele,
                                            i
                                        ) {
                                            return (
                                                <DropFormBoard
                                                    List={this.state.List}
                                                    editList={this.editList}
                                                    deleteFromList={
                                                        this.deleteFromList
                                                    }
                                                    moveCard={this.moveCard}
                                                    ele={ele}
                                                    key={i}
                                                ></DropFormBoard>
                                            );
                                        },
                                        this)}
                                    </div>
                                    <div label="Preview">
                                        <ModalContentRight designCon={designCon}>
                                            <h3>{this.state.title}</h3>
                                            <p>{this.state.description}</p>
                                            {this.state.List.map(function (ele, i) {
                                                return this.getCurrentFormElementRightRender(
                                                    ele,
                                                    i
                                                );
                                            }, this)}
                                            <button style={{color: convertToRgbaCSS(designCon.buttonTextColor), background: convertToRgbaCSS(designCon.buttonColor)}} type="button">{this.state.buttonLabel}</button>
                                        </ModalContentRight>
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
