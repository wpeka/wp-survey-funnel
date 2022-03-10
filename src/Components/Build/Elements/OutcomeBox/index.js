import React, { useContext } from "react";
import { formElements, formElementsDropBoard } from "../../../../Data";
import Tabs from "../../../../HelperComponents/Tabs";
import BuildFormElement from "./BuildFormElement";
import DropFormBoard from "./DropFormBoard";
import DropBoardCreater from "./DropBoardCreater";
import update from "immutability-helper";
import {BuildContext} from '../../../Context/BuildContext';
import ModalContentRight from "../../../../HelperComponents/ModalContentRight";
import SaveOutcomeData from "../../../../HelperComponents/SaveOutcomeData";
import { convertToRgbaCSS } from "../../../../HelperComponents/HelperFunctions";
import { CloseModal } from '../../../../HelperComponents/CloseModalPopUp';

export const OutcomeBox = React.memo(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.getList=this.getList.bind(this);
            
        }
        state = {
            title: "",
            description: "",
            currentFormElement: null,
            buttonLabel: '',
            List: [],
            error: '',
        };

        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            });
        };

        setCurrentFormElement = (element) => {
            document
                .querySelectorAll(".surveyfunnel-lite-build-container .tab-list-item")[1]
                .click();
            this.setState({
                currentFormElement: element,
            });
        };

        addToList = (item,title) => {
            let newList = JSON.parse(JSON.stringify(this.state.List));
            item.id = this.generateId();
            item.title=title;
            newList.push(item);
            this.setState({
                List: newList,
            });
            // console.log('newlist');
            console.log(newList);

            // console.log(item);
            // console.log(title);
            // let newList = JSON.parse(JSON.stringify(this.state.List));
            // console.log(typeof this.state.List);
            // if(!newList.hasOwnProperty(title)){
            //     console.log('title not found');
            //     newList[title]=[];
            //     this.setState({
            //         List:newList,
            //     });
            // }else{
            //     console.log('title found');
            // }
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
            const data = currentElement['data'];
            console.log(currentElement);
            // console.log(data);
            if ("currentlySaved" in data) {
                let state = {
                    title: data.title,
                    description: data.description,
                    answers: data.answers,
                    // List: data.List,
                };
                // console.log(state);
                this.setState(state);
            }
            const {outComeData}=this.props;
            console.log(outComeData);
            if(outComeData){
                this.setState({
                    List:JSON.parse(outComeData),
                })
            console.log(JSON.parse(outComeData));
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
                        <div className="modalComponentFormFields">
                            <h3>Label Name</h3>
                            <input
                                type="text"
                                name="name"
                                value={List[index].name}
                                data-attr={index}
                                onChange={(e) => {
                                    this.handleInputChange(e);
                                }}
                            />

                            <h3>Placeholder</h3>
                            <input
                                type="text"
                                name="placeholder"
                                value={List[index].placeholder}
                                data-attr={index}
                                onChange={(e) => {
                                    this.handleInputChange(e);
                                }}
                            />
                            <div className="surveyfunnel-lite-required-field-container">
                                <h3>Mark field Required</h3>
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
                            <label>{List[index].name} {List[index].required ? '*' : ''}</label>
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

        checkForEmpty(name) {
            if (this.state[name] === '') {
                return false;
            }
            return true;
        }

        handleSave = () => {
            let err = '';
            if (this.state.title !== '') {
                err = '';
            }
            else {
                err = 'Please add title before saving.';
            }
            this.setState({
                error: err
            }, () => {
                if (this.state.error === '') {
                    this.props.saveToList();
                }
            })
        }
        getList(){
            // console.log(this.state.List);
            // let newList = this.state.List;
            return this.state.List;
        }
        createNewList=(newList)=>{
            // console.log(newList);
            this.setState({
                List:newList,
            });
        }
        
        render() {
            const { designCon, currentElement } = this.props;

            return (
                <>
                    <div className="modalOverlay">
                        <div className="modalContent-navbar">
                            <h1>Result Mapping</h1>
                            <CloseModal />
                        </div>
                        <div className="modal-desc">
                                <p>Drag the Answers to the Result to map them.</p>
                        </div>
                        <div className="modalContent">
                            
                            <div className="modalContent-left">
                                <div className="modalContent-left-fields">
                                    <div className="modalComponentTitle">
                                        <h2>{this.state.title}</h2>
                                    </div>
                                    <div className="surveyfunnel-lite-form-elements_content">
                                        <div className="surveyfunnel-lite-form-elements_container">
                                            {this.state.answers?.map((ele, i) => {
                                                ele.key=i+1;
                                                // console.log(ele);
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
                                        </div>
                                    </div>
                                </div>
                                <SaveOutcomeData getList={this.getList} />

                            </div>
                            <div className="modalContent-right">
                                <div className="modalContent-right-content"
                                >
                                    <DropBoardCreater
                                        editList={this.editList}
                                        deleteFromList={this.deleteFromList}
                                        addToList={this.addToList}
                                        moveCard={this.moveCard}
                                        createNewList={this.createNewList}
                                        getList={this.getList}
                                    ></DropBoardCreater>

                                </div>
                                
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
);
